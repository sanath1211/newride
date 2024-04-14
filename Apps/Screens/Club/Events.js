import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Header from '../HomeScreen/Header'

export default function Events() {
    const route=useRoute()
    const {eventId,title,description}=route.params
   
  return (
    <View>
        <Header/>
        <View style={{borderWidth:1,borderColor:'#c5c5c5',
    borderRadius:10,marginVertical:5,padding:20,margin:20}}>
            <Text>This id event detail screen of {eventId}</Text>
            <Text>{title}</Text>
            <Text>{description}</Text>
        </View>
    </View>
  )
}