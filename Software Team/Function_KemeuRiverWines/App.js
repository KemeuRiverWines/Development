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

import Node1Forecast from './screens/Node1Forecast';
import Node2Forecast from './screens/Node2Forecast';
import Node3Forecast from './screens/Node3Forecast';

import SensorControlScreen from './screens/SensorControlScreen';
import MapScreen from './screens/MapScreen';

import ForgotPassword from './screens/ForgotPassword';
import LoginScreen from './screens/LoginScreen';

import HistoricData from './screens/HistoricData';

const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login Screen">
          <Stack.Screen name="Temperature Screen" component={TemperatureScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Weather Page" component={WeatherPage} />
          <Stack.Screen name="Test Component" component={TestComponent} />

          <Stack.Screen name="Node 1 Details" component={Node1Details} options={{headerTitleAlign: "center"}}/>
          <Stack.Screen name="Node 2 Details" component={Node2Details} options={{headerTitleAlign: "center"}}/>
          <Stack.Screen name="Node 3 Details" component={Node3Details} options={{headerTitleAlign: "center"}}/>

          <Stack.Screen name="Node 1 Temperature Forecast" component={Node1Forecast} options={{headerTitleAlign: "center"}} />
          <Stack.Screen name="Node 2 Temperature Forecast" component={Node2Forecast} options={{headerTitleAlign: "center"}} />
          <Stack.Screen name="Node 3 Temperature Forecast" component={Node3Forecast} options={{headerTitleAlign: "center"}} />

          <Stack.Screen name="Sensor Control Screen" component={SensorControlScreen} options={{headerTitleAlign: "center"}} />

          <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false}} />

          <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{headerShown: false}} />
          <Stack.Screen name="Login Screen" component={LoginScreen} options={{headerShown: false}} />

          <Stack.Screen name="Historic Data" component={HistoricData} options={{headerTitleAlign: "center"}} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
