import React from 'react';
import 'react-native-gesture-handler';
import TemperatureScreen from './TemperatureScreen';
import WeatherPage from './WeatherPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Temperature Screen" component={TemperatureScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WeatherPage" component={WeatherPage} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;