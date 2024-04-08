import { View, Text,Image} from 'react-native'
import React from 'react'
import {useUser} from '@clerk/clerk-expo'
import { Feather } from '@expo/vector-icons';
export default function Header() {
    const {user}=useUser();
  return (
    <View style={{flexDirection:'row',display:'flex',justifyContent:'space-around',backgroundColor:'black'}}>
      <Feather name="menu" size={24} color="white" style={{marginTop:10}}/>
      <Image source={require('../../../assets/images/CurvyroadsLogo.png')} style={{width:270,height:50}}/>
      <Image source={{uri:user?.imageUrl}} style={{width:35,height:35,borderRadius:99,marginTop:7}}/>  
    </View>
  )
}