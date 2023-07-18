import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const API_KEY = '892cfa11d6274c72bd30be34af497b99';

const WeatherComponent = () => {
    const [weather, setWeather] = useState(null);

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
            setWeather(data.weather[0]);
            console.log(`Weather Main Successful (OpenWeatherMap Api) = https://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=${API_KEY}`)
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <View>
            {weather !== null ? (
                <View>
                    <Text>Main Weather in Auckland: {weather.main}</Text>
                    <Text>Description: {weather.description}</Text>
                </View>
            ) : (
                <Text>Loading weather data...</Text>
            )}
        </View>
    );
};

export default WeatherComponent;
