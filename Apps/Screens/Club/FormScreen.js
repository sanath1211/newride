import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import {db} from './Config';
import Header from '../HomeScreen/Header';

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
    try {
      await addDoc(collection(db, "trips"), form);
      navigation.navigate('ConfirmationScreen', { tripDetails: form });
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Error', 'Failed to submit form.');
    }
  };

  return (
    <View>
      <Header/>
      <View style={styles.container}>
        <TextInput placeholder="Name" onChangeText={text => handleChange('name', text)} value={form.name} style={styles.input} />
        <TextInput placeholder="Description" onChangeText={text => handleChange('description', text)} value={form.description} style={styles.input} />
        <TextInput placeholder="Email" onChangeText={text => handleChange('email', text)} value={form.email} style={styles.input} />
        <TextInput placeholder="Phone Number" onChangeText={text => handleChange('phoneNumber', text)} value={form.phoneNumber} keyboardType="phone-pad" style={styles.input} />
        <TextInput placeholder="Place to Visit" onChangeText={text => handleChange('placeToVisit', text)} value={form.placeToVisit} style={styles.input} />
        <TextInput placeholder="Date to Go" onChangeText={text => handleChange('dateToGo', text)} value={form.dateToGo} style={styles.input} />
        <Button title="Pick an Image from Gallery" onPress={handleImagePick} />
        {form.image && <Image source={{ uri: form.image }} style={styles.imagePreview} />}
        <Text style={styles.codeLabel}>Generated Code: {form.code}</Text>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 },
  codeLabel: { marginBottom: 10 },
  imagePreview: { width: 100, height: 100, marginBottom: 10 }
});

export default FormScreen;
