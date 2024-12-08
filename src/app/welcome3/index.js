import React from "react";
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colours from '../../../assets/colours';
import { useNavigation } from "@react-navigation/native";

export default function Welcome3() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <StatusBar hidden={true} />

      <View style={styles.pictureContainer}>
        <Image
          source={require('../../../assets/images/logoGymWeight.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.board}>
        <Text style={styles.text}>
        É empresa e deseja divulgar seus projetos sociais além de encontrar projetos para investir?
        </Text>

        <TouchableOpacity 
        style={styles.skipButton}
        onPress={ () => navigation.navigate('SignIn')}
        >
          <Text style={styles.textButton}>pular</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => navigation.navigate('SignIn')}>
        
          <Text style={styles.textButton}>próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1,
    backgroundColor: Colours.backgroundColour
  },

  pictureContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    zIndex: 1 // Garante que a imagem fique na frente da view board
  },

  image: {
    width: '60%',
    position: 'absolute', // Faz a imagem flutuar
    top: -300, // Ajuste conforme necessário para sobrepor a view
    zIndex: 2 // Certifica que a imagem está acima de todas as views
  },

  board: {
    flex: 2,
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    position: 'relative',
    zIndex: 0 // Garante que a view board fique atrás da imagem
  },

  text: {
    fontSize: 20,
    width: '60%',
    textAlign: 'center',
    color: Colours.lightgreen,
    fontWeight: 'bold'
  },

  skipButton:{
    position: 'absolute',
    left: '8%',
    bottom: '10%',
    zIndex: 2
  },

  nextButton: {
    position: 'absolute',
    right: '8%',
    bottom: '10%',
    zIndex: 2
  },

  textButton:{
    color: Colours.lightgreen
  }

});
