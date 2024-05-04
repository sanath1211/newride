import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView,ImageBackground,Button, TouchableOpacity} from 'react-native';
import Header from '../HomeScreen/Header';

const ConfirmationScreen = ({ navigation,route }) => {
  const { tripDetails } = route.params;
  const handleNavigateToMap = () => {
    navigation.navigate('MapScreen', {
      startingPoint: tripDetails.startingPoint,
      destination: tripDetails.destination,
    });
  };

  return (
    <View>
      <Header/>
    <ImageBackground style={{ height:'100%', width:'100%' }} source={{ uri: 'https://wallpapers.com/images/hd/nature-scenery-portrait-f4lsl6ohevep5674.jpg' }}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{backgroundColor:'#FFAC1C',borderRadius:50,padding:7,elevation:10}}>
        <Text style={{alignSelf:'center',fontSize:25,fontWeight:600}}>Trip Details</Text>
      </View>
      {tripDetails.image && (
        <>
          <Image source={{ uri: tripDetails.image }} style={styles.image} resizeMode="cover" />
        </>
      )}
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{tripDetails.name}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{tripDetails.description}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{tripDetails.email}</Text>
      <Text style={styles.label}>Phone Number:</Text>
      <Text style={styles.value}>{tripDetails.phoneNumber}</Text>
      <Text style={styles.label}>Place to Visit:</Text>
      <Text style={styles.value}>{tripDetails.placeToVisit}</Text>
      <Text style={styles.label}>Date to Go:</Text>
      <Text style={styles.value}>{tripDetails.dateToGo}</Text>
      <Text style={styles.label}>Starting Point:</Text>
      <Text style={styles.value}>{tripDetails.startingPoint}</Text>
      <Text style={styles.label}>Destination:</Text>
      <Text style={styles.value}>{tripDetails.destination}</Text>
      <Text style={styles.label}>Code:</Text>
      <Text style={styles.value}>{tripDetails.code}</Text>
      <TouchableOpacity style={{backgroundColor: '#FFAC1C', width: 330, height: 50, borderRadius: 30}} onPress={handleNavigateToMap}>
        <Text style={{ alignSelf: 'center', top: 10, fontSize: 15, fontWeight: '800'}}>View on Map</Text>
      </TouchableOpacity>
    </ScrollView>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding:20, backgroundColor:'#e5e5e9',borderColor:'black',borderRadius:50,margin:10,elevation:3,top:5},
  label: { fontWeight: 'bold', marginTop:5,fontSize:17},
  value: { marginBottom: 10, fontSize:17},
  image: { width: '100%', height: 200, marginTop: 20, marginBottom: 20, alignSelf:'center',borderRadius:20}
});

export default ConfirmationScreen;
