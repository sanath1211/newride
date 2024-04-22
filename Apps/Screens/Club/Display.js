import { View, Text, Button,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import EventList from './EventList'
import Header from '../HomeScreen/Header'

export default function Display() {
  const navigation=useNavigation()  
  return (
    <View>
      <Header/>
      <TouchableOpacity onPress={()=>navigation.navigate('eventlist')} style={{borderWidth:1,borderColor:'#c5c5c5',
      borderRadius:10,marginVertical:5}}>
        <Text>Move to</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('eventlist')} style={{borderWidth:1,borderColor:'#c5c5c5',
      borderRadius:10,marginVertical:5}}>
        <Text>Create New Trip</Text>
      </TouchableOpacity>
    </View>
  )
}