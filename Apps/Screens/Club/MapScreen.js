import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { fetchDirections, fetchPlacesNearby } from './DirectionService';
import Header from '../HomeScreen/Header';

const categories = [
  { type: 'gas_station', icon: require('../../../assets/images/gasstation.png') },
  { type: 'restaurant', icon: require('../../../assets/images/hotel.png') },
  { type: 'hospital', icon: require('../../../assets/images/hospital.png') },
  { type: 'mechanic', icon: require('../../../assets/images/mechanic.png') },
  { type: 'atm', icon: require('../../../assets/images/atm.png') },
  { type: 'lodging', icon: require('../../../assets/images/lodge.png') },
  { type: 'tourist_attraction', icon: require('../../../assets/images/tourist.png') },
];

const MapScreen = ({ route }) => {
    const { startingPoint, destination } = route.params;
    const mapRef = useRef(null);
    const [region, setRegion] = useState(null);
    const [routeData, setRouteData] = useState({ coordinates: [], distance: '', duration: '' });
    const [places, setPlaces] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isNavigating, setIsNavigating] = useState(false);
    const [locationSubscription, setLocationSubscription] = useState(null);

    useEffect(() => {
        fetchDirections(startingPoint, destination).then(data => {
            setRouteData(data);
            if (data.coordinates.length > 0) {
                setRegion({
                    latitude: data.coordinates[0].latitude,
                    longitude: data.coordinates[0].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        });

        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, [startingPoint, destination]);

    const handlePlaceSelection = (type) => {
        if (activeCategory !== type) {
            setActiveCategory(type);
            setPlaces([]);
            fetchPlacesNearbyForCategory(routeData.coordinates, type);
        } else {
            setActiveCategory(null);
            setPlaces([]);
        }
    };

    const startNavigation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        setIsNavigating(true);
        const subscription = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1
        }, (location) => {
            if (mapRef.current) {
                const { latitude, longitude } = location.coords;
                mapRef.current.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.091,
                    longitudeDelta: 0.091,
                });
            }
        });

        setLocationSubscription(subscription);
    };

    const cancelNavigation = () => {
        if (locationSubscription) {
            locationSubscription.remove();
            setLocationSubscription(null);
        }
        setIsNavigating(false);
        // Optionally, reset the map to show the full route
        if (routeData.coordinates.length > 0) {
            mapRef.current.fitToCoordinates(routeData.coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    };

    const fetchPlacesNearbyForCategory = async (coordinates, type) => {
        const distancePerSegment = 5000; // 5 km
        const segmentPoints = [];
        let accumulatedDistance = 0;

        for (let i = 1; i < coordinates.length; i++) {
            const prev = coordinates[i - 1];
            const curr = coordinates[i];
            const dist = haversineDistance(prev, curr);
            accumulatedDistance += dist;
            if (accumulatedDistance >= distancePerSegment) {
                segmentPoints.push(curr);
                accumulatedDistance = 0; // Reset for next segment
            }
        }

        segmentPoints.forEach(coord => {
            fetchPlacesNearby(coord.latitude, coord.longitude, type).then(newPlaces => {
                setPlaces(prevPlaces => [...prevPlaces, ...newPlaces]);
            });
        });
    };

    const haversineDistance = (coord1, coord2) => {
        const toRad = x => (x * Math.PI) / 180;
        const R = 6378137; // Earth’s mean radius in meter
        const dLat = toRad(coord2.latitude - coord1.latitude);
        const dLong = toRad(coord2.longitude - coord1.longitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRad(coord1.latitude)) * Math.cos(toRad(coord2.latitude)) *
                  Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // returns the distance in meter
    };

    return (
        <ScrollView style={styles.container}>
            <Header/>
            <View style={styles.mapContainer}>
                {region && (
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={region}
                        showsUserLocation={true}
                        followsUserLocation={isNavigating}
                    >
                        <Marker
                            coordinate={routeData.coordinates[0]}
                            title="Starting Point"
                        />
                        <Marker
                            coordinate={routeData.coordinates[routeData.coordinates.length - 1]}
                            title="Destination"
                            pinColor="blue"
                        />
                        <Polyline
                            coordinates={routeData.coordinates}
                            strokeWidth={2}
                            strokeColor="red"
                        />
                        {places.map((place, index) => (
                            <Marker
                                key={index}
                                coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                                title={place.name}
                            />
                        ))}
                    </MapView>
                )}
                <ScrollView style={styles.details}>
                    <Text style={{fontSize: 15, fontWeight: '800'}}>Distance: {routeData.distance}</Text>
                    <Text style={{fontSize: 15, fontWeight: '800'}}>Estimated Travel Time: {routeData.duration}</Text>
                </ScrollView>
                {isNavigating ? (
                    <TouchableOpacity style={{ margin:5,backgroundColor: '#FFAC1C', width: 370, height: 50, borderRadius: 30 }} onPress={cancelNavigation}>
                        <Text style={{ alignSelf: 'center', top: 10, fontSize: 15, fontWeight: '800' }}>Cancel Navigation</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={{ margin:5,backgroundColor: '#FFAC1C', width: 370, height: 50, borderRadius: 30 }} onPress={startNavigation} disabled={isNavigating}>
                        <Text style={{ alignSelf: 'center', top: 10, fontSize: 15, fontWeight: '800' }}>Start Navigation</Text>
                    </TouchableOpacity>
                )}
                <Text style={{marginLeft:20,top: 10, fontSize: 15, fontWeight: '800' }}>Choose Filter</Text>
                <View style={styles.categoriesContainer}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.categoryIcon, activeCategory === category.type ? styles.activeCategory : {}]}
                            onPress={() => handlePlaceSelection(category.type)}
                        >
                            <Image source={category.icon} style={styles.icon} />
                        </TouchableOpacity>
                    ))}
                </View>
                
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // ensures that the background is white
    },
    mapContainer: {
        flex: 1,
        marginBottom: 10, // adds some margin at the bottom of the map
    },
    map: {
        width: Dimensions.get('window').width,
        height: 400,
        marginBottom: 10, // adds margin at the bottom of the map for spacing
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        flexWrap: 'wrap', // ensures that icons wrap in smaller screens
    },
    categoryIcon: {
        padding: 5,
        alignItems: 'center',
        margin: 10,
        width: 100,
        height: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 5,
    },
    icon: {
        width: 50,
        height: 50,
    },
    details: {
        padding: 10,
        borderTopWidth: 1, // adds a subtle border top for separation
        borderTopColor: '#e2e2e2', // light gray border color
    },
    activeCategory: {
        backgroundColor: '#ccc', // Highlight active category
    },
});

export default MapScreen;
