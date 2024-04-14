import { View, Text, FlatList, RefreshControl} from 'react-native'
import React from 'react'
import { DummyData } from '../DummyData/dummy'
import Header from '../HomeScreen/Header'
import EventItem from './EventItem'


export default function EventList() {
    const renderItem=({item})=>{
        return <EventItem id={item.id} test={item.test} description={item.description}/>
    }
    return (
        <View >
        <Header/>
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