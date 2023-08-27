import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import TemperatureScreen from './screens/TemperatureScreen';
import WeatherPage from './screens/WeatherPage';
import TestComponent from './screens/TestComponent';
import Node1Details from './screens/Node1Details';
import SensorControlScreen from './screens/SensorControlScreen';

const Stack = createStackNavigator();


const App = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tempreature Screen">
          <Stack.Screen name="Temperature Screen" component={TemperatureScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Weather Page" component={WeatherPage} />
          <Stack.Screen name="Test Component" component={TestComponent} />
          <Stack.Screen name="Node1Details" component={Node1Details} />
          <Stack.Screen name="SensorControlScreen" component={SensorControlScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
