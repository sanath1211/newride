import { View, Text,ScrollView} from 'react-native'
import React, { useEffect, useState,useContext} from 'react'
import AppMapView from './AppMapView'
import Header from './Header'
import SearchBar from './SearchBar'
import CategoryList from './CategoryList'
import Globalapi from './../Sevices/Globalapi'
import PlaceList from './PlaceList'
import { UserLocationContext } from '../../Context/UserLocationContext';
import FavouriteScreen from '../Club/Club'

export default function HomeScreen() {
  const [placeList,setPlaceList]=useState([]);
  const {location,setLocation}=useContext(UserLocationContext);
  useEffect(()=>{
    if(location)
    {
       GetNearBySearchPlace('restaurant'); 
    }
  },[location])
  
  const GetNearBySearchPlace=(value)=>{
  
    Globalapi.nearByPlace(location?.latitude,
      location?.longitude,value).then(resp=>{
          setPlaceList(resp.data.results);

    })
  } 
  return (
    <ScrollView>
      <Header/>
      <AppMapView placeList={placeList}/>
      <CategoryList setSelectedCategory={(value)=>GetNearBySearchPlace(value)}/>
      {placeList? <PlaceList placeList={placeList} />:null}
    </ScrollView>
  )
}