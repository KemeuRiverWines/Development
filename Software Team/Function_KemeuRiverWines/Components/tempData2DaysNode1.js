import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from 'victory-native';

const Component = ({ selectedDataType, selectedDays }) => {

    const SERVER_URL = '115.188.10.251:3000';
    const node_id = "eui-70b3d57ed005de54";
    const current_Date = new Date();
    const dateSelectedDaysAgo = new Date();
    dateSelectedDaysAgo.setDate(current_Date.getDate() - selectedDays);
    const dateISO = dateSelectedDaysAgo.toISOString();
    const sensors = "timestamp,temperature,humidity,leaf_wetness,wind_speed,dew_point,rainfall";
    const API_URL = `http://${SERVER_URL}/api/nodeData/${node_id}/sensors?sensors=${sensors}&time=${dateISO}`;

    const [timestampData, setTimestampData] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [leafWetnessData, setLeafWetnessData] = useState([]);
    const [windSpeedData, setWindSpeedData] = useState([]);
    const [dewPointData, setDewPointData] = useState([]);
    const [rainfallData, setRainfallData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [selectedDataType, selectedDays]);

    const fetchData = async () => {
        try {

            setIsLoading(true);

            console.log(API_URL);

            const response = await fetch(API_URL);
            const data = await response.json();

            const sensorOneData = data.sensorData;

            // Extract temperature and timestamp values into separate arrays
            const timestamps = sensorOneData.map(entry => entry.timestamp);
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

            setIsLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Helper function to check if the hour has changed
    let lastLabelTimestamp = null;

    switch (selectedDays) {
        case 1:
            Interval = 500;
            break;
        case 2:
            Interval = 1000;
            break;
        case 3:
            Interval = 1500;
            break;
        case 4:
            Interval = 2000;
            break;
        case 5:
            Interval = 2500;
            break;
        case 6:
            Interval = 3000;
            break;
        case 7:
            Interval = 3500;
            break;
        case 8:
            Interval = 4000;
            break;
        case 9:
            Interval = 4500;
            break;
        case 10:
            Interval = 5000;
            break;
    }

    function hasSixHoursChanged(previousTimestamp, currentTimestamp) {
        currentDate = new Date(currentTimestamp);

        if (lastLabelTimestamp === null || Math.abs(currentDate - lastLabelTimestamp) >= 10 * 60 * 60 * Interval) { //CHANGE THIS TO WHAT EVER TO CHANGE INTERVALS OF LABELS
            lastLabelTimestamp = currentDate;
            // console.log(Math.abs(currentDate - lastLabelTimestamp));
            // console.log(lastLabelTimestamp);
            return true;
        }
        return false;
    }

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    switch (selectedDataType) {
        case 'TEMPERATURE':
            dataToDisplay = temperatureData;
            break;
        case 'HUMIDITY':
            dataToDisplay = humidityData;
            break;
        case 'DEWPOINT':
            dataToDisplay = dewPointData;
            break;
        case 'WINDSPEED':
            dataToDisplay = windSpeedData;
            break;
        case 'LEAFWETNESS':
            dataToDisplay = leafWetnessData;
            break;
        case 'RAINFALL':
            dataToDisplay = rainfallData;
            break;
    }

    return (
        <View>
            <VictoryChart
                style={{
                    parent: {
                        backgroundColor: 'transparent',
                        // marginTop: -20,
                    },
                }}>
                <VictoryLine
                    data={timestampData.map((timestamp, index) => ({ x: timestamp, y: dataToDisplay[index] }))}
                    style={{
                        data: { stroke: 'green' },
                    }}
                />
                <VictoryAxis
                    tickValues={timestampData}
                    tickFormat={(timestamp, index, ticks) =>
                        index === ticks.length - 1 || hasSixHoursChanged(ticks[index + 1], timestamp)
                            ? new Date(timestamp).toLocaleString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                            }).replace(',', '\n')
                            : ''
                    }
                    style={{
                        tickLabels: { fill: 'black', angle: -0 }, // Set the angle to -90 for vertical labels
                        axis: { stroke: 'black' },
                    }}
                />
                <VictoryAxis dependentAxis
                    style={{
                        tickLabels: { fill: 'black' },
                        axis: { stroke: 'black' },
                        grid: { stroke: 'lightgrey', strokeWidth: 1.5 },
                    }}
                />
            </VictoryChart>
        </View>
    );
};

export default Component;