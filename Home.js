import React, { useState, useEffect } from 'react';
import MapView, { Marker,Callout} from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function Home({ NavBar }) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locationName, setLocationName] = useState('');
  const [rating, setRating] = useState(0);
  const [votes, setVotes] = useState(null); // Set initial state to null
  const [submitted, setSubmitted] = useState(false);

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

    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    if (reverseGeocode && reverseGeocode.length > 0) {
      setLocationName(reverseGeocode[0].formattedAddress);
    }
  };

  const loadRating = async () => {
    try {
      const storedRating = await AsyncStorage.getItem('rating');
      const storedVotes = await AsyncStorage.getItem('votes');
      if (storedRating !== null && storedVotes !== null) {
        setRating(parseFloat(storedRating));
        setVotes(parseInt(storedVotes));
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error loading rating:', error);
    }
  };

  const saveRating = async () => {
    try {
      await AsyncStorage.setItem('rating', rating.toString());
      await AsyncStorage.setItem('votes', votes.toString());
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  const submitRating = () => {
    // Perform action when user submits rating
    const newVotes = (votes || 0) + 1; // Check if votes is null and default to 0
    const newRating = ((rating || 0) * (votes || 0) + rating) / newVotes; // Check if rating and votes are null and default to 0
    setVotes(newVotes);
    setRating(newRating);
    setSubmitted(true);
    saveRating(); // Save rating to AsyncStorage
  };

  useEffect(() => {
    userLocation();
    loadRating(); // Load rating from AsyncStorage
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
      <Marker coordinate={mapRegion}>
          <Callout style={styles.callout}>
            <View style={styles.calloutContent}>
              <Text>{locationName}</Text>
              <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setRating(item)}
                  >
                    <Text style={[styles.star, item <= rating && styles.selectedStar]}>★</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {submitted && (
                <View>
                  <Text>Safety Percentage: {(rating / 5 * 100).toFixed(2)}%</Text>
                  <Text>Total Votes: {votes}</Text>
                </View>
              )}
            </View>
          </Callout>
        </Marker>
      </MapView>
      {!submitted && (
        <View style={styles.ratingContainer}>
          <Text>How safe do you think this place is?</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setRating(item)}
              >
                <Text style={[styles.star, item <= rating && styles.selectedStar]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button title="Submit Review" onPress={submitRating} />
        </View>
      )}
      {submitted && (
        <View style={styles.ratingContainer}>
          <Text>Safety Percentage: {(rating / 5 * 100).toFixed(2)}%</Text>
          <Text>Total Votes: {votes}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 30,
    color: 'gray',
    marginRight: 5,
  },
  selectedStar: {
    color: 'orange',
  },
  callout: {
    width: 200,
    padding: 10,
  },
  calloutContent: {
    alignItems: 'center',
  },
});