import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome} from '@expo/vector-icons';
import { AntDesign} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Club from '../Screens/Club/Club';
import NavigateScreen from '../Screens/ProfileScreen/NavigateScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigation from './HomeNavigation';
import TripsScreen from '../Screens/Club/TripsScreen';

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
        <Tab.Screen name='club'
        component={Club} 
        options={{
          tabBarLabel:'Community',
          tabBarIcon:({color, size})=>(
            <AntDesign name="team" size={size} color={color} />
          )
        }}
        />

    </Tab.Navigator>
  )
}

