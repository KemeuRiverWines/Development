import React, { useEffect, useState } from 'react';

const WeatherAPIComponent = ({ onDataReceived }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const now = new Date();
        now.setHours(now.getHours() + 12);
        const yesterday = new Date(now.getTime());
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(yesterday.getHours() + 12);

        const start = yesterday.toISOString().slice(0, -10) + "00:00";
        const stop = now.toISOString().slice(0, -10) + "00:00";

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
                onDataReceived(json);
            })
            .catch((error) => console.error(error));
    }, []);

    // console.log(data);

    return null;
};

export default WeatherAPIComponent;
