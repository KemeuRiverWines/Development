import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from 'victory-native';


const Component = ({ onDataReceived }) => {
    
    const [data, setData] = useState(null);
    const [timestampData, setTimestampData] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
        const now = new Date();
        now.setHours(now.getHours() + 12);
        const yesterday = new Date(now.getTime());
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(yesterday.getHours() + 12);
        // console.log('Yesterday:', yesterday);
        // console.log('Now:', now);

        const start = yesterday.toISOString().slice(0, -10) + "00:00";
        const stop = now.toISOString().slice(0, -10) + "00:00";

        // console.log('Start:', start);
        // console.log('Stop:', stop);

        const url = `http://api.metwatch.nz/api/legacy/weather/hourly?station=KMU&start=${start}&stop=${stop}`;

        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-api-key': 'iWe1rParl8d226JqFJeM0ZpZcKfl6rbvmdtKay2TCOW8NHSKGefEpF0HsAQ0OTKBuZtAAB0xLOlw93Q2'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                onDataReceived(json);  // Call the function prop here
                setTimestampData(json.STOPSTAMP);
                setTemperatureData(json.TDDATA);
            })
            .catch((error) => console.error(error));
    }, []);

    // console.log(data);    

    // Helper function to check if the hour has changed
    let lastLabelTimestamp = null;

    function hasSixHoursChanged(previousTimestamp, currentTimestamp) {
        currentDate = new Date(currentTimestamp);

        if (lastLabelTimestamp === null || Math.abs(currentDate - lastLabelTimestamp) >= 5 * 60 * 60 * 1000) { //CHANGE THIS TO WHAT EVER TO CHANGE INTERVALS OF LABELS
            lastLabelTimestamp = currentDate;
            // console.log(Math.abs(currentDate - lastLabelTimestamp));
            // console.log(lastLabelTimestamp);
            return true;
        }
        return false;
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
