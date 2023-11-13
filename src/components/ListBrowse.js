import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const navigation = useNavigation();

const ItemCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BrowseDetail', { browseId: item.id })}>
      <ImageBackground source={{ uri: item.image }} style={styles.cardImage}>
        <View style={styles.darkOverlay}></View>
        <View style={styles.cardIcon}>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const ListBrowse = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <ItemCard
        item={item}
      />
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      numColumns={2}
      renderItem={item => renderItem({ ...item })}
    />
  );
};
export default ListBrowse;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
  },
  cardIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
  },
  icon: {
    marginRight: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 2,
    color: 'black',
    height: 45,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardTitle: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});
const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: 'rgb(230, 227, 227)',
    borderColor: 'black',
    borderWidth: 1,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
  },
});