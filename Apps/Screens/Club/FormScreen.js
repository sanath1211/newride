import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, Image,ImageBackground,TouchableOpacity,ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './Config';  // Ensure this import is correctly pointing to your Firebase config
import Header from '../HomeScreen/Header';  // Adjust this path as necessary
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_KEY } from '../../../src/constants/googleMapKey';
const randomCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const FormScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    email: '',
    phoneNumber: '',
    placeToVisit: '',
    dateToGo: '',
    image: '',
    code: randomCode()
  });

  const handleChange = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (pickerResult.cancelled) return;
    handleChange('image', pickerResult.uri);
  };

  const handleSubmit = async () => {
    if (form.image) {
      const storage = getStorage();
      const imageName = `${form.code}_${new Date().getTime()}`; // Creating a unique image name
      const storageRef = ref(storage, `images/${imageName}`);
      const response = await fetch(form.image);
      const blob = await response.blob();

      uploadBytes(storageRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const newForm = {...form, image: downloadURL}; // Replace local URI with remote URL
          addDoc(collection(db, "trips"), newForm)
            .then(() => {
              navigation.navigate('ConfirmationScreen', { tripDetails: newForm });
            }).catch((error) => {
              console.error("Error adding document: ", error);
              Alert.alert('Error', 'Failed to submit form.');
            });
        });
      }).catch((error) => {
        console.error("Error uploading image: ", error);
        Alert.alert('Error', 'Failed to upload image.');
      });
    } else {
      // Handle the case where there is no image
      addDoc(collection(db, "trips"), form)
        .then(() => {
          navigation.navigate('ConfirmationScreen', { tripDetails: form });
        }).catch((error) => {
          console.error("Error adding document: ", error);
          Alert.alert('Error', 'Failed to submit form.');
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <ImageBackground style={{ height:'100%', width:'100%' }} source={{ uri: 'https://images.unsplash.com/photo-1590506995460-d0d9892b54da?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D' }}>
      <View style={{padding:20,backgroundColor:'white',marginTop:20,margin:20,borderRadius:20}}>
        <TextInput placeholder="Name" onChangeText={text => handleChange('name', text)} value={form.name} style={styles.input} />
        <TextInput placeholder="Description" onChangeText={text => handleChange('description', text)} value={form.description} style={styles.input} />
        <TextInput placeholder="Email" onChangeText={text => handleChange('email', text)} value={form.email} style={styles.input} />
        <TextInput placeholder="Phone Number" onChangeText={text => handleChange('phoneNumber', text)} value={form.phoneNumber} keyboardType="phone-pad" style={styles.input} />
        <TextInput placeholder="Places to Visit" onChangeText={text => handleChange('placeToVisit', text)} value={form.placeToVisit} style={styles.input} />
        <TextInput placeholder="Date, Time" onChangeText={text => handleChange('dateToGo', text)} value={form.dateToGo} style={styles.input} />
        {form.image && <Image source={{ uri: form.image }} style={styles.imagePreview} />}
        
        <GooglePlacesAutocomplete
          placeholder='Enter Starting Point'
          onPress={(data, details = null) => {
            setForm(prev => ({ ...prev, startingPoint: data.description }));
          }}
          query={{
            key: GOOGLE_MAP_KEY, // Ensure you replace this with your actual Google API key
            language: 'en',
          }}
          styles={{
            textInputContainer: styles.input1,
            textInput: styles.textInput1,
          }}
        />
        <GooglePlacesAutocomplete
          placeholder='Enter Destination'
          onPress={(data, details = null) => {
            setForm(prev => ({ ...prev, destination: data.description }));
          }}
          query={{
            key: GOOGLE_MAP_KEY, // Ensure you replace this with your actual Google API key
            language: 'en',
          }}
          styles={{
            textInputContainer: styles.input1,
          }}
        />
        <Text style={styles.codeLabel}>Share this code with your friends and family. Bring people together.</Text>
        <Text style={styles.codeLabel}>{form.code}</Text>
        <TouchableOpacity style={{ backgroundColor: '#FFAC1C', width: 140, height: 50, borderRadius: 30,alignSelf:'center'}} onPress={handleSubmit}>
          <Text style={{ alignSelf: 'center', top: 10, fontSize: 15, fontWeight: '800' }}>Submit</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1},
  input: { fontSize: 17, height: 40, borderColor: 'gray', borderWidth: 2, marginBottom: 20, padding: 10, borderRadius: 10 },
  codeLabel: { marginBottom: 10, fontWeight: 'bold' },
  imagePreview: { width: 100, height: 100, marginBottom: 10 },
  input1: { alignSelf: 'center',fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 2, marginBottom: 20, borderRadius: 10, width:280},

});

export default FormScreen;
