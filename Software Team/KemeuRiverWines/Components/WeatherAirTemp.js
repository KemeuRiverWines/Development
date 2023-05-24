import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { encode } from 'base-64';
import { Text } from 'react-native';

const WeatherAirTemp = () => {
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = (currentDate.getMinutes()).toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const formattedTime = `${hours}:${minutes}:00.000`;

            const url = `https://api.meteomatics.com/${formattedDate}T${formattedTime}+12:00/t_2m:C/-36.852095,174.7631803/json?model=mix`;
            const username = 'aucklanduniversityoftechnology_ali';
            const password = 'i4b8tLSu6A';

            console.log(url);

            try {
                const encodedCredentials = encode(`${username}:${password}`);
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Basic ${encodedCredentials}`,
                    },
                });

                const temperature = response.data.data[0].coordinates[0].dates[0].value;
                setTemperature(temperature);
            } catch (error) {
                console.error('API Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Text>
            {temperature !== null ? `The current air temperature in Auckland is: ${temperature}°C` : 'Loading air temperature...'}
        </Text>
    );
};

export default WeatherAirTemp;
