import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import TemperatureScreen from './screens/TemperatureScreen';
import WeatherPage from './screens/WeatherPage';
import TestComponent from './screens/TestComponent';
import Node1Details from './screens/Node1Details';
import Node2Details from './screens/Node2Details';
import Node3Details from './screens/Node3Details';
import SensorControlScreen from './screens/SensorControlScreen';
import MapScreen from './screens/MapScreen';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPassword from './screens/ForgotPassword';

const Stack = createStackNavigator();


const App = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="Temperature Screen" component={TemperatureScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Weather Page" component={WeatherPage} />
          <Stack.Screen name="Test Component" component={TestComponent} />
          <Stack.Screen name="Node1Details" component={Node1Details} />
          <Stack.Screen name="Node2Details" component={Node2Details} />
          <Stack.Screen name="Node3Details" component={Node3Details} />
          <Stack.Screen name="SensorControlScreen" component={SensorControlScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

          <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
