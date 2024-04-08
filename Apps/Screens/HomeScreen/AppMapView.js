import { View, Text,StyleSheet,Image, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import MapView, { Marker } from 'react-native-maps';
import MapViewStyle from '../../../Utils/MapViewStyle.json'
import { UserLocationContext } from '../../Context/UserLocationContext';
import PlaceMarker from './PlaceMarker';
export default function AppMapView({placeList}) {
  const {location,setLoction}=useContext(UserLocationContext);

  return location?.latitude&&(
    <View style={{marginTop:-50,alignItems:'center',justifyContent:'center'}}>
      <MapView style={styles.map}
      customMapStyle={MapViewStyle}
      region={{
        latitude:location?.latitude,
        longitude:location?.longitude,
        latitudeDelta:0.0422,
        longitudeDelta:0.0421
      }}
      >
        <Marker coordinate={{
          latitude:location?.latitude,
          longitude:location?.longitude
        }}/>
        {placeList.map((item,index)=>index<=10&&(
          <PlaceMarker item={item}/>
        ))}
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width:  Dimensions.get('screen').width*0.93,
      height: Dimensions.get('screen').height*0.23,
      borderRadius:50,
      margin:60
    },
  });
  