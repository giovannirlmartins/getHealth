import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Colours from '../../../../assets/colours';

export default function ProfileScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = () => {
    console.log('Título:', title);
    console.log('Conteúdo:', content);
    setTitle('');
    setContent('');
  };



  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        
        <View style={styles.formBox}>
          <Text style={styles.formTitle}>Conte sobre seu novo projeto</Text>
          <TextInput
            style={styles.textarea}
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline
          />          


          
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Postar</Text>
          </TouchableOpacity>

        </View>

        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={styles.card}>
            <Image
              source={{ uri: 'https://via.placeholder.com/164' }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Título {item}</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos amet itaque inventore quidem natus animi
                pariatur.
              </Text>
              <TouchableOpacity style={styles.readMore}>
                <Text style={styles.readMoreText}>Leia mais</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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

  formBox: {
    backgroundColor: Colours.offWhite,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
  },
  imageButtonAddImage: {
    width: 30,
    height: 60,
    marginHorizontal: 10
  },
  imageButtonTitle: {
    width: 30,
    height: 60
  },
  postButton: {
    backgroundColor:  Colours.backgroundColour,
    borderRadius: 16,
  },
  postButtonText: {
    color: Colours.offWhite,
    textAlign: 'center',
    margin: 3,
    marginBottom:5
  },

  formTitle: {
    color: Colours.backgroundColour,
    fontSize: 16,
    fontWeight: 'bold',
  },

  textarea: {
    padding: 5,
    borderRadius: 8,
    marginBottom: 60,
    borderColor: Colours.offWhite,
    textAlignVertical: 'top',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colours.offWhite,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 164,
    height: 164,
    marginRight: 16,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  readMore: {
    marginTop: 10,
  },
  readMoreText: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
});
