import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Colours from '../../../../assets/colours';

export default function BookedScreen() {

  return (
    <View style={styles.Container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
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
  )
}

const styles = StyleSheet.create({ 

  Container: {
    flex: 1,
    backgroundColor: Colours.backgroundColour,
    position: "relative"
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
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