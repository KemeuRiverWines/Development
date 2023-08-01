import React, { useEffect, useState } from 'react';

const API_URL = 'http://122.58.68.153:3000/api/data/all/temp';
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

            setTemperatureData(temperatures);
            setTimestampData(timestamps);

            console.log('Sensor Request Successful = http://122.58.68.153:3000/api/data/all/temp');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Your JSX and component logic here
    // You can use temperatureData and timestampData to create your line chart later

    return null;
};

export default Component;
