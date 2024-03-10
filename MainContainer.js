
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, StyleSheet,TextInput,Button, Alert } from 'react-native';
import { useState } from 'react';
import * as SMS from 'expo-sms';
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
  const [number,setNumber]=useState('6303535448');
const [message,setMessage]=useState('Yup!This is working');
// const checkSMS = async() =>{
//   const isAvailable=await SMS.isAvailableAsync();
//   if(isAvailable){
//     alert('SMS is available on this device');
//   }
//   else{
//     alert('SMS is not available on this device');
//   }
// };
const sendSMS = async() =>{
  const {result} = await SMS.sendSMSAsync(number,message);
  if(result === 'sent'){
    alert('Message Sent Successfully');
  }
}
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
