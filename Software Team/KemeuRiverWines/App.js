import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PinCode from 'react-native-pin-code';
import React, { useState, useEffect } from 'react';

import TestButton from './Components/TestButton';
import WeatherAirTemp from './Components/WeatherAirTemp';
import WeatherWindDir from './Components/WeatherWindDir';
import WeatherWindSpeed from './Components/WeatherWindSpeed';
import WeatherHumid from './Components/WeatherHumid';
import WeatherRainFall from './Components/WeatherRainFall';

export default function App() {
  const [pinEntered, setPinEntered] = useState(false);

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
          <Text>Test Update - ITS WORKKKKSSSS YESSSSS</Text>
          <StatusBar style="auto" />
          <View>
            <TestButton />
          </View>
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
            <WeatherRainFall />
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
});
