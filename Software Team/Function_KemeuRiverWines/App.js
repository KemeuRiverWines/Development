import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import TemperatureScreen from './screens/TemperatureScreen';
import WeatherPage from './screens/WeatherPage';
import TestComponent from './screens/TestComponent';

const Stack = createStackNavigator();


const App = () => {

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tempreature Screen">
          <Stack.Screen name="Temperature Screen" component={TemperatureScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Weather Page" component={WeatherPage} />
          <Stack.Screen name="Test Component" component={TestComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
