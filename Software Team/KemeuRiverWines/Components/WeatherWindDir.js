import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { encode } from 'base-64';
import { Text } from 'react-native';

const WeatherWindDir = () => {
    const [windDirection, setWindDirection] = useState(null);

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

            const url = `https://api.meteomatics.com/${formattedDate}T${formattedTime}+12:00/wind_dir_10m:d/-36.852095,174.7631803/json?model=mix`;
            const username = 'aucklanduniversityoftechnology_ali';
            const password = 'i4b8tLSu6A';

            
            try {
                const encodedCredentials = encode(`${username}:${password}`);
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Basic ${encodedCredentials}`,
                    },
                });
                
                const windDirection = response.data.data[0].coordinates[0].dates[0].value;
                setWindDirection(windDirection);
                
                console.log(`Weather Wind Direction Successful (Meteomatics Weather API) = ${url}`);
            } catch (error) {
                console.error('API Error:', error);
            }
        };

        fetchData();
    }, []);

    const getWindDirectionText = (angle) => {
        let windDirectionText = '';

        if (angle >= 337.5 || angle < 22.5) {
            windDirectionText = 'North';
        } else if (angle >= 22.5 && angle < 67.5) {
            windDirectionText = 'North East';
        } else if (angle >= 67.5 && angle < 112.5) {
            windDirectionText = 'East';
        } else if (angle >= 112.5 && angle < 157.5) {
            windDirectionText = 'South East';
        } else if (angle >= 157.5 && angle < 202.5) {
            windDirectionText = 'South';
        } else if (angle >= 202.5 && angle < 247.5) {
            windDirectionText = 'South West';
        } else if (angle >= 247.5 && angle < 292.5) {
            windDirectionText = 'West';
        } else if (angle >= 292.5 && angle < 337.5) {
            windDirectionText = 'North West';
        }

        return windDirectionText;
    };

    const windDirectionText = getWindDirectionText(windDirection);

    return (
        <Text>
            {windDirection !== null ? `The current wind direction in Auckland is: ${windDirectionText} (${windDirection} degrees)` : 'Loading air temperature...'}
        </Text>
    );
};

export default WeatherWindDir;
