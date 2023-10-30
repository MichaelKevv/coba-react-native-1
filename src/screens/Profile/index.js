import { Flash, Logout, LogoutCurve, Notification, Setting, Setting2, UserEdit } from 'iconsax-react-native';
import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground style={styles.imageBanner}
          resizeMode='cover'
          source={{
            uri: 'https://i.pinimg.com/564x/ba/96/ab/ba96ab276db293af8922fd05e1332fee.jpg'
          }}>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 25, marginTop: -50, }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://templates.iqonic.design/sofbox-admin/sofbox-dashboard-html/html/images/user/1.jpg',
              }}
              style={{ ...styles.profileImage }}
            />
          </View>
          <View>
            <Text style={styles.profileName}>Michael Kevin Adinata</Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
            <Flash color={'rgb(255, 125, 0)'} variant="Linear" size={24} />
            <Text style={{ ...styles.profileInfo, color: 'rgb(255, 125, 0)', fontWeight: 'bold', paddingLeft: 5, }}>Gold Member</Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 10, }}>
            <View style={{ alignItems: 'center', }}>
              <Text style={styles.profileInfo}>"Seorang yang mengikuti passionnya"</Text>
            </View>
          </View>
          <View style={styles.informationContainer}>
            <View style={{ alignItems: 'center', }}>
              <Text style={styles.profileNumber}>100</Text>
              <Text style={styles.profileInfo}>Mengikuti</Text>
            </View>
            <View style={{ alignItems: 'center', }}>
              <Text style={styles.profileNumber}>65</Text>
              <Text style={styles.profileInfo}>Koleksi</Text>
            </View>
            <View style={{ alignItems: 'center', }}>
              <Text style={styles.profileNumber}>10</Text>
              <Text style={styles.profileInfo}>Favorit</Text>
            </View>
          </View>
          <View style={{}}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 24, marginBottom: 25, }}>
              <UserEdit color={'rgb(255, 125, 0)'} variant="Linear" size={24} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.profileSetting}>Edit Profile Saya</Text>
                <Text style={styles.profileSettingDesc}>Perbarui informasi personal anda</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 24, marginBottom: 25, }}>
              <Setting2 color={'rgb(255, 125, 0)'} variant="Linear" size={24} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.profileSetting}>Pengaturan</Text>
                <Text style={styles.profileSettingDesc}>Edit keamanan dan pengaturan lainnya</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 24, marginBottom: 25, }}>
              <LogoutCurve color={'rgb(255, 125, 0)'} variant="Linear" size={24} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.profileSetting}>Log Out</Text>
                <Text style={styles.profileSettingDesc}>Keluar dari akun anda</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
    backgroundColor: 'white',
  },
  imageBanner: {
    height: 200,
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
  card: {
    width: '48%',
    marginVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 3,
    borderColor: 'gold',
    position: 'absolute',
    zIndex: 2,
  },
  profileName: {
    marginTop: 60,
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  profileBio: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
  },
  profileNumber: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  profileSetting: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  profileSettingDesc: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  profileInfo: {
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
  },
  likedPhotosText: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  buttonEdit: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
  },
  informationContainer: {
    backgroundColor: 'lightgrey',
    marginHorizontal: 24,
    marginVertical: 24,
    flexDirection: 'row',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  }
});
