import React, { useEffect } from 'react';

const API_URL = 'http://122.58.68.153:3000/api/data/all';

const Component = ({ onDataReceived }) => {
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            const sensorOneData = data.filter(entry => entry.node_id === 1);
            const latestEntry = sensorOneData.length > 0 ? sensorOneData[0] : null;

            if (latestEntry) {
                const timestamp = new Date(latestEntry.timestamp);
                const now = new Date();
                const timeDifference = now.getTime() - timestamp.getTime();
                const minutesAgo = Math.floor(timeDifference / (1000 * 60));

                latestEntry.timeAgo = minutesAgo === 1 ? '1 Minute' : `${minutesAgo} Minutes`;
                onDataReceived(latestEntry);
            }

            console.log('Sensor Request Successful = http://122.58.68.153:3000/api/data/all');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return null;
};

export default Component;
