import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, ImageBackground, RefreshControl, ActivityIndicator } from 'react-native';
import { dataExplore, dataFeed, dataGaleri, dataKategori, kategoriArr } from '../../../data';
import { Heart, SearchNormal, Add } from 'iconsax-react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
const ItemCard = ({ item }) => {
  const navigation = useNavigation();
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

const ItemCategory = ({ item, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...category.item, backgroundColor: color }}>
        <Text style={{ ...category.title, color: 'black' }}>{item.name}</Text>
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
  const [loading, setLoading] = useState(true);
  const [browseData, setBrowseData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('browse')
      .onSnapshot(querySnapshot => {
        const browse = [];
        querySnapshot.forEach(documentSnapshot => {
          browse.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setBrowseData(browse);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('browse')
        .onSnapshot(querySnapshot => {
          const browse = [];
          querySnapshot.forEach(documentSnapshot => {
            browse.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setBlogData(browse);
        });
      setRefreshing(false);
    }, 1500);
  }, []);

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
      <View style={{ paddingHorizontal: 24, }}>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Jelajahi Seni</Text>
        <ScrollView
          contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loading ? (
            <View style={{ flex:1, justifyContent:'center', marginTop: 20 }}>
              <ActivityIndicator size={'large'} color={'#FFC600'} />
            </View>
          ) : browseData.length > 0 ? (
            browseData.map((item, index) => (
              <ItemCard item={item} key={index} />
            ))
          ) : (<Text style={{ color: 'black', marginTop: 20, textAlign: 'center' }}>Tidak Ada Data</Text>)}
        </ScrollView>
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
    marginRight: 6,
    borderRadius: 10,
    overflow: 'hidden',
    width: '48%',
    marginTop: 20
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
    right: 20,
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
