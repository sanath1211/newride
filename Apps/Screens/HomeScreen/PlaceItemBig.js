import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import HorizontalLine from "./HorizontalLine";

export default function PlaceItemBig({ place }) {
  return (
    <View style={{marginTop:20,marginLeft:10,marginRight:10}}>
     {place?.photos?  <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo" +
            "?maxwidth=400" +
            "&photo_reference=" +
            place?.photos[0]?.photo_reference +
            "&key=AIzaSyBs1_MZ-QLQFfjBgcAqApInR88PnLijfN4",
        }}
        style={{ width: "100%", height: 130, borderRadius: 15 }}
      />:null}
      <Text
        numberOfLines={2}
        style={{ fontSize: 18, marginBottom: 2}}
      >
        {place.name}
      </Text>
      <Text
        style={{ fontSize: 16, marginBottom: 5, color:'grey' }}
        numberOfLines={2}
      >
        {place.vicinity}
      </Text>
      <View
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            flexDirection: "row",
          }}
        >
          <AntDesign name="star" size={20} color='#FDCC0D' />
          <Text>{place.rating}</Text>
        </View>
          <HorizontalLine/>
    </View>
  );
}