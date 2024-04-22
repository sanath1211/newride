import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../HomeScreen/Header';

const ConfirmationScreen = ({ route }) => {
  const { tripDetails } = route.params;

  return (
    <View>
      <Header/>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{backgroundColor:'white',borderRadius:50,padding:7,elevation:10}}>
        <Text style={{alignSelf:'center',fontSize:25,fontWeight:600}}>Trip Details</Text>
      </View>
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
      <Text style={styles.label}>Code:</Text>
      <Text style={styles.value}>{tripDetails.code}</Text>
      {tripDetails.image && (
        <>
          <Text style={styles.label}>Image:</Text>
          <Image source={{ uri: tripDetails.image }} style={styles.image} resizeMode="cover" />
        </>
      )}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding:20, backgroundColor:'#e5e5e9',borderColor:'black',borderRadius:50,margin:10,elevation:3},
  label: { fontWeight: 'bold', marginTop: 10,fontSize:17},
  value: { marginBottom: 10, fontSize:17},
  image: { width: 200, height: 200, marginTop: 10, marginBottom: 20, alignSelf:'center'}
});

export default ConfirmationScreen;
