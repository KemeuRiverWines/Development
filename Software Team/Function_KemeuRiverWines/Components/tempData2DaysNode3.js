import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from 'victory-native';


const Component = ({ selectedDataType }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [timestampData, setTimestampData] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);
    const [rainfallData, setRainfallData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [leafWetnessData, setLeafWetnessData] = useState([]);
    const [windSpeedData, setWindSpeedData] = useState([]);
    const [dewPointData, setDewPointData] = useState([]);

    useEffect(() => {
        const now = new Date();
        now.setHours(now.getHours() + 12);
        const fourDaysAgo = new Date(now.getTime());
        fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
        fourDaysAgo.setHours(fourDaysAgo.getHours() + 12);

        const start = fourDaysAgo.toISOString().slice(0, -10) + "00:00";
        const stop = now.toISOString().slice(0, -10) + "00:00";

        const url = `http://api.metwatch.nz/api/legacy/weather/hourly?station=KMU&start=${start}&stop=${stop}`;
        console.log(url);

        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-api-key': 'iWe1rParl8d226JqFJeM0ZpZcKfl6rbvmdtKay2TCOW8NHSKGefEpF0HsAQ0OTKBuZtAAB0xLOlw93Q2'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                //Process Time Data
                const convertedTimestamps = json.SDATA.map(timestamp => new Date(timestamp * 1000));
                setTimestampData(convertedTimestamps);

                //Process Temperature Data
                const convertedTemperatureData = json.TDDATA.map(temp => parseFloat(temp));
                setTemperatureData(convertedTemperatureData);

                //Process Rainfall Data
                const convertedRainfallData = json.RNDATA.map(data => parseFloat(data));
                setRainfallData(convertedRainfallData);
            
                //Process Humidity Data
                const convertedHumidityData = json.RHDATA.map(data => parseFloat(data));
                setHumidityData(convertedHumidityData);
            
                //Process Leaf Wetness Data
                const convertedLeafWetnessData = json.LSDATA.map(data => parseFloat(data));
                setLeafWetnessData(convertedLeafWetnessData);
            
                //Process Wind Speed Data
                const convertedWindSpeedData = json.WSDATA.map(data => parseFloat(data));
                setWindSpeedData(convertedWindSpeedData);
            
                //Process Dew Point Data
                const convertedDewPointData = json.DPDATA.map(data => parseFloat(data));
                setDewPointData(convertedDewPointData);

                // console.log(temperatureData);
                // console.log(humidityData);
                // console.log(rainfallData);
                // console.log(leafWetnessData);
                // console.log(windSpeedData);
                // console.log(dewPointData);

                setIsLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    let lastLabelTimestamp = null;

    function hasSixHoursChanged(previousTimestamp, currentTimestamp) {
        currentDate = new Date(currentTimestamp);
        if (lastLabelTimestamp === null || Math.abs(currentDate - lastLabelTimestamp) >= 12 * 60 * 60 * 1000) {
            lastLabelTimestamp = currentDate;
            return true;
        }
        return false;
    }

    if (isLoading) {
        return (
            <View>
                <Text>Loading Graph...</Text>
            </View>
        );
    }

    let dataToDisplay;
    switch (selectedDataType) {
        case 'TDDATA':
            dataToDisplay = temperatureData;
            textToDisplay = 'Temperature Data for the last 4 days';
            break;
        case 'RHDATA':
            dataToDisplay = humidityData;
            textToDisplay = 'Humidity Data for the last 4 days';
            break;
        case 'DPDATA':
            dataToDisplay = dewPointData;
            textToDisplay = 'Dew Point Data for the last 4 days';
            break;
        case 'WSDATA':
            dataToDisplay = windSpeedData;
            textToDisplay = 'Wind Speed Data for the last 4 days';
            break;
        case 'LSDATA':
            dataToDisplay = leafWetnessData;
            textToDisplay = 'Leaf Wetness Data for the last 4 days';
            break;
        case 'RNDATA':
            dataToDisplay = rainfallData;
            textToDisplay = 'Rainfall Data for the last 4 days';
            break;
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
                    text={textToDisplay}
                    x={250}
                    y={35}
                    textAnchor="middle"
                />
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
