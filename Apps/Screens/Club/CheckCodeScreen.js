import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { db } from './Config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../HomeScreen/Header';

const CheckCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const checkCode = async () => {
    const q = query(collection(db, "trips"), where("code", "==", code));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setModalVisible(true);
    } else {
      querySnapshot.forEach((doc) => {
        navigation.navigate('ConfirmationScreen', { tripDetails: doc.data() });
      });
    }
  };

  return (
    <View>
      <Header/>
      <ImageBackground style={{ height:'100%', width:'100%' }} source={{ uri: 'https://images.unsplash.com/photo-1590506995460-d0d9892b54da?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D' }}>
        <View style={{ padding: 20, borderRadius: 10, top: 250, backgroundColor: 'white', margin: 20 }}>
          <TextInput
            style={{ fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 2, marginBottom: 20, padding: 10, borderRadius: 10 }}
            onChangeText={setCode}
            value={code}
            placeholder="Enter the given code"
          />
          <View style={{ fontSize: 30, flexDirection: 'row', margin: 10, justifyContent: 'space-around', gap: 10 }}>
            <TouchableOpacity style={{ backgroundColor: '#FFAC1C', width: 130, height: 50, borderRadius: 30 }} onPress={checkCode}>
              <Text style={{ alignSelf: 'center', top: 10, fontSize: 15, fontWeight: '800' }}>Join Trip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#FFAC1C', width: 140, height: 50, borderRadius: 30 }} onPress={() => navigation.navigate('FormScreen')}>
              <Text style={{ alignSelf: 'center', top: 10, fontSize: 15, fontWeight: '800' }}>Create New Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Custom Alert Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22 }}>
          <View style={{ margin: 20, backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
            <Text style={{ marginBottom: 15, textAlign: "center", fontSize:15,fontWeight:600}}>Wrong code, please try again.</Text>
            <TouchableOpacity style={{ backgroundColor: '#FFAC1C', width: 140, height: 50, borderRadius: 30, top:5}}
              onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{ marginBottom: 15, textAlign: "center", top:10, fontSize:18,fontWeight:600}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckCodeScreen;
