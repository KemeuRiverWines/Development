import React, { useEffect } from 'react';

const API_URL = 'http://122.57.69.252:3000/api/data/all';

const SensorComponent2 = ({ onDataReceived }) => {
    
    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            const sensorOneData = data.filter(entry => entry.node_id === "3");
            let latestEntry = sensorOneData.length > 0 ? sensorOneData[0] : null;

            if (latestEntry) {
                const timestamp = new Date(latestEntry.timestamp);
                const now = new Date();
                const timeDifference = now.getTime() - timestamp.getTime();
                const minutesAgo = Math.floor(timeDifference / (1000 * 60));

                latestEntry.timeAgo = minutesAgo === 1 ? '1 Minute ago' : `${minutesAgo} Minutes ago`;
            } else {
                // If there's no data available, provide default values or an empty object
                latestEntry = { temperature: null, rainfall: null, timeAgo: 'No data available' };
            }

            // Ensure that onDataReceived is always called
            onDataReceived(latestEntry);
            //console.log(latestEntry);

            // console.log('Sensor Request Successful = http://122.57.69.252:3000/api/data/all');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return null;
};

export default SensorComponent2;


{/* <Text>Sensor 1 Temp: {sensorData1.temperature}</Text>
<Text>Sensor 1 Humidity: {sensorData1.humidity}</Text>
<Text>Sensor 1 Dew Point: {sensorData1.dew_point}</Text>
<Text>Sensor 1 Wind Speed: {sensorData1.wind_speed}</Text>
<Text>Sensor 1 Leaf Wetness: {sensorData1.leaf_wetness}</Text>
<Text>Sensor 1 Rainfall: {sensorData1.rainfall}</Text>
<Text>Sensor 1 Time Stamp: {sensorData1.timestamp}</Text>
<Text>Sensor 1 Last Update: {sensorData1.timeAgo}</Text> */}
