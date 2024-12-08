import React, { useState, useEffect } from "react"; // Certifique-se de importar useEffect
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colours from '../../../../assets/colours';
import MapView, { Marker } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';

export default function HomeScreen() {

  const [location, setLocation] = useState(null); // Remove a tipagem explícita para testes


  async function requestLocationPermissions() {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) {
        console.log("Permissão de localização não concedida.");
        return;
      }
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    } catch (error) {
      console.error("Erro ao solicitar permissão de localização:", error);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
    });
  }, []);

  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.title}>Novidades</Text>

        <View style={styles.newsContainer}>
          {[1, 2].map((item) => (
            <View key={item} style={styles.card}>
              <Image
                source={{ uri: 'https://via.placeholder.com/120' }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Título {item}</Text>
                <Text style={styles.cardDescription}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos amet itaque inventore quidem natus animi
                  pariatur.
                </Text>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity>
          <Text style={styles.seeMore}>Mais...</Text>
        </TouchableOpacity>

        <View style={styles.mapContainer}>
          <Text style={styles.title}>Localização</Text>

          {
            location &&
            <MapView style={styles.map} 
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}>
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude
                }}
              />
            </MapView>
          }
          
        
        
        </View>

        <View style={styles.footer}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colours.backgroundColour,
    position: "relative"
  },
  newsContainer: {
    margin: 10,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  card: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: Colours.offWhite,
    padding: 16,
    width: '48%',
    marginHorizontal: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 120,
    marginRight: 16,
    borderRadius: 6,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: Colours.backgroundColour,
  },
  cardDescription: {
    fontSize: 14,
    color: Colours.backgroundColour,
  },
  seeMore: {
    color: Colours.offWhite,
    textAlign: 'right',
    marginHorizontal: 16,
    marginBottom: 0
  },
  title: {
    fontSize: 16,
    color: Colours.offWhite,
    margin: 16,
    marginBottom: 0,
  },
  mapContainer: {
    marginTop: 0,
    marginBottom: 10,
  },
  map: {
    marginHorizontal: 16,
    width: '93%',
    height: '55%',
    marginTop: 10,
  },
  footer: {
    padding: 140,
  },
});
