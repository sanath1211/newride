import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../HomeScreen/Header'
import { useNavigation } from '@react-navigation/native'

export default function EventItem({id,test,description}) {
    const navigation=useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('event',{eventId:id,title:test,description:description})} style={{borderWidth:1,borderColor:'#c5c5c5',
    borderRadius:10,marginVertical:5,padding:30}}>
        <Text>{test}</Text>
        <Text>{description}</Text>
    </TouchableOpacity>
  )
}