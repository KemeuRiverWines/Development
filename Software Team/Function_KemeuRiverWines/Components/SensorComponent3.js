import React, { useEffect } from 'react';

const SERVER_URL = '115.188.10.251:3000';
const node_id = "eui-70b3d57ed006182e";
const currentDate = new Date();
const dateTenDaysAgo = new Date(currentDate).setDate(currentDate.getDate() - 10);
const dateISO = dateTenDaysAgo.toISOString();
const sensors = "temperature,humidity,leaf_wetness,wind_speed,wind_direction,rainfall";
const API_URL = `http://${SERVER_URL}/api/nodeData/${node_id}/sensors?sensors=${sensors}&time={dateISO}`;


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
            const response = await fetch(API_URL);
            const data = await response.json();

            const sensorOneData = data.sensorData;
            let latestEntry1 = sensorOneData.length > 0 ? sensorOneData[0] : null;

            if (latestEntry1) {
                const timestamp = new Date(latestEntry1.timestamp);
                const now = new Date();
                const timeDifference = now.getTime() - timestamp.getTime();
                const minutesAgo = Math.floor(timeDifference / (1000 * 60));

                latestEntry1.timeAgo = minutesAgo === 1 ? '1 Minute ago' : `${minutesAgo} Minutes ago`;
            } else {
                // If there's no data available, provide default values or an empty object
                latestEntry1 = { temperature: null, rainfall: null, timeAgo: 'No data available' };
            }

            // Ensure that onDataReceived is always called
            onDataReceived(latestEntry1);
            //console.log(latestEntry1);

            // console.log('Sensor Request Successful = http://115.188.10.251:3000/api/data/all');
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
