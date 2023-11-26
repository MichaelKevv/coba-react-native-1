import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { dataExplore, dataFeed, dataGaleri, dataKategori, kategoriArr } from '../../../data';
import { Heart, SearchNormal, Add } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { ListBrowse } from '../../components';
const Card = ({ id, title, image }) => (
  <TouchableOpacity style={styles.card}>
    <ImageBackground source={{ uri: image }} style={styles.cardImage}>
      <View style={styles.darkOverlay}></View>
      <View style={styles.cardIcon}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </ImageBackground>

  </TouchableOpacity>
);

const ItemCategory = ({ item, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...category.item, backgroundColor: color}}>
        <Text style={{ ...category.title, color:'black' }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({ item }) => {
    const color = item.id === selected ? '#FFC600' : '#FFE58C';
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };
  return (
    <FlatList
      data={kategoriArr}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({ ...item })}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default function BrowseScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleSearchPress = (text) => {
    setSearchText(text);
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10, paddingHorizontal: 24, }}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Cari Sesuatu"
            onChangeText={handleSearchPress}
            value={searchText}
            placeholderTextColor="gray"
          />
          <TouchableOpacity>
            <SearchNormal color={'black'} variant="Linear" size={24} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingVertical: 10, paddingHorizontal: 24, }}>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginBottom: 10, }} >Kategori</Text>
        <FlatListCategory />
      </View>
      <View style={{ paddingHorizontal: 16, }}>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 8 }}>Jelajahi Seni</Text>
        <ListBrowse data={dataExplore} />
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddBrowse")}
      >
        <Add color={'black'} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
};

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
  floatingButton: {
    backgroundColor: '#FFC600',
    padding: 15,
    position: 'absolute',
    bottom: 100,
    right: 24,
    borderRadius: 10,
    shadowColor: '#FFE58C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
  },
});
