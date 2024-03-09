import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import * as Location from 'expo-location';
import 'react-native-gesture-handler';

export default function Home({NavBar}) {
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      const [locationName, setLocationName] = useState('');
    
      const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
    
        
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (reverseGeocode && reverseGeocode.length > 0) {
          setLocationName(reverseGeocode[0].formattedAddress);
        }
      };
    
      useEffect(() => {
        userLocation();
      }, []);
    
      return (
        <View style={styles.container}>
          <MapView style={styles.map} region={mapRegion}>
            <Marker coordinate={mapRegion}>
              <Callout style={styles.callout}>
                <Text>{locationName}</Text>
              </Callout>
            </Marker>
          </MapView>
          
          
        </View>
        
        
      );
      
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    callout: {
      width: 200, 
      padding: 10,
    },
    });