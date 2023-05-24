import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const API_KEY = '892cfa11d6274c72bd30be34af497b99';

const WeatherComponent = () => {
    const [humidity, setHumidity] = useState(null);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=${API_KEY}`
            );

            
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            
            const data = await response.json();
            setHumidity(data.main.humidity);
            
            console.log("Weather Humidity Successful (OpenWeatherMap Api) = " + `https://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=${API_KEY}`)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            {humidity !== null ? (
                <Text>The current humidity in Auckland is: {humidity}%</Text>
            ) : (
                <Text>Loading humidity data...</Text>
            )}
        </View>
    );
};

export default WeatherComponent;
