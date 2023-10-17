import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import moment from 'moment-timezone';

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
                    // Use moment.js to handle timezone conversion and formatting
                    let date = moment(entry.timestamp).tz("Pacific/Auckland");
                
                    function isDaylightSavingChecker(date) {
                        // Daylight saving starts on the last Sunday in September
                        let dstStart = new Date(Date.UTC(date.year(), 8, 1));
                        dstStart.setUTCDate(30 - (dstStart.getUTCDay() + 1) % 7);
                
                        // Daylight saving ends on the first Sunday in April
                        let dstEnd = new Date(Date.UTC(date.year(), 3, 1));
                        dstEnd.setUTCDate(7 - (dstEnd.getUTCDay() + 6) % 7);
                
                        // Check if the current date is within the DST period
                        return date >= dstStart && date < dstEnd;
                    }
                
                    // Check if daylight saving is active
                    let isDaylightSaving = isDaylightSavingChecker(date);
                
                    // Add 12 or 13 hours to the date
                    date.add(isDaylightSaving ? 13 : 12, 'hours');
                
                    // Return the adjusted date as a formatted string
                    return date.format('DD/MM/YYYY, hh:mmA');
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

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <View>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={['Timestamp', 'Temperature']} style={styles.head} textStyle={styles.text} />
                {
                    timestampData.map((timestamp, index) => (
                        <Row key={index} data={[timestamp.toLocaleString(), temperatureData[index].toFixed(2)]} textStyle={styles.text} />
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
