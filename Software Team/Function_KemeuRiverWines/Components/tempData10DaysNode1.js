import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from 'victory-native';

const API_URL = 'http://122.57.69.252:3000/api/data/all/temp';
const node_id = 1;

const Component = ({ onDataReceived }) => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [timestampData, setTimestampData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            // Filter data for the given node_id
            const sensorOneData = data.filter(entry => entry.node_id === node_id);

            // Extract temperature and timestamp values into separate arrays
            const temperatures = sensorOneData.map(entry => entry.temperature);
            const timestamps = sensorOneData.map(entry => entry.timestamp);

            temperatures.reverse();
            timestamps.reverse();

            setTemperatureData(temperatures);
            setTimestampData(timestamps);

            console.log('Sensor Request Successful = http://122.57.69.252:3000/api/data/all/temp');
            // console.log(temperatures);
            // console.log(timestamps);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Helper function to check if the hour has changed
    const hasHourChanged = (prevTimestamp, currentTimestamp) => {
        const prevDate = new Date(prevTimestamp);
        const currentDate = new Date(currentTimestamp);
        return prevDate.getHours() !== currentDate.getHours();
    };


    return (
        <View>
            <VictoryChart
                style={{
                    parent: {
                        backgroundColor: 'white',
                    },
                }}>
                <VictoryLabel
                    text="Temperture Data for the last 10 days"
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
                        index === 0 || hasHourChanged(ticks[index - 1], timestamp)
                            ? new Date(timestamp).toLocaleTimeString()
                            : ''
                    }
                    style={{
                        tickLabels: { fill: 'black', angle: -20 }, // Set the angle to -90 for vertical labels
                        axis: { stroke: 'black' },
                    }}
                />
                <VictoryAxis dependentAxis
                    style={{
                        tickLabels: { fill: 'black' },
                        axis: { stroke: 'black' },
                    }}
                />
            </VictoryChart>
        </View>
    );
};

export default Component;

// const styles = StyleSheet.create({
//     container: {
//         height: 100,
//     }
// });

//under VictoryAxis
                        // If you want to show the date as well, you can use the below tickFormat instead
                        // tickFormat={(timestamp, index, ticks) =>
                        //     index === 0 || hasHourChanged(ticks[index - 1], timestamp)
                        //         ? new Date(timestamp).toLocaleString()
                        //         : ''
                        // }