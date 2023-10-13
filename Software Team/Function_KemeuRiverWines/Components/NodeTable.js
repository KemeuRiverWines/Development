import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import moment from 'moment-timezone';

const Component = ({ selectedDataType, selectedDays, nodeID }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [timestampData, setTimestampData] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);
    const [rainfallData, setRainfallData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [leafWetnessData, setLeafWetnessData] = useState([]);
    const [windSpeedData, setWindSpeedData] = useState([]);
    const [dewPointData, setDewPointData] = useState([]);

    const SERVER_URL = '115.188.10.251:3000';
    const node_id = nodeID;
    const current_Date = new Date();
    const dateSelectedDaysAgo = new Date();
    dateSelectedDaysAgo.setDate(current_Date.getDate() - selectedDays);
    const dateISO = dateSelectedDaysAgo.toISOString();
    const sensors = "timestamp,temperature,humidity,leaf_wetness,wind_speed,dew_point,rainfall";
    const API_URL = `http://${SERVER_URL}/api/nodeData/${node_id}/sensors?sensors=${sensors}&time=${dateISO}`;

    useEffect(() => {
        fetchData();
    }, [selectedDataType, selectedDays]);

    const fetchData = async () => {
        try {

            setIsLoading(true);

            const response = await fetch(API_URL);
            const data = await response.json();

            const sensorOneData = data.sensorData;

            const timestamps = sensorOneData.map(entry => {
                return moment(entry.timestamp).tz("Pacific/Auckland").format('DD/MM/YYYY, hh:mmA');
            });
            const temperatures = sensorOneData.map(entry => entry.temperature);
            const humidity = sensorOneData.map(entry => entry.humidity);
            const leafWetness = sensorOneData.map(entry => entry.leaf_wetness);
            const windSpeed = sensorOneData.map(entry => entry.wind_speed);
            const dewPoint = sensorOneData.map(entry => entry.dew_point);
            const rainfall = sensorOneData.map(entry => entry.rainfall);

            // temperatures.reverse();
            // timestamps.reverse();

            setTimestampData(timestamps);
            setTemperatureData(temperatures);
            setHumidityData(humidity);
            setLeafWetnessData(leafWetness);
            setWindSpeedData(windSpeed);
            setDewPointData(dewPoint);
            setRainfallData(rainfall);

            console.log('Sensor Request Successful = http://115.188.10.251:3000/api/data/all/temp');

            setIsLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    let dataToDisplay;
	switch (selectedDataType) {
		case 'TEMPERATURE':
			dataToDisplay = temperatureData;
			textToDisplay = 'Temperature Data';
			valueType = 'Temperature (°C)'
			break;
		case 'HUMIDITY':
			dataToDisplay = humidityData;
			textToDisplay = 'Humidity Data';
			valueType = 'Humidity (%)'
			break;
		case 'DEWPOINT':
			dataToDisplay = dewPointData;
			textToDisplay = 'Dew Point Data';
			valueType = 'Dew Point (°C)'
			break;
		case 'WINDSPEED':
			dataToDisplay = windSpeedData;
			textToDisplay = 'Wind Speed Data';
			valueType = 'Wind Speed (km/h)'
			break;
		case 'LEAFWETNESS':
			dataToDisplay = leafWetnessData;
			textToDisplay = 'Leaf Wetness Data';
			valueType = 'Leaf Wetness (arb)'
			break;
		case 'RAINFALL':
			dataToDisplay = rainfallData;
			textToDisplay = 'Rainfall Data';
			valueType = 'Rainfall (mm)'
			break;
	}

    return (
		<View>
			<Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
				<Row data={['Timestamp', valueType]} style={styles.head} textStyle={styles.text} />
				{
					timestampData.slice().reverse().map((timestamp, index) => (
						<Row key={index} data={[timestamp.toLocaleString(), dataToDisplay.slice().reverse()[index]]} textStyle={styles.text} />
					))
				}
			</Table>
		</View>
	)

}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

export default Component;