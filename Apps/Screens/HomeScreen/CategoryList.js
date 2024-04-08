import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'

export default function CategoryList({setSelectedCategory}) {
    const categorylist=[
        {
            id:1,
            name:'Gas Station',
            value:'gas_station',
            icon:require('../../../assets/images/gasstation.png')
        },
        {
            id:2,
            name:'Restuarant',
            value:'restaurant',
            icon:require('../../../assets/images/hotel.png')
        },
        {
            id:3,
            name:'Hospital',
            value:'hospital',
            icon:require('../../../assets/images/hospital.png')
        },
        {
          id:4,
          name:'ATM',
          value:'atm',
          icon:require('../../../assets/images/atm.png')
      },
      {
          id:5,
          name:'Mechanic',
          value:'car_repair',
          icon:require('../../../assets/images/mechanic.png')
      },
      {
          id:6,
          name:'Lodge',
          value:'lodging',
          icon:require('../../../assets/images/lodge.png')
      },
    ]
  return (
    <View style={{marginTop:-40, paddingHorizontal:10}}>
      <Text style={{paddingLeft:15,fontSize:15,fontWeight:700}}>Choose Filter</Text>
      <FlatList 
      data={categorylist} 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>(
        <TouchableOpacity
         onPress={()=>setSelectedCategory(item.value)}>
            <CategoryItem category={item}/>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}