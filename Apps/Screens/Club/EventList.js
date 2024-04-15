import { View, Text, FlatList, RefreshControl} from 'react-native'
import React from 'react'
import { DummyData } from '../DummyData/dummy'
import Header from '../HomeScreen/Header'
import EventItem from './EventItem'


export default function EventList() {
    const renderItem=({item})=>{
        return <EventItem id={item.id} title={item.title} image={item.image} Name={item.Name} description={item.description} phonenumber={item.phonenumber} location={item.location}/>
    }
    return (
        <View >
        <Header/>
        <Text>Choose the trip of your interest</Text>
        <FlatList style={{padding:20}}
                data={DummyData}
                keyExtractor={item=>item.id}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={()=>console.log('refreshing....')}/>
                }
        />
        </View>
  )
}