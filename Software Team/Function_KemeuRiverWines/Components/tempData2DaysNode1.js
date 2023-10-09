import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from 'victory-native';

const SERVER_URL = "115.188.10.251:3000";
const node_id = "eui-70b3d57ed005de54";
const SENSOR = "temperature";
const DAYS = 2;
const API_URL = `http://${SERVER_URL}/api/nodeData/${node_id}/sensors/${SENSOR}/${DAYS}`;

const Component = ({ onDataReceived }) => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [timestampData, setTimestampData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            
            console.log(API_URL);

            const response = await fetch(API_URL);
            const data = await response.json();

            const sensorOneData = data.sensorData;

            // Extract temperature and timestamp values into separate arrays
            const temperatures = sensorOneData.map(entry => entry.temperature);
            const timestamps = sensorOneData.map(entry => entry.timestamp);

            temperatures.reverse();
            timestamps.reverse();

            setTemperatureData(temperatures);
            setTimestampData(timestamps);

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
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
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