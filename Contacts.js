import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, TextInput , Modal, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Contacts({ screens }) {
  const [contactsData, setContactsData] = useState( [
    { id: '1', name: 'Women Helpline', phoneNumber: '1091' , icon : <Ionicons size = {35} name="woman"/>},
    { id: '2', name: 'National Helpline', phoneNumber: '112' , icon : <Ionicons size = {35}name="megaphone"/> },
    { id: '3', name: 'Police', phoneNumber: '100' , icon : <Ionicons size = {35} name="car-sport"/>},
    { id: '4', name: 'Ambulance', phoneNumber: '108' , icon :<Ionicons size = {35} name="id-card"/> },
    { id: '5', name: 'Child Helpline', phoneNumber: '1098' , icon : <Ionicons size = {35} name="bicycle"/>},
    { id: '6', name: 'Fire Services', phoneNumber: '101', icon : <Ionicons size = {35} name="flame"/> },
    { id: '7', name: 'Pregnancy Medic', phoneNumber: '102' , icon : <Ionicons size = {35} name="medkit"/>},
    { id: '8', name: 'Road Accidents', phoneNumber: '1073' , icon : <Ionicons size = {35} name="car"/>},
    { id: '9', name: 'Railway Protection', phoneNumber: '182' , icon : <Ionicons size = {35} name="train"/>},
  ]);

  const [newContact, setNewContact] = useState({ name: '', phoneNumber: '' });
  

  const handleCallPress = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
  
  Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneUrl);
        } else {
          console.error("Couldn't open the phone app");
        }
      })
      .catch((error) => console.error('Error opening the phone app:', error));
  };

  const handleAddContact = () => {
    if (newContact.name.trim() !== '' && newContact.phoneNumber.trim() !== '') {
      const updatedContactsData = [
        {
          id: String(contactsData.length + 1),
          name: newContact.name,
          phoneNumber: newContact.phoneNumber,
          icon: <Ionicons size={35} name="add-circle" color="black" />,
        },
        ...contactsData,
      ];

      setContactsData(updatedContactsData);
      setNewContact({ name: '', phoneNumber: '' });
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.contactContainer, index % 2 === 0 ? styles.evenItem : styles.oddItem]}>
      <Text style={styles.contactIcon}>{item.icon}</Text>
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhoneNumber}>{item.phoneNumber}</Text>
      </View>
      <TouchableOpacity onPress={() => handleCallPress(item.phoneNumber)}>
        <Text style={styles.callIcon}>📞</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Emergency Contacts</Text>
        <TouchableOpacity onPress={handleAddContact}>
          <Ionicons style={styles.addButton} name="add-circle" size={45} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.newContactContainer}>
        <TextInput
          style={styles.newContactInput}
          placeholder="Name"
          value={newContact.name}
          onChangeText={(text) => setNewContact({ ...newContact, name: text })}
        />
        <TextInput
          style={styles.newContactInput}
          placeholder="Phone Number"
          keyboardType="numeric"
          value={newContact.phoneNumber}
          onChangeText={(text) => setNewContact({ ...newContact, phoneNumber: text })}
        />
      </View>
      <FlatList
        data={contactsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#71C9CE', // Background color below the list items
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    marginBottom:10,
    
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius:20,
    margin:8,
  },
  evenItem: {
    backgroundColor: '#CBF1F5', // Background color for even items
  },
  oddItem: {
    backgroundColor: '#E3FDFD', // Background color for odd items
  },
  contactIcon: {
    marginRight: 10,
  },
  contactInfoContainer: {
    flex: 1,
  },
  contactName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  contactPhoneNumber: {
    color: 'black',
    fontSize:20,
  },
  callIcon: {
    fontSize: 24,
    color: '#3498db', // Call icon color
  },
  headerContainer:{
    display:'flex',
    flexDirection:'row',
    border:10,
    borderRadius:25,
    backgroundColor: '#E3FDFD', // Header background color
    color: 'black', // Header text color
  },
  addButton: {
    margin:0,
    padding:10,
    
  },
  newContactContainer: {
    marginTop:10,
    backgroundColor: '#E3FDFD',
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 10,
  },
  newContactInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
};
