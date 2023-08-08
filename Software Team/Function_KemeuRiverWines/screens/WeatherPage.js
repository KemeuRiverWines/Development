import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const WeatherPage = () => {
  const [temperature, setTemperature] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [temperatureData, setTemperatureData] = useState([]);

  const navigation = useNavigation();

  // 
  const fetchTemperatureData = () => {
    // 
    const data = [20, 22, 24, 26, 25, 23, 21];
    temperatureData.push(data);
    // console.warn(data);
  };

  // 
  useEffect(() => {
    fetchTemperatureData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperature: {temperature}°C</Text>
      <Text style={styles.title}>windSpeed: {windSpeed} m/s</Text>
      <Text style={styles.title}>humidity: {humidity}%</Text>
      <LineChart
        data={{
          labels: ['1', '2', '3', '4', '5', '6', '7'],
          datasets: [
            {
              data: temperatureData,
            },
          ],
        }}
        width={350}
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default WeatherPage;
