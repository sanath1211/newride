import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Entypo } from '@expo/vector-icons';
import {GOOGLE_MAP_APIKEY} from '@env';
export default function SearchBar({searchedLocation}) {

  return (
    <View style={{marginTop:10,padding:2,justifyContent:'center',marginLeft:7,marginRight:5,
    backgroundColor:'white',display:'flex',flexDirection:'row',borderRadius:5,alignItems:'center',width:370}}>
      <Entypo name="location-pin" size={24} color="grey" style={{paddingLeft:10}}/>
      <GooglePlacesAutocomplete
      fetchDetails={true}
      styles={{
        container:{
          width:90,
        }
      }}
      enablePoweredByContainer={false}
      nearbyPlacesAPI='GooglePlacesSearch'
      debounce={400}
      placeholder='Search for places'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        searchedLocation(details?.geometry?.location)
        console.log(details)
      }}
      query={{
        key: GOOGLE_MAP_APIKEY,
        language: 'en',
      }}/>
    </View>
  )
}