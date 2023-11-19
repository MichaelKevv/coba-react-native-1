import React, { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Modal, Alert, ImageBackground, TextInput, Button, Dimensions, FlatList } from 'react-native';
import { Notification, SearchNormal, Receipt21, Clock, Message, ArrowRight2, Setting2, Like1, Icon, } from 'iconsax-react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderImages, kategoriArr, dataBerita } from '../../../data';
import { ListBerita } from '../../components';

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
  });
  const { width: screenWidth } = Dimensions.get('window');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const isCarousel = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderWidth = screenWidth;

  const handleSearchPress = (text) => {
    setSearchText(text);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleProfilePress = () => {
    toggleModal();
  };

  const handleEditProfile = () => {
    toggleModal();
    // Tambahkan kode untuk tindakan edit profil di sini
  };

  const handleLogout = () => {
    toggleModal();
    // Tambahkan kode untuk tindakan logout di sini
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingTop: 20, paddingLeft: 24, paddingRight: 24 }}>
        <ImageBackground
          style={{
            width: 'auto',
            height: 200,
          }}
          resizeMode="cover"
          imageStyle={{borderRadius: 10,}}
          source={{ uri: item.image }}
        >
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: 10,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}></View>
          <View style={itemKategori.cardContent}>
            <View style={itemKategori.textContainer}>
              <Text style={itemKategori.cardTitle}>{item.title}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerLogo, { transform: [{ translateY: headerY }] }]}>
        <View style={styles.leftContainer}>
          <Image
            source={require('../../assets/images/logo1.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.rightContainer}>
          <Notification color={'black'} variant="Linear" size={24} />
          {/* <Setting2 color={'black'} variant="Linear" size={24} /> */}
        </View>
      </Animated.View>
      <Animated.ScrollView showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}>
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={handleProfilePress}>
              <Image
                source={{
                  uri: 'https://templates.iqonic.design/sofbox-admin/sofbox-dashboard-html/html/images/user/1.jpg',
                }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Michael Kevin Adinata</Text>
              <Text style={styles.welcomeText}>Selamat Datang Kembali</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 24, marginTop: 16, }}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Cari Seni Rupa"
              onChangeText={handleSearchPress}
              value={searchText}
              placeholderTextColor="gray"
            />
            <View style={styles.searchButtonContainer}>
              <TouchableOpacity style={styles.searchButton}>
                <SearchNormal color={'black'} variant="Linear" size={24} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Carousel
            ref={isCarousel}
            data={sliderImages}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            itemWidth={screenWidth}
            layout={'default'}
            autoplay
            loop
            onSnapToItem={index => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={sliderImages.length}
            activeDotIndex={activeSlide}
            containerStyle={{
              paddingTop: 20,
              paddingBottom: 20,
            }}
            dotColor={'black'}
            inactiveDotColor={'gray'}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
            }}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.8}
          />
        </View>
        <KategoriSeniRupa />
        <SeniPopuler />
        <JelajahiBerdasarkanDaerah />
        <View style={styles.headerSeniDaerah}>
          <View style={styles.seniPopulerTitleContainer}>
            <Text style={styles.textSeni}>Rekomendasi Berita</Text>
            <Text style={styles.textViewAll}>View All</Text>
          </View>
        </View>
        <View style={{ marginBottom: 80 }}>
          {dataBerita.map((item, index) => (
            <ListBerita item={item} key={index} />
          ))}
        </View>

      </Animated.ScrollView>
      <Modal
        visible={isModalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Profil Anda</Text>
              <TouchableOpacity onPress={handleEditProfile}>
                <Text style={styles.modalItem}>Edit Profil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.modalItem}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.modalItem}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const KategoriSeniRupa = () => {
  return (
    <View style={{ paddingHorizontal: 24, }}>
      <View style={styles.seniPopulerTitleContainer}>
        <Text style={styles.textSeni}>Kategori Karya Seni</Text>
        <Text style={styles.textViewAll}>View All</Text>
      </View>

      <View style={styles.listBlog}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 15 }}>
          {kategoriArr.map((item, index) => {
            return <TouchableOpacity key={item.id}>
              <View style={{ ...itemKategori.cardItem }}>
                <ImageBackground
                  style={itemKategori.cardImage}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 15 }}
                  source={{
                    uri: item.imageUrl,
                  }}
                >
                  <View style={itemKategori.darkOverlay}></View>
                  <View style={itemKategori.cardContent}>
                    <View style={itemKategori.textContainer}>
                      <Text style={itemKategori.cardTitle}>{item.name}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          })}

        </ScrollView>
      </View>
    </View>
  );
}

const SeniPopuler = () => {
  return (
    <View style={styles.headerSeniPopuler}>
      <View style={styles.seniPopulerTitleContainer}>
        <Text style={styles.textSeni}>Karya Seni Terpopuler</Text>
        <Text style={styles.textViewAll}>View All</Text>
      </View>

      <View style={styles.listBlog}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 15 }}>
          <View style={{ ...itemSeniPopuler.cardItem, marginLeft: 0 }}>
            <ImageBackground
              style={itemSeniPopuler.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://images.unsplash.com/photo-1662793524504-bd11271b4b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
              }}
            >
              <View style={itemSeniPopuler.cardContent}>
                <View style={itemSeniPopuler.textContainer}>
                  <Text style={itemSeniPopuler.cardTitle}>Wayang Kulit</Text>
                  <Text style={itemSeniPopuler.cardText}>Kerajinan yang terkenal hingga ke manca negara dan biasa dipakai pada pertunjukan</Text>
                </View>

              </View>
            </ImageBackground>
          </View>
          <View style={itemSeniPopuler.cardItem}>
            <ImageBackground
              style={itemSeniPopuler.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://images.unsplash.com/photo-1543874835-ad7d64196a07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
              }}
            >
              <View style={itemSeniPopuler.cardContent}>
                <View style={itemSeniPopuler.textContainer}>
                  <Text style={itemSeniPopuler.cardTitle}>Batik</Text>
                  <Text style={itemSeniPopuler.cardText}>Kerajinan yang sangat terkenal di berbagai daerah</Text>
                </View>
                {/* <View style={itemSeniPopuler.cardIcon}>
                  <ArrowRight2 color={'white'} variant="Linear" size={20} />
                </View> */}
              </View>
            </ImageBackground>
          </View>
          <View style={itemSeniPopuler.cardItem}>
            <ImageBackground
              style={itemSeniPopuler.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/564x/1c/1e/ff/1c1eff0cbc186d1cdcc3923c3a62c395.jpg',
              }}
            >
              <View style={itemSeniPopuler.cardContent}>
                <View style={itemSeniPopuler.textContainer}>
                  <Text style={itemSeniPopuler.cardTitle}>Lukisan Bali</Text>
                  <Text style={itemSeniPopuler.cardText}>Lukisan yang dibuat oleh seniman dari Bali, biasanya menggambarkan tarian Bali</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const JelajahiBerdasarkanDaerah = () => {
  return (
    <View style={styles.headerSeniDaerah}>
      <View style={styles.seniPopulerTitleContainer}>
        <Text style={styles.textSeni}>Jelajahi Berdasarkan Daerah</Text>
        <Text style={styles.textViewAll}>View All</Text>
      </View>
      <View style={styles.listBlog}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 15 }}>
          <View style={{ ...itemSeniDaerah.cardItem, marginLeft: 0 }}>
            <ImageBackground
              style={itemSeniDaerah.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/564x/65/a6/02/65a6021abdc2b4bae40695ff91579bc6.jpg',
              }}
            >
              <View style={itemSeniDaerah.cardContent}>
                <View style={itemSeniDaerah.cardInfo}>
                  <Text style={itemSeniDaerah.cardTitle}>
                    Malang
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...itemSeniDaerah.cardItem, marginLeft: 0 }}>
            <ImageBackground
              style={itemSeniDaerah.cardImage}
              resizeMode="cover"
              imageStyle={{ borderRadius: 15 }}
              source={{
                uri: 'https://i.pinimg.com/564x/5f/a2/c7/5fa2c72078633f6fcb30b89cc3f8a5b3.jpg',
              }}
            >
              <View style={itemSeniDaerah.cardContent}>
                <View style={itemSeniDaerah.cardInfo}>
                  <Text style={itemSeniDaerah.cardTitle}>
                    Nusa Tenggara Timur
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const itemKategori = StyleSheet.create({
  cardItem: {
    width: 'auto',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '100%',
  },
  cardTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {

    fontSize: 14,
    color: 'white',
  },
  cardText: {
    fontSize: 10,
    color: 'white',

  },
  cardIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 5,
    width: 30,
    height: 30,
  },
})
const itemSeniPopuler = StyleSheet.create({
  cardItem: {
    width: 'auto',
  },
  cardImage: {
    width: 200,
    height: 300,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '100%',
  },
  cardTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {

    fontSize: 14,
    color: 'white',
  },
  cardText: {
    fontSize: 10,
    color: 'white',

  },
  cardIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 5,
    width: 30,
    height: 30,
  },
})
const itemSeniDaerah = StyleSheet.create({
  cardItem: {
    width: 'auto',
  },
  cardImage: {
    width: 200,
    height: 100,
    borderRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  cardInfo: {
    justifyContent: 'flex-end',
    height: '100%',
    gap: 10,
    maxWidth: '60%',
  },
  cardTitle: {

    fontSize: 14,
    color: 'white',
  },
  cardText: {
    fontSize: 10,
    color: 'white',

  },
  cardIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
    padding: 5,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  paginationText: {
    fontSize: 24,
    margin: 5,
    color: 'gray',
  },
  activePaginationText: {
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerSeniPopuler: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  headerSeniDaerah: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  textSeni: {
    fontSize: 20,
    marginRight: 8,
    color: 'black',
  },
  textViewAll: {
    color: 'rgb(0, 118, 209)',
    fontWeight: 'bold',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 60,
    backgroundColor: 'white',
  },
  headerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 52,
    position:'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'white',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 12,
    color: 'gray',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    marginHorizontal: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButtonContainer: {
    paddingLeft: 14,
  },
  searchButton: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    backgroundColor: 'rgba(180, 131, 61, 0.4)',
  },
  icon: {
    margin: 8,
    // marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    paddingHorizontal: 14,
    paddingVertical: 2,
    color: 'black',
    height: 45,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    top: 60,
    left: 25,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',

  },
  modalItem: {
    fontSize: 16,
    marginBottom: 12,
    color: 'black',
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 0,
  },
  seniPopulerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});
