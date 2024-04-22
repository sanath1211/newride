import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import db from './Config'; // Ensure this is correctly imported

const TripsScreen = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trips"));
        const tripList = [];
        querySnapshot.forEach((doc) => {
          tripList.push({ id: doc.id, ...doc.data() });
        });
        setTrips(tripList);
      } catch (error) {
        console.error("Error fetching trips: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {trips.map((trip) => (
        <View key={trip.id} style={styles.tripContainer}>
          <Text style={styles.label}>Name: {trip.name}</Text>
          <Text style={styles.label}>Description: {trip.description}</Text>
          <Text style={styles.label}>Email: {trip.email}</Text>
          <Text style={styles.label}>Phone Number: {trip.phoneNumber}</Text>
          <Text style={styles.label}>Place to Visit: {trip.placeToVisit}</Text>
          <Text style={styles.label}>Date to Go: {trip.dateToGo}</Text>
          {trip.image ? <Image source={{ uri: trip.image }} style={styles.image} /> : null}
          <Text style={styles.label}>Code: {trip.code}</Text>
        </View>
      ))}
      {trips.length === 0 && <Text style={styles.noTrips}>No trips available.</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff', // Change as necessary
  },
  tripContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: '100%',  // Adjust size to fit the container
    height: 200,  // Fixed height, adjust as necessary
    resizeMode: 'cover',
    marginVertical: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTrips: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TripsScreen;
