import { View, Text,Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Header from '../HomeScreen/Header'

export default function Events() {
    const route=useRoute()
    const {eventId,title,image,Name,description,phonenumber,location}=route.params
   
  return (
    <View>
        <Header/>
        <View style={{borderWidth:1,borderColor:'#c5c5c5',
    borderRadius:10,marginVertical:5,padding:20,margin:20}}>
            <Text style={{textAlign:'center',fontWeight:700,fontSize:17,margin:10}}>{title}</Text>
          <Image style={{height:200,width:'100%',borderRadius:20}} source={{uri:image}}/>
          <View style={{padding:20}}>
            <Text>{Name}</Text>
            <Text>{description}</Text>
            <Text>{phonenumber}</Text>
            <Text>{location}</Text>
          </View>
        </View>
    </View>
  )
}