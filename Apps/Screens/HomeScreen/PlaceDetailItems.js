import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import { Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AppMapView from './AppMapView';
import { TouchableOpacity } from 'react-native';
import Share from '../Sevices/Share';
export default function PlaceDetailItems({place,onDirectionClick}) {  
  return (
    <View>
       <Text style={{ fontSize: 26, fontFamily: "raleway-bold" }}>
        {place.name}
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginTop: 5,
          flexDirection: "row",
        }}
      >
        <AntDesign name="star" size={20} color='#FDCC0D' />
        <Text>{place.rating}</Text>
      </View>
      {place?.photos ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=AIzaSyBs1_MZ-QLQFfjBgcAqApInR88PnLijfN4",
          }}
          style={{
            width: "100%",
            height: 160,
            borderRadius: 15,
            marginTop: 10,
          }}
        />
      ) : null}

      
        <Text
        style={{ fontSize: 16, marginTop: 10, color: 'grey' }}
        numberOfLines={2}
        >
        {place.vicinity?place.vicinity:place.formatted_address}
      </Text>
      {place?.opening_hours ? (
        <Text style={{ fontFamily: "raleway" }}>
          {place?.opening_hours?.open_now == true ? 
          "(Open)" : 
          "(Closed)"}
        </Text>
      ) : null}

        <View style={{marginTop:10,flexDirection:'row',
    display:'flex', gap:10}}>
        <TouchableOpacity onPress={()=>onDirectionClick()}
          style={{
            direction: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor:'grey',
            width:110,
            padding:3,
            borderRadius:40,
            justifyContent:'center'
          }}
        >
          <Ionicons name="navigate-circle-outline" size={24} color="black" />
          <Text style={{ fontFamily: "raleway", fontSize: 16 }}>Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Share.SharePlace(place)}
          style={{
            direction: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor:'grey',
            width:90,
            padding:3,
            borderRadius:40,
            justifyContent:'center'
          }}
        >
         <Ionicons name="md-share-outline" size={24} color="black" />
          <Text style={{ fontFamily: "raleway", fontSize: 16 }}>Share</Text>
        </TouchableOpacity>
        </View>

     
    </View>
  )
}  