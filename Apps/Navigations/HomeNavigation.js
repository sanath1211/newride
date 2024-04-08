import React from 'react';
import { TransitionPresets,createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

//Screens

import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import PlaceDetail from '../Screens/HomeScreen/PlaceDetail';


export default function HomeNavigation(){
    const isAndroid=true;
  const Stack = createStackNavigator()
  return (
      <Stack.Navigator screenOptions={{
        gestureEnabled:true,
        headerShown:false,
        ...(isAndroid&&TransitionPresets.ModalPresentationIOS)

    }}>
        <Stack.Screen  name="home" component={HomeScreen}/>
        <Stack.Screen  name="place-detail" component={PlaceDetail} screenOptions={{
            presentation:'modal'
        }}/>
      </Stack.Navigator>
  );
};

