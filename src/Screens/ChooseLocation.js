//import libraries
import { useNavigation } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView ,TouchableOpacity,Image} from 'react-native';

//reusable components
import AddressPickup from '../components/AddressPickup';
import CustomBtn from '../components/CustomBtn';
import { showError } from '../helper/helperFunction';
import Header from '../../Apps/Screens/HomeScreen/Header';

const ChooseLocation = (props) => {
    const navigation = useNavigation()

    const [state, setState] = useState({
        destinationCords: {}
    })

    const { destinationCords } = state

    const checkValid = () =>{
        if(Object.keys(destinationCords).length === 0){
            showError('Please enter your destination location')
            return false
        }
        return true
    }

    const onDone = () => {
        const isValid = checkValid()
        if(isValid){
            props.route.params.getCordinates({
                destinationCords
            })
            navigation.goBack()
        }
    }
    const fetchDestinationCords = (lat, lng, zipCode, cityText) => {
        console.log("zip code==>>>",zipCode)
        console.log('city texts',cityText)
        setState({
            ...state,
            destinationCords: {
                latitude: lat,
                longitude: lng
            }
        })
    }

    return (
        <View style={styles.container}>
            <Header/>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={{ backgroundColor: 'white', flex: 1, padding: 24 }}
            >
                <View style={{ marginBottom: 16}}>
                <AddressPickup
                    placheholderText="Enter Destination Location"
                    fetchAddress={fetchDestinationCords}
                />
                <TouchableOpacity
                    onPress={onDone}
                    style={styles.inpuStyle}>
                    <Image style={{
                                width: 25,
                                height: 25,
                            }} source={{uri:'https://png.pngtree.com/png-clipart/20220510/original/pngtree-3d-location-icon-design-symbol-png-transparent-background-png-image_7692906.png'}}/>
                    <Text style={{fontWeight:800,fontSize:15}}>Let's Go</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inpuStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16,
        flexDirection:'row'
    }
});
export default ChooseLocation;
