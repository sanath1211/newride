import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

//Screens

import Display from './Display';
import Events from './Events';



export default function NavigateScreen(){
  const Stack = createStackNavigator()
  return (
      <Stack.Navigator screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen  name="display" component={Display}/>
        <Stack.Screen name="event" component={Events}/>
      </Stack.Navigator>
  );
};

