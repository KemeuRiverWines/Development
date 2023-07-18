import React from 'react';
import 'react-native-gesture-handler';
import TemperatureScreen from './TemperatureScreen';
import WeatherPage from './WeatherPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
//test
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="TemperatureScreen" component={TemperatureScreen} />
      <Stack.Screen name="WeatherPage" component={WeatherPage} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;