import { View, Text, Image} from 'react-native'
import React from 'react'

export default function CategoryItem({category}) {
  return (
    
    <View style={{padding:5,alignItems:'center',margin:10,width:100,height:100,
    backgroundColor:'white',justifyContent:'center',borderRadius:20,elevation:5}}>
        <Image source={category.icon}
        style={{width:50,height:50}}/>
      <Text>{category.name}</Text>
    </View>
  )
}