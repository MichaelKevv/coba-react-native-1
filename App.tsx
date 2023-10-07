import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Selamat Datang di NusantaraArt</Text>
        <Text style={styles.description}>
          Temukan keindahan seni rupa Nusantara di aplikasi kami.
        </Text>
        <Text style={styles.sectionTitle}>Pameran Terbaru</Text>
        {/* Tambahkan daftar pameran terbaru di sini */}
        <Text style={styles.sectionTitle}>Artis Terkenal</Text>
        {/* Tambahkan daftar artis terkenal di sini */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  // Tambahkan gaya lain yang Anda butuhkan di sini
});

export default HomeScreen;
