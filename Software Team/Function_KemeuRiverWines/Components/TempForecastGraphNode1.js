import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis } from 'victory-native';

const API_URL = `http://115.188.10.251:3000/api/forecast/data/all/allforecast`;

const Component = () => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [timestampData, setTimestampData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(API_URL);
            const data = await response.json();

            // If data is an array
            if (Array.isArray(data)) {
                // Extract temperature and timestamp values into separate arrays
                const temperatures = data.map(entry => entry.temperature);
                const timestamps = data.map(entry => {
                    // Create a date object from the timestamp
                    let date = new Date(entry.timestamp);

                    function isDaylightSavingChecker(date) {
                        // Daylight saving starts on the last Sunday in September
                        let dstStart = new Date(Date.UTC(date.getUTCFullYear(), 8, 1));
                        dstStart.setUTCDate(30 - (dstStart.getUTCDay() + 1) % 7);

                        // Daylight saving ends on the first Sunday in April
                        let dstEnd = new Date(Date.UTC(date.getUTCFullYear(), 3, 1));
                        dstEnd.setUTCDate(7 - (dstEnd.getUTCDay() + 6) % 7);

                        // Check if the current date is within the DST period
                        return date >= dstStart && date < dstEnd;
                    }

                    // Check if daylight saving is active
                    let isDaylightSaving = isDaylightSavingChecker(new Date(entry.timestamp));

                    // Add 12 or 13 hours to the date
                    date.setHours(date.getHours() + (isDaylightSaving ? 13 : 12));

                    // Return the adjusted date as an ISO string
                    return date.toISOString();
                });

                // temperatures.reverse();
                // timestamps.reverse();

                setTemperatureData(temperatures);
                setTimestampData(timestamps);

                // console.log(timestampData);
                // console.log(temperatureData);

                console.log('Sensor Request Successful = http://115.188.10.251:3000/api/data/all/temp');
                setIsLoading(false);
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Helper function to check if the hour has changed
    let lastLabelTimestamp = null;

    function hasSixHoursChanged(previousTimestamp, currentTimestamp) {
        currentDate = new Date(currentTimestamp);

        if (lastLabelTimestamp === null || Math.abs(currentDate - lastLabelTimestamp) >= 5 * 60 * 60 * 800) { //CHANGE THIS TO WHAT EVER TO CHANGE INTERVALS OF LABELS
            lastLabelTimestamp = currentDate;
            // console.log(Math.abs(currentDate - lastLabelTimestamp));
            // console.log(lastLabelTimestamp);
            return true;
        }
        return false;
    }

    function timeXValue() {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const millisecondsSinceStartOfDay = now - startOfDay;
        const secondsSinceStartOfDay = millisecondsSinceStartOfDay / 1000;
        const minutesSinceStartOfDay = secondsSinceStartOfDay / 60;
        const hoursSinceStartOfDay = minutesSinceStartOfDay / 60;
        return Math.floor((hoursSinceStartOfDay / 24) * 288);
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
                height={300}
                style={{
                    parent: {
                        // backgroundColor: 'green',
                        // height: 50,
                        // hidden: { display: 'none' },
                    },
                }}>
                <VictoryLabel
                    text="Temperture forecast Data for the next 24 hours"
                    x={250}
                    y={35}
                    textAnchor="middle"
                />
                <VictoryLine
                    style={{
                        data: { stroke: 'red' }, // Change the color of the line as needed
                    }}
                    data={[
                        { x: timeXValue(), y: Math.min(...temperatureData) }, // Start of line (bottom)
                        { x: timeXValue(), y: Math.max(...temperatureData) }, // End of line (top)
                    ]}
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
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // height: 1000,
    },
});

export default Component;
