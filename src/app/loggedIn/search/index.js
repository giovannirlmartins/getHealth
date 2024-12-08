import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Colours from '../../../../assets/colours';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importação do ícone
import MapView, { Marker } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';

export default function SearchScreen() {

  //contantes para a pesquisa pela IA
  const [selectedValue, setSelectedValue] = useState('');
  const [searchedValue, setSearchedValue] = useState('');
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [bairro, setBairro] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [estado, setEstado] = useState(null);
  const [location, setLocation] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleMap, setIsVisibleMap] = useState(true);
  const [isVisibleInfo, setIsVisibleInfo] = useState(false);
  
  const atualizarCidade = (searchedValue) => {
    setCidade(searchedValue); // Usa a função para atualizar o estado.
  };

  const atualizarInput = (searchedValue) => {
    setCidade(searchedValue); // Usa a função para atualizar o estado.
  };


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

 
  function searchBy(value) {
    const visibleOptions = ['cep', 'bairro', 'cidade', 'estado'];
    setIsVisible(visibleOptions.includes(value));
  }
  

  function search(){
    if (selectedValue == 'cidade'){
      atualizarCidade(searchedValue);
      console.log('cidade de pesquisa', cidade);
      setInput(`Índice de feminicídio em ${searchedValue}`);
      console.log(input);
      setIsVisibleMap(false);
      setIsVisibleInfo(true);
      //handleSend();
    }
  }



  return (
    <View style={styles.Container}>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.searchList}>
          <Text style={styles.title}> Pesquisar por </Text>
        </View>

        {isVisible && (
        <View style={styles.searchBar}>
          {/* Input de texto com ícone de pesquisa */}
          <View style={styles.searchInputContainer}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Digite sua pesquisa"
              onChangeText={setSearchedValue}
              value={searchedValue}
            />
            <TouchableOpacity
              onPress={() => handleSend()

              }
            >
              <FontAwesome name="search" size={20} color={Colours.backgroundColour} style={styles.searchIcon} />
            </TouchableOpacity>          
          </View>
        </View>)}


        {isVisibleMap && (
        <View style={styles.mapContainer}>
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
        </View>)}

        {isVisibleInfo && (
          <View style={styles.dados}>
            {isLoading ? (
              <Text style={styles.loading}>Carregando...</Text>
            ) : (
              response && <Text style={styles.response}>{response}</Text>
            )}
          </View>)}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({ 
  Container: {
    flex: 1,
    backgroundColor: Colours.backgroundColour,
    position: "relative"
  },
  title: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 2,
    fontWeight: 'bold',
    fontSize: 14,
    color: Colours.offWhite,
  },
  searchList: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center'
  },
  item: {
    fontSize: 14
  },
  pickerContainer: {
    width: '55%',
    height: 30,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colours.lightBlue,
    justifyContent: 'center',
    marginVertical: 16,
    marginHorizontal: 0,
  },
  picker: {
    width: '100%',
    padding: 0,
    fontSize: 10,
  },
  filterImage: {
    width: '10%',
    height: 40,
    margin: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colours.lightBlue,
    width: '92%',
    alignSelf: 'center',
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontWeight: 'bold',
    color: Colours.backgroundColour
  },
  searchIcon: {
    marginLeft: 10,
  },
  mapContainer: {
    marginTop: 0,
    marginBottom: 10,
  },
  map: {
    width: '90%',
    height: '90%',
    marginTop: 10,
    alignSelf: 'center',
  },

  dados:{
    width:'90%',
    height: '90%',
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: Colours.offWhite,
  }
})
