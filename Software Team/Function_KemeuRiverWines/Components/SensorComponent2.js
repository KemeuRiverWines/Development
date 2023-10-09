import React, { useEffect } from 'react';

const SERVER_URL = '115.188.10.251:3000';
const node_id = "eui-70b3d57ed00618ec";
const currentDate = new Date();
const dateTenDaysAgo = new Date();
dateTenDaysAgo.setDate(currentDate.getDate() - 10);
const dateISO = dateTenDaysAgo.toISOString();
const sensors = "timestamp,temperature,humidity,leaf_wetness,wind_speed,dew_point,rainfall";
const API_URL = `http://${SERVER_URL}/api/nodeData/${node_id}/sensors?sensors=${sensors}&time=${dateISO}`;

const SensorComponent2 = ({ onDataReceived }) => {
    
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            console.log(API_URL);
            const response = await fetch(API_URL);
            const data = await response.json();

            const sensorOneData = data.sensorData;
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

            // console.log('Sensor Request Successful = http://115.188.10.251:3000/api/data/all');
        } catch (error) {
            console.error('Error fetching data:', error);
            // Alert.alert('Error Fetching Data', 'Please reload the app');
        }
    };

    return null;
};

export default SensorComponent2;

