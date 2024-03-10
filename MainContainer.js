import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

// Screens
import Contacts from './screens/Contacts';
import Home from './screens/Home';
import Tutorials from './screens/Tutorials';
import SosAlert from './screens/SosAlert.js';

// Screen names
const contact = 'Contacts';
const home = 'Home';
const tutorial = 'Tutorials';
const sosAlert = 'SosAlert';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const [message, setMessage] = useState('Yup! This is working');
  const [familyContacts, setFamilyContacts] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchFamilyContacts = async () => {
      try {
        const contactsJson = await AsyncStorage.getItem('@familyContacts');
        if (contactsJson !== null) {
          const contacts = JSON.parse(contactsJson);
          setFamilyContacts(contacts);
        }
      } catch (error) {
        console.error('Error retrieving family contacts:', error);
      }
    };

    fetchFamilyContacts();
  }, []);

  useEffect(() => {
    const userLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    userLocation();
  }, []);

  const sendSMS = async () => {
    try {
      const phoneNumbers = familyContacts.map(contact => contact.phoneNumber);

      // Generate the live location link
      const locationLink = `https://www.google.com/maps/search/?api=1&query=${mapRegion.latitude},${mapRegion.longitude}`;

      // Construct the message
      const message = `Emergency: Someone you know or care about needs your help right away! 🚨 Please click this link to see where they are right now: ${locationLink}`;

      const { result } = await SMS.sendSMSAsync(
        phoneNumbers,
        message
      );

      if (result === 'sent') {
        Alert.alert('Messages Sent Successfully');
      } else {
        Alert.alert('Failed to send messages');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to send messages');
    }
  };

  const SosButton = ({ onPress, focused }) => (
    <TouchableOpacity style={[styles.tabBarButton, focused && styles.sosButton]} onPress={sendSMS}>
      <Ionicons name="stop-circle" size={30} color={focused ? 'white' : 'red'} />
      <Text style={[styles.buttonLabel, focused && styles.buttonLabelFocused]}>SOS Alert</Text>
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={home}
        tabBarOptions={{
          activeTintColor: '#71C9CE',
          inactiveTintColor: '#71C9CE',
          labelStyle: { fontSize: 12 },
          style: { paddingVertical: 15, height: 120 }, // Increased height
        }}
        sceneContainerStyle={{ backgroundColor: '#71C9CE' }}
        tabBarStyle={{ backgroundColor: '#A6E3E9' }}
      >
        <Tab.Screen name={home} component={Home} options={{ tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={25} color="#71C9CE" /> }} />
        <Tab.Screen
          name={sosAlert}
          component={SosAlert}
          options={{
            tabBarIcon: ({ focused }) => <SosButton focused={focused} />,
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen name={contact} component={Contacts} options={{ tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'call' : 'call-outline'} size={25} color="#71C9CE" /> }} />
        <Tab.Screen name={tutorial} component={Tutorials} options={{ tabBarIcon: ({ focused }) => <Ionicons name={focused ? 'logo-youtube' : 'logo-youtube'} size={25} color="#71C9CE" /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButton: {
    backgroundColor: 'red',
    borderRadius: 25, // Increased button size
    paddingHorizontal: 20, // Adjusted padding
    paddingVertical: 10, // Adjusted padding
  },
  buttonLabel: {
    fontSize: 12, // Increased font size
    color: 'red',
  },
  buttonLabelFocused: {
    color: 'white',
  },
});
