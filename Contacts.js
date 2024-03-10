import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function Contacts({ screens }) {
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: '1', name: 'Women Helpline', phoneNumber: '1091', icon: <Ionicons size={35} name="woman" /> },
    { id: '2', name: 'National Helpline', phoneNumber: '112', icon: <Ionicons size={35} name="megaphone" /> },
    { id: '3', name: 'Police', phoneNumber: '100', icon: <Ionicons size={35} name="car-sport" /> },
    { id: '4', name: 'Ambulance', phoneNumber: '108', icon: <Ionicons size={35} name="id-card" /> },
    { id: '5', name: 'Child Helpline', phoneNumber: '1098', icon: <Ionicons size={35} name="bicycle" /> },
    { id: '6', name: 'Fire Services', phoneNumber: '101', icon: <Ionicons size={35} name="flame" /> },
    { id: '7', name: 'Pregnancy Medic', phoneNumber: '102', icon: <Ionicons size={35} name="medkit" /> },
    { id: '8', name: 'Road Accidents', phoneNumber: '1073', icon: <Ionicons size={35} name="car" /> },
    { id: '9', name: 'Railway Protection', phoneNumber: '182', icon: <Ionicons size={35} name="train" /> },
  ]);

  const [familyContacts, setFamilyContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phoneNumber: '' });
  const [activeTab, setActiveTab] = useState('Emergency');

  // Function to store family contacts using AsyncStorage
  const storeFamilyContacts = async (contacts) => {
    try {
      await AsyncStorage.setItem('@familyContacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error storing family contacts:', error);
    }
  };

  // Function to retrieve family contacts from AsyncStorage
  const retrieveFamilyContacts = async () => {
    try {
      const contacts = await AsyncStorage.getItem('@familyContacts');
      if (contacts !== null) {
        return JSON.parse(contacts);
      }
    } catch (error) {
      console.error('Error retrieving family contacts:', error);
      return [];
    }
  };

  useEffect(() => {
    // Retrieve family contacts when the component mounts
    const fetchFamilyContacts = async () => {
      const storedFamilyContacts = await retrieveFamilyContacts();
      if (storedFamilyContacts) {
        setFamilyContacts(storedFamilyContacts);
      }
    };

    fetchFamilyContacts();
  }, []);

  // Function to add new family contact
  const handleAddContact = () => {
    if (newContact.name.trim() !== '' && newContact.phoneNumber.trim() !== '') {
      const updatedFamilyContacts = [
        ...familyContacts,
        {
          id: String(Date.now()),
          name: newContact.name,
          phoneNumber: newContact.phoneNumber,
        },
      ];

      setFamilyContacts(updatedFamilyContacts);
      setNewContact({ name: '', phoneNumber: '' });

      // Store the updated family contacts
      storeFamilyContacts(updatedFamilyContacts);
    }
  };

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleSaveContacts = () =>{
    storeFamilyContacts(familyContacts);
  };
  

  // Function to handle calling a contact
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

  // Render contact item for emergency contacts
  const renderContactItem = ({ item }) => (
    <View style={styles.contactContainer}>
      <Text style={styles.contactIcon}>{item.icon}</Text>
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhoneNumber}>{item.phoneNumber}</Text>
      </View>
      <TouchableOpacity onPress={() => handleCallPress(item.phoneNumber)}>
        <Ionicons name="call" size={25} color="black" style={styles.callIcon} />
      </TouchableOpacity>
    </View>
  );

  // Render family contact item
  const renderFamilyContactItem = ({ item }) => (
    <TouchableOpacity style={styles.familyContactContainer} onPress={() => handleCallPress(item.phoneNumber)}>
      <Ionicons name="person" size={25} paddingRight={10} color="black" />
      <Text style={styles.familyContactName}>{item.name}</Text>
      <Ionicons name="call" size={25} color="black" style={styles.callIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Emergency' && styles.activeTab]}
          onPress={() => handleTabChange('Emergency')}
        >
          <Text style={styles.tabText}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Family' && styles.activeTab]}
          onPress={() => handleTabChange('Family')}
        >
          <Text style={styles.tabText}>Family</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Emergency' ? (
        <FlatList
          data={emergencyContacts}
          keyExtractor={(item) => item.id}
          renderItem={renderContactItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.familyContactsContainer}>
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
          

          <FlatList
            data={familyContacts}
            keyExtractor={(item) => item.id}
            renderItem={renderFamilyContactItem}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleAddContact}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#71C9CE',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    backgroundColor: '#E3FDFD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#A6E3E9',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    margin: 8,
    backgroundColor: '#CBF1F5',
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
    fontSize: 20,
  },
  familyContactsContainer: {
    flex: 1,
    backgroundColor: '#E3FDFD',
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 10,
  },
  familyContactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    margin: 8,
    backgroundColor: '#A6E3E9',
  },
  familyContactName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  newContactInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    alignSelf: 'flex-end',
  },
  callIcon: {
    marginLeft: 'auto',
  },
  familyContactsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#71C9CE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
    borderWidth:1,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
