import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import Header from '../HomeScreen/Header'
import { useNavigation } from '@react-navigation/native'

export default function EventItem({id,title,image,Name,description,phonenumber,location}) {
    const navigation=useNavigation()
  return (
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate('event',{eventId:id,title,image,Name,description:description,phonenumber,location})} style={{borderWidth:1,borderColor:'#c5c5c5',
      borderRadius:10,marginVertical:5}}>
          <Text style={{textAlign:'center',fontWeight:700,fontSize:17,margin:10}}>{title}</Text>
          <Image style={{height:200,width:'100%'}} source={{uri:image}}/>
          <View style={{padding:20}}>
            <Text>{Name}</Text>
            <Text>{description}</Text>
            <View style={{flexDirection:'row',gap:3}}>
            <Image style={{
                                width: 20,
                                height: 20,
                            }} source={require('../../../assets/images/phone.png')}/>
              <Text>{phonenumber}</Text>
            </View>
            <View style={{flexDirection:'row',gap:3}}>
            <Image style={{
                                width: 20,
                                height: 20,
                            }} source={require('../../../assets/images/location.png')}/>
              <Text>{location}</Text>
            </View>
          </View>
      </TouchableOpacity>
      </View>
  )
}