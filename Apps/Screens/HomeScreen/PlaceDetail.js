import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import PlaceDetailItems from './PlaceDetailItems';
import AppMapView from './AppMapView';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { Linking } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


export default function PlaceDetail() {
  const param=useRoute().params;
  const [place,setPlace]=useState([]);

  useEffect(()=>{
   setPlace(param.place)
    
  },[])

  const onDirectionClick=()=>{
    const url=Platform.select({
      ios:"maps:"+place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
      android:"geo:"+place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
    });

    Linking.openURL(url)
  }
  return (
    <ScrollView style={{ padding: 20, backgroundColor:'white', flex: 1 }}>
      <PlaceDetailItems
        place={place}
        onDirectionClick={() => onDirectionClick()}
      />
      <AppMapView placeList={[place]} />
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 15,
          alignContent: "center",
          alignItem: "center",
          margin: 8,
          display:'flex',
          flexDirection:'row',
          gap:10,
          justifyContent:'center',
          alignItems:'center',
          borderRadius: 50,
          paddingBottom: 15,
          marginTop:-30
        }}
        onPress={() => onDirectionClick()}
      >
          <Ionicons name="navigate-circle-outline" 
          size={30} color="white" />

        <Text
          style={{
            fontFamily: "raleway",
            textAlign: "center",
            color: 'white',
          }}
        >
          Get Direction on Google Map
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}