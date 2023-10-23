import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Modal, Alert, ImageBackground, TextInput, Button, Dimensions, FlatList } from 'react-native';
import { Notification, SearchNormal, Receipt21, Clock, Message, ArrowRight2, Setting2, Like1, Icon, } from 'iconsax-react-native';
import { fontType, colors } from './src/assets/theme';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderImages, kategoriArr } from './data';

const HomeScreen = () => {
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
  };

  const handleLogout = () => {
    toggleModal();
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingTop: 10 }}>
        <ImageBackground
          style={{
            width: 'auto',
            height: 200,
          }}
          resizeMode="cover"
          source={{ uri: item.image }}
        >
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
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
      <ScrollView>
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
          <View style={styles.rightContainer}>
            <Notification color={colors.black()} variant="Linear" size={24} />
            <Setting2 color={colors.black()} variant="Linear" size={24} />
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
                <SearchNormal color={colors.black()} variant="Linear" size={24} style={styles.icon} />
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
        <BeritaSeniRupa />
      </ScrollView>
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
        <ArrowRight2 color={colors.black()} variant="Linear" size={20} />
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
        <ArrowRight2 color={colors.black()} variant="Linear" size={20} />
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
        <ArrowRight2 color={colors.black()} variant="Linear" size={20} />
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

const BeritaSeniRupa = () => {
  return (
    <View style={{ ...styles.headerSeniDaerah, marginBottom: 80 }}>
      <View style={styles.seniPopulerTitleContainer}>
        <Text style={styles.textSeni}>Berita Tentang Seni Rupa</Text>
        <ArrowRight2 color={colors.black()} variant="Linear" size={20} />
      </View>
      <View style={beritaSeniRupa.listCard}>
        <View style={beritaSeniRupa.cardItem}>
          <Image
            style={beritaSeniRupa.cardImage}
            source={{
              uri: 'https://cdn1-production-images-kly.akamaized.net/uqDKZsRJgae3f1rJ5m_3bgFjDrc=/1231x710/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2987401/original/083020200_1575531338-20191205-Berlatih-Melukis-di-Bundaran-HI-Jakarta-3.jpg',
            }}
          />
          <View style={beritaSeniRupa.cardContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ gap: 5, width: '70%' }}>
                <Text style={beritaSeniRupa.cardCategory}>Melukis</Text>
                <Text style={beritaSeniRupa.cardTitle}>
                  Berlatih Melukis di Bundaran HI Jakarta
                </Text>
              </View>
              <Receipt21
                color={colors.grey(0.6)}
                variant="Linear"
                size={20}
              />
            </View>
            <View style={beritaSeniRupa.cardInfo}>
              <Clock
                size={10}
                variant="Linear"
                color={colors.grey(0.6)}
              />
              <Text style={beritaSeniRupa.cardText}>05 Des 2019</Text>
              {/* <Message
                size={10}
                variant="Linear"
                color={colors.grey(0.6)}
              />
              <Text style={beritaSeniRupa.cardText}>89</Text> */}
            </View>
          </View>
        </View>

      </View>
      <View style={beritaSeniRupa.listCard}>
        <View style={beritaSeniRupa.cardItem}>
          <Image
            style={beritaSeniRupa.cardImage}
            source={{
              uri: 'https://cdn1-production-images-kly.akamaized.net/3MK-h-UyvFnxiuHBYhJx1YayIT8=/640x360/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2817707/original/025072600_1559031869-nippon_3_673x373.jpg',
            }}
          />
          <View style={beritaSeniRupa.cardContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ gap: 5, width: '70%' }}>
                <Text style={beritaSeniRupa.cardCategory}>Kerajinan</Text>
                <Text style={beritaSeniRupa.cardTitle}>
                  Vas Bunga Merupakan Contoh dari Kerajinan Keramik
                </Text>
              </View>
              <Receipt21
                color={colors.grey(0.6)}
                variant="Linear"
                size={20}
              />
            </View>
            <View style={beritaSeniRupa.cardInfo}>
              <Clock
                size={10}
                variant="Linear"
                color={colors.grey(0.6)}
              />
              <Text style={beritaSeniRupa.cardText}>21 Sep 2023</Text>
              {/* <Message
                size={10}
                variant="Linear"
                color={colors.grey(0.6)}
              />
              <Text style={beritaSeniRupa.cardText}>89</Text> */}
            </View>
          </View>
        </View>

      </View>
    </View>

  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            <Image
              source={{
                uri: 'https://templates.iqonic.design/sofbox-admin/sofbox-dashboard-html/html/images/user/1.jpg',
              }}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Michael Kevin Adinata</Text>
              <Text style={styles.welcomeText}>Selamat Datang Kembali</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Notification color={colors.black()} variant="Linear" size={24} />
            <Setting2 color={colors.black()} variant="Linear" size={24} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const TabArr = [
  { id: 1, route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeScreen },
  { id: 2, route: 'Search', label: 'Search', type: Ionicons, activeIcon: 'search', inActiveIcon: 'search-outline', component: ProfileScreen },
  { id: 3, route: 'Profile', label: 'Profile', type: Ionicons, activeIcon: 'people-circle', inActiveIcon: 'people-circle-outline', component: ProfileScreen }
];

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 20,
          },

        })}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={item.id} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color, focused, size }) => {
                  return <Ionicons
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    size={size}
                    color={color}
                  />
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
              }}
            />
          )
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const ListSeniRupa = () => {
  return (
    <View style={styles.headerSeniDaerah}>
      <View style={styles.seniPopulerTitleContainer}>
        <Text style={styles.textSeni}>List Galeri Tarian</Text>
        <ArrowRight2 color={colors.black()} variant="Linear" size={20} />
      </View>
      <ScrollView contentContainerStyle={listSeniRupa.scrollViewContent}>
        <View style={listSeniRupa.card}>
          <ImageBackground
            source={{
              uri: 'https://i.pinimg.com/564x/65/a6/02/65a6021abdc2b4bae40695ff91579bc6.jpg',
            }}
            style={listSeniRupa.image}
          >
            <View style={listSeniRupa.cardIcon}>
              <Like1 color={colors.white()} variant="Linear" size={24} />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>

  );
};

const beritaSeniRupa = StyleSheet.create({
  listCard: {
    paddingVertical: 10,
  },
  cardItem: {
    backgroundColor: 'rgba(168, 107, 71, 0.05)',
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardCategory: {
    color: 'rgba(168, 107, 71, 1)',
    fontSize: 10,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
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
const listSeniRupa = StyleSheet.create({
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 8,
  },
  card: {
    width: '48%', // 48% dari lebar layar untuk 2 kolom (dengan jarak di antara)
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 200, // Tinggi gambar
  },
  cardTitle: {
    fontSize: 16,
    padding: 8,
    backgroundColor: 'white',
  },
  listCard: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  cardIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 5,
    borderRadius: 20,
  }
});
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
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    backgroundColor: colors.black(0.5),
    padding: 5,
    borderColor: colors.white(),
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
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    backgroundColor: colors.black(0.5),
    padding: 5,
    borderColor: colors.white(),
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
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
    color: colors.white(),
  },
  cardText: {
    fontSize: 10,
    color: colors.white(),
    fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
    backgroundColor: colors.white(0.33),
    padding: 5,
    borderColor: colors.white(),
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
const styles = StyleSheet.create({
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
    backgroundColor: colors.white(),
  },
  imageBanner: {
    backgroundColor: 'rgba(168, 107, 71, 0.3)',
    width: 'auto',
    height: 200,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
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
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 15,
    backgroundColor: 'white',
    // elevation: 4,
    // shadowColor: 'rgba(0, 0, 0, 0.2)',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 4,
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

export default App;
