import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome} from '@expo/vector-icons';
import { AntDesign} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import FavouriteScreen from '../Screens/FavouriteScreen/FavouriteScreen';
import NavigateScreen from '../Screens/ProfileScreen/NavigateScreen';
import Home from '../../src/Screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseLocation from '../../src/Screens/ChooseLocation';
import { NavigationContainer } from '@react-navigation/native';
import { FlashMessage } from 'react-native-flash-message';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();
const Stack=createStackNavigator();
export default function TabNavigation() {
  return (
    
    <Tab.Navigator screenOptions={{
      headerShown:false
    }}>
      <Tab.Screen name='profile'
        component={NavigateScreen} 
        options={{
          tabBarLabel:'Navigate',
          tabBarIcon:({color, size})=>(
            <MaterialCommunityIcons name="google-maps" size={size} color={color} />
          )
        }}
        />
        <Tab.Screen name='home'
        component={HomeNavigation} 
        options={{
          tabBarLabel:'Search',
          tabBarIcon:({color, size})=>(
            <FontAwesome name="search" size={size} color={color} />
          )
        }}/>
        <Tab.Screen name='favourite'
        component={FavouriteScreen} 
        options={{
          tabBarLabel:'Favourite',
          tabBarIcon:({color, size})=>(
            <FontAwesome name="heart" size={size} color={color} />
          )
        }}
        />

    </Tab.Navigator>
  )
}

