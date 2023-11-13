import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Heart } from 'iconsax-react-native';

const ListBerita = ({ item }) => {
  const [favorite, setFavorite] = useState([]);
  const toggleFavorite = itemId => {
    if (favorite.includes(itemId)) {
      setFavorite(favorite.filter(id => id !== itemId));
    } else {
      setFavorite([...favorite, itemId]);
    }
  };
  return (
    <View style={{ ...beritaSeniRupa.headerSeniDaerah }}>
      <View style={beritaSeniRupa.listCard}>
        <View style={beritaSeniRupa.cardItem}>
          <Image
            style={beritaSeniRupa.cardImage}
            source={{
              uri: item.image,
            }}
          />
          <View style={beritaSeniRupa.cardContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ gap: 5, width: '80%' }}>
                <Text style={beritaSeniRupa.cardCategory}>{item.category}</Text>
                <Text style={beritaSeniRupa.cardTitle}>
                  {item.title}
                </Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Heart
                  color={'rgba(255,0,0, 0.7)'}
                  variant={favorite.includes(item.id) ? 'Bold' : 'Linear'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View style={beritaSeniRupa.cardInfo}>
              <Image
                source={{
                  uri: 'https://templates.iqonic.design/sofbox-admin/sofbox-dashboard-html/html/images/user/1.jpg',
                }}
                style={beritaSeniRupa.profileImage}
              />
              <Text style={beritaSeniRupa.cardText}>{item.uploadBy}</Text>
              <Text style={beritaSeniRupa.cardText}>•</Text>
              <Text style={beritaSeniRupa.cardText}>{item.date}</Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
};
export default ListBerita;
const beritaSeniRupa = StyleSheet.create({
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  seniPopulerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSeniPopuler: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  headerSeniDaerah: {
    paddingHorizontal: 24,
  },
  textSeni: {
    fontSize: 20,
    marginRight: 8,
    color: 'black',
  },
  listCard: {
    paddingVertical: 10,
  },
  cardItem: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  cardCategory: {
    color: 'rgba(168, 107, 71, 0.6)',
    fontSize: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: 'black',
  },
  cardText: {
    fontSize: 10,
    color: 'rgba(168, 107, 71, 0.6)',
  },
  cardImage: {
    width: 100,
    height: 'auto',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardContent: {
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});