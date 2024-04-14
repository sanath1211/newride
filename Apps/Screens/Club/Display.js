import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import EventList from './EventList'

export default function Display() {
  const navigation=useNavigation()  
  return (
    <View>
      <EventList/>
    </View>
  )
}