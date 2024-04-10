import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

//Screens
import ChooseLocation from '../../../src/Screens/ChooseLocation';
import Home from '../../../src/Screens/Home';


export default function NavigateScreen(){
  const Stack = createStackNavigator()
  return (
      <Stack.Navigator screenOptions={{
        headerShown:false,
      }}>
        <Stack.Screen  name="home" component={Home}/>
        <Stack.Screen name="chooseLocation" component={ChooseLocation}/>
      </Stack.Navigator>
  );
};

