import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { dataExplore, dataFeed, dataGaleri, dataKategori, kategoriArr } from '../../../data';
import { Heart, SearchNormal } from 'iconsax-react-native';

const Card = ({ title, image }) => (
  <View style={styles.card}>
    <ImageBackground source={{ uri: image }} style={styles.cardImage}>
      <View style={styles.darkOverlay}></View>
      <View style={styles.cardIcon}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </ImageBackground>

  </View>
);

const ItemCategory = ({ item, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{ ...category.title, color }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({ item }) => {
    const color = item.id === selected ? 'black' : 'grey';
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
        <FlatList
          data={dataExplore}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => <Card title={item.name} image={item.image} />}
        />
      </View>
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