import { StyleSheet, Text, View } from 'react-native';
import PinCode from 'react-native-pin-code';
import React, { useState, useEffect, useRef } from 'react';

import WeatherAirTemp from './Components/WeatherAirTemp';
import WeatherWindDir from './Components/WeatherWindDir';
import WeatherWindSpeed from './Components/WeatherWindSpeed';
import WeatherHumid from './Components/WeatherHumid';
import WeatherMain from './Components/WeatherMain';
import SensorComponent1 from './Components/SensorComponent1';
import TempData10Days1 from './Components/TempData10Days1';

export default function App() {
  const [pinEntered, setPinEntered] = useState(false);
  const [sensorData1, setSensorData1] = useState(null);
  const sensorComponent1Ref = useRef(null);

  const handleDataReceived1 = (latestData) => {
    setSensorData1(latestData);
  };

  const handlePinEntered = () => {
    setPinEntered(true);
  };

  useEffect(() => {
    // This will be called when pinEntered changes
    // Add any code that needs to be executed here
  }, [pinEntered]);

  return (
    <View style={styles.container}>
      {!pinEntered ? (
        <PinCode
          code="1234"
          text="Enter PIN number to access app"
          error="That is incorrect, please try again"
          passwordLength={4}
          success={() => handlePinEntered()}
          keyboardType="numeric"
        />
      ) : (
        <>
          <View>
            <WeatherAirTemp />
          </View>
          <View>
            <WeatherWindDir />
          </View>
          <View>
            <WeatherWindSpeed />
          </View>
          <View>
            <WeatherHumid />
          </View>
          <View>
            <WeatherMain />
          </View>
          <View>
            <SensorComponent1 ref={sensorComponent1Ref} onDataReceived={handleDataReceived1} />
            {sensorData1 && (
              <View>
                <Text>Sensor 1 Temp: {sensorData1.temperature}</Text>
                <Text>Sensor 1 Humidity: {sensorData1.humidity}</Text>
                <Text>Sensor 1 Dew Point: {sensorData1.dew_point}</Text>
                <Text>Sensor 1 Wind Speed: {sensorData1.wind_speed}</Text>
                <Text>Sensor 1 Leaf Wetness: {sensorData1.leaf_wetness}</Text>
                <Text>Sensor 1 Rainfall: {sensorData1.rainfall}</Text>
                <Text>Sensor 1 Time Stamp: {sensorData1.timestamp}</Text>
                <Text>Sensor 1 Last Update: {sensorData1.timeAgo}</Text>
              </View>
            )}
          </View>
          <View>
              <TempData10Days1 />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 10,
  },
});
