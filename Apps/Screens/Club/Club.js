import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FormScreen from './FormScreen'; // Adjust the path according to your project structure
import ConfirmationScreen from './ConfirmationScreen'; // Adjust the path according to your project structure
import CheckCodeScreen from './CheckCodeScreen'; // This would be your initial screen where users enter a code
import MapScreen from './MapScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
   
      <Stack.Navigator initialRouteName="CheckCodeScreen" screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen name="CheckCodeScreen" component={CheckCodeScreen} options={{ title: 'Check Code' }} />
        <Stack.Screen name="FormScreen" component={FormScreen} options={{ title: 'Submit Form' }} />
        <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} options={{ title: 'Confirmation' }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Confirmation' }} />

      </Stack.Navigator>
    
  );
}

export default AppNavigator;
