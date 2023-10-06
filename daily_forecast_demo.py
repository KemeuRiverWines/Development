# -*- coding: utf-8 -*-
"""ModellingUsingHourlyData_LSTM_Combined.ipynb"""
"""#Midnight Forecast Model (Begin Forecast at 00:00 AM)"""

import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
import logging
import psycopg2
from datetime import timedelta, datetime
import pytz
import re
import requests

# Define constants
KUMEU_DATA_PATH = '/home/kumeu/train_data.xlsx'
SELECTED_COLUMNS = ['Air_temp', 'Leaf_wetness', 'Relative_humidity', 'Wind_speed']
TARGET_COLUMN = 'Air_temp'
AM_MODEL_PATH = "/home/kumeu/uv_am_model.keras"
PM_MODEL_PATH = "/home/kumeu/mv_pm_model.keras"
TIMESTEPS = 25
SLICE_LENGTH = 24

train_data = None  # Initialize the train data variable

# Load data from an Excel file and return a DataFrame
def load_data(file_path):
    print(f"Loading data from {file_path}...")
    data = pd.read_excel(file_path, index_col='DateTime', parse_dates=True)
    return data

def get_weather_data():
    # Current date
    now = datetime.now()
    yesterday = now - timedelta(days=1)

    # Calculate the date 25 days ago
    start_date = yesterday - timedelta(days=24)

    # Set time to 00:00:00 for start_date and 23:00:00 for yesterday
    start_date = start_date.replace(hour=0, minute=0, second=0)
    yesterday = yesterday.replace(hour=23, minute=0, second=0)

    # Format dates in ISO format
    start = start_date.strftime('%Y-%m-%dT%H:%M:%S')
    stop = yesterday.strftime('%Y-%m-%dT%H:%M:%S')

    url = f"http://api.metwatch.nz/api/legacy/weather/hourly?station=KMU&start={start}&stop={stop}"

    headers = {
        'Accept': 'application/json',
        'x-api-key': 'iWe1rParl8d226JqFJeM0ZpZcKfl6rbvmdtKay2TCOW8NHSKGefEpF0HsAQ0OTKBuZtAAB0xLOlw93Q2'
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None

def process_weather_data(data):
    # Function to extract date and time from string
    def extract_datetime(dt_str):
        # Remove ordinal indicators
        dt_str = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', dt_str)

        # Extract date and time information using regex
        match = re.search(r'(\w{3} \d{1,2} \w{3} \d{4})\n(\d{1,2}(am|pm)( - \d{1,2}(am|pm))?)', dt_str)
        if match:
            date_str = match.group(1)
            time_str = match.group(2).split(' - ')[0]

            # Convert to datetime format
            dt = datetime.strptime(f'{date_str} {time_str}', '%a %d %b %Y %I%p')

            return dt
        else:
            return None

    # Extract the 'ALT' (Air Temp.) and 'TRG' (Timestamp) lists from 'TDDATA_'
    timestamp_data = data['TDDATA_']['ALT']
    temp_data = data['TDDATA']
    leafwetness_data = data['LSDATA']
    humidity_data = data['RHDATA']
    windspeed_data = data['WSDATA']

    # Create a DataFrame with 'DateTime' and 'Air_temp' columns
    df = pd.DataFrame({'DateTime': timestamp_data, 'Air_temp': temp_data, 'Leaf_wetness': leafwetness_data, 'Relative_humidity': humidity_data,'Wind_speed': windspeed_data})
    
    df['DateTime'] = df['DateTime'].apply(extract_datetime)
    df.set_index('DateTime', inplace=True)
	# Convert all columns to float
    for col in df.columns:
        if df[col].dtype != np.float64:
            df[col] = df[col].astype(float)
    return df


# Handle missing values by performing linear interpolation
def handle_missing_values(data):
    print("Checking missing values...")
    missing_percentage = round(data.isnull().sum() * 100 / len(data), 6)
    if any(missing_percentage != 0):
        print("\nMissing values detected. Performing linear interpolation...")
        data.interpolate(method='linear', inplace=True)
        print("Missing values handled...")
    else:
        print("No missing values detected...")
    return data

# Select variables to be used to forecast
def select_columns(data, columns):
    selected_data = data[columns]
    print(f"Selecting columns: {', '.join(columns)}")
    return selected_data

# Prepare dummy_train and dummy_test to analyse forecast results
def prepare_data(data, target_date, target_column):
    print("\nPreparing historical data...")
    target_date = pd.to_datetime(target_date)
    # Calculate the end date by subtracting 24 hours from the target_date
    end_date = target_date - pd.DateOffset(hours=1)
    # Filter data based on the calculated start and end dates
    dummy_data = data.loc[:end_date].tail(600)
    print("Data prepared...\n")
    return dummy_data

# Retrieve the train data's min and max that were used during model training
def prepare_transformation_data(data, train_percentage):
    length = int(round(len(data) * train_percentage))
    train_data = data[:length]
    return train_data

# Perform normalisation for dummy data
def transform_data(data, train_mean, train_std):
    standardised_data = (data - train_mean) / train_std
    return standardised_data

# Predicts a single time step using the given model and input sequence
def predict_single_time_step(data, model, input_sequence):
    output = model.predict(input_sequence)
    return output[0, 0]

def am_forecast(data, model, timesteps):
    """
    Forecast temperature between 00:00 to 11:00.

    Parameters:
        data (pd.Series): Input data for forecasting.
        model: Trained forecasting model.
        timesteps (int): Number of time steps for prediction.

    Returns:
        np.array: Forecasted temperatures.
    """
    forecasted_data = []

    for _ in range(12):
        input_data = data[-timesteps:]
        input_sequence = input_data.reshape(1, timesteps, 1)

        prediction = predict_single_time_step(data, model, input_sequence)
        forecasted_data.append(prediction)

        data = np.append(data, prediction)

    return np.array(forecasted_data)

# Retrieves hourly data from input data for the specified hour
def get_hourly_data(input_data, hour):
    return input_data[input_data.index.hour == hour]

# Prepares a data slice of the specified length from hourly data.
def prepare_data_slice(hourly_data, slice_length):
    data_slice = hourly_data[-slice_length:]
    data_slice = np.array(data_slice).reshape(1, slice_length, 4)
    return data_slice

# Denormalizes a prediction back to the original scale
def destandardised_prediction(prediction, train_mean, train_std):
    prediction_original_scale = prediction * train_std + train_mean
    return prediction_original_scale


def pm_forecast(input_data, model, slice_length, train_mean, train_std):
    """
    Generates a PM forecast for each hour between 12:00 and 23:00.

    Parameters:
        data (pd.Series): Input data for forecasting.
        model: Trained forecasting model.
        slice_length (int): Number of time steps for prediction.
        train_min (float): Minimum value from the training data (for denormalization).
        train_max (float): Maximum value from the training data (for denormalization).
    Returns:
        np.array: Forecasted temperatures.
    """
    forecasted_data = []

    for hour in range(12,24):
        hourly_data = get_hourly_data(input_data, hour)
        data_slice = prepare_data_slice(hourly_data, slice_length)

        prediction = model.predict(data_slice)[0, 0]
        denormalized_prediction = destandardised_prediction(prediction, train_mean, train_std)
        forecasted_data.append(denormalized_prediction)

    return np.array(forecasted_data)

# Initialise starting parameters and data such as train's min and max
def init():
    try:
        global train_data  # Use the global train_data variable
        print("Initializing data and parameters...\n")
        kumeu_df = load_data(KUMEU_DATA_PATH)
        kumeu_df = handle_missing_values(kumeu_df)
        kumeu_df = select_columns(kumeu_df, SELECTED_COLUMNS)
        train_data = prepare_transformation_data(kumeu_df, train_percentage=0.8)
        print("\nData and parameters initialized.\n")
    except Exception as e:
        print(f"An error occurred: {e}")

# Handles AI forecasting
def main():
    try:
        print("\nAutomating data processing for historical data...\n")
        new_data = get_weather_data()
        if new_data is not None:
            new_data = process_weather_data(new_data)
        new_data = handle_missing_values(new_data)
        new_data = select_columns(new_data, SELECTED_COLUMNS)
        return new_data  # Return the processed data

    except FileNotFoundError as fnf_err:
        print(f"File not found: {fnf_err}")
        return None


# Handles AI forecasting
def run_ai(target_date):
    try:
        new_data = main()

        if train_data is None:
            print("Initial configurations haven't been optimized. Restarting System!")
            init()

        new_data = prepare_data(new_data, target_date, TARGET_COLUMN)
        return generate_forecasts(new_data)

    except Exception as e:
        handle_general_error(e)

def generate_forecasts(dummy_data):
    train_mean, train_std = train_data.mean(), train_data.std()
    dummy_data_normalised = transform_data(dummy_data, train_mean, train_std)

    print("Data processing completed for new_data.\n")

    print("Generating forecasts for new_data...")
    am_model = load_model(AM_MODEL_PATH)
    pm_model = load_model(PM_MODEL_PATH)

    first_yhat = am_forecast(dummy_data['Air_temp'].values, am_model, TIMESTEPS)
    second_yhat = pm_forecast(dummy_data_normalised, pm_model, SLICE_LENGTH, train_mean['Air_temp'], train_std['Air_temp'])

    combined_array = np.concatenate([first_yhat, second_yhat])

    print("Forecasts generated for dummy_data.")
    return combined_array


def handle_general_error(e):
    print(f"AI Script encountered an error: {e}")

def send_forecast_to_db(input_data):
    try:
        connection = connect_to_db()  # Call your connect_to_db function to get the connection

        cursor = connection.cursor()
        # Delete all existing records from the forecast table
        delete_query = """
        DELETE FROM forecast;
        """
        cursor.execute(delete_query)

        # Reset the sequence for forecast_id
        reset_sequence_query = """
        SELECT setval('forecast_id_seq', 1, false);
        """
        cursor.execute(reset_sequence_query)

        insert_query = """
        INSERT INTO forecast (forecast_id, node_id, timestamp, temperature)
        VALUES (nextval('forecast_id_seq'), 1, %s, %s);
        """

        prediction_timestamps = input_data['Timestamp']
        prediction_values = input_data['Temperature']

        # Iterate through the array of timestamps and insert each pair
        for prediction_timestamp, prediction_value in zip(prediction_timestamps, prediction_values):
            data = (prediction_timestamp, prediction_value)
            cursor.execute(insert_query, data)

        connection.commit()
        print("Data inserted successfully")

    except (Exception, psycopg2.Error) as error:
        print("Error while inserting data:", error)

    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            print("Database connection closed")

def connect_to_db():
  db_params = {
    "host": "localhost",
    "database": "kumeudb",
    "user": "kumeu",
    "password": "QV8nXb2t5B"}

  try:
      connection = psycopg2.connect(**db_params)
      cursor = connection.cursor()
      print("Connected to the database")
      return connection

  except (Exception, psycopg2.Error) as error:
      print("Error while connecting to the database:", error)

# Set the time zone to New Zealand
nz_tz = pytz.timezone('Pacific/Auckland')
# Get the current time in New Zealand time zone
current_time = datetime.now(nz_tz)
# Extract and format the date
current_date = current_time.strftime('%Y-%m-%d')

if __name__ == "__main__":
    print("AI Script started.")
    prediction = run_ai(current_date)
    current_date = datetime.strptime(current_date, "%Y-%m-%d")
	
    # Create a DatetimeIndex with 5-minute intervals for the entire day
    subhourly_range = pd.date_range(start=current_date, end=current_date + pd.DateOffset(days=1) - pd.Timedelta(minutes=5), freq="5T")

    # Create a DataFrame with the hourly data and index
    hourly_range = pd.date_range(start=current_date, periods=len(prediction), freq="H")
    forecast_df = pd.DataFrame({"Temperature": prediction}, index=hourly_range)

    # Reindex the DataFrame to match the subhourly DatetimeIndex and interpolate
    forecast_df = forecast_df.reindex(subhourly_range).interpolate(method="linear")
    forecast_df = forecast_df.reset_index()
    forecast_df.rename(columns={"index": "Timestamp"}, inplace=True)
    send_forecast_to_db(forecast_df)

    if prediction is not None:
        print("AI Script finished.")
    else:
        print("AI Script encountered an error.")
