import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from 'victory-native';

const SERVER_URL = '115.188.10.251:3000';
const node_id = "eui-70b3d57ed00618ec";
const current_Date = new Date();
const dateTenDaysAgo = new Date();
dateTenDaysAgo.setDate(current_Date.getDate() - 2);
const dateISO = dateTenDaysAgo.toISOString();
const sensors = "timestamp,temperature,humidity,leaf_wetness,wind_speed,dew_point,rainfall";
const API_URL = `http://${SERVER_URL}/api/nodeData/${node_id}/sensors?sensors=${sensors}&time=${dateISO}`;

const Component = ({ onDataReceived }) => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [timestampData, setTimestampData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [leafWetnessData, setLeafWetnessData] = useState([]);
    // const [windSpeedData, setWindSpeedData] = useState([]);
    const [dewPointData, setDewPointData] = useState([]);
    // const [rainfallData, setRainfallData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            // Filter data for the given node_id
            
            const sensorOneData = data.sensorData;

            // Extract temperature and timestamp values into separate arrays
            const timestamps = sensorOneData.map(entry => entry.timestamp);
            const temperatures = sensorOneData.map(entry => entry.temperature);
            const humidity = sensorOneData.map(entry => entry.humidity);
            const leafWetness = sensorOneData.map(entry => entry.leaf_wetness);
            // const windSpeed = sensorOneData.map(entry => entry.wind_speed);
            const dewPoint = sensorOneData.map(entry => entry.dew_point);
            // const rainfall = sensorOneData.map(entry => entry.rainfall);

            // temperatures.reverse();
            // timestamps.reverse();

            setTimestampData(timestamps);
            setTemperatureData(temperatures);
            setHumidityData(humidity);
            setLeafWetnessData(leafWetness);
            // setWindSpeedData(windSpeed);
            setDewPointData(dewPoint);
            // setRainfallData(rainfall);

            console.log('Sensor Request Successful = http://115.188.10.251:3000/api/data/all/temp');

            setIsLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Helper function to check if the hour has changed
    let lastLabelTimestamp = null;

    function hasSixHoursChanged(previousTimestamp, currentTimestamp) {
        currentDate = new Date(currentTimestamp);

        if (lastLabelTimestamp === null || Math.abs(currentDate - lastLabelTimestamp) >= 10 * 60 * 60 * 1000) { //CHANGE THIS TO WHAT EVER TO CHANGE INTERVALS OF LABELS
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

    return (
        <View>
            <VictoryChart
                style={{
                    parent: {
                        backgroundColor: 'white',
                    },
                }}>
                <VictoryLabel
                    text="Temperture Data for the last 2 days"
                    x={250}
                    y={35}
                    textAnchor="middle"
                />
                <VictoryLine
                    data={timestampData.map((timestamp, index) => ({ x: timestamp, y: temperatureData[index] }))}
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
                        tickLabels: { fill: 'black', angle: -20 }, // Set the angle to -90 for vertical labels
                        axis: { stroke: 'black' },
                        // grid: { stroke: 'lightgrey', strokeWidth: 1.5 },
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
