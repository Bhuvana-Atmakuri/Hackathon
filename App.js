import * as React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginSection from './NavBar/LoginSection';
import MainContainer from './NavBar/MainContainer';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';


export default function App() {
  return (
    <ClerkProvider publishableKey = {"pk_test_ZXhjaXRpbmctc3dpZnQtMjguY2xlcmsuYWNjb3VudHMuZGV2JA"}>
    <View style={styles.container}>
      
      <SignedIn>
          <MainContainer/>
        </SignedIn>
        <SignedOut>
        <LoginSection/>
        </SignedOut>
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
