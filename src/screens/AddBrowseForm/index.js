import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ArrowLeft } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";

const AddBrowseForm = () => {
  const dataCategory = [
    { id: 1, name: "Lukisan" },
    { id: 2, name: "Patung" },
    { id: 3, name: "Tarian" },
  ];
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: {},
    totalLikes: 0,
    totalComments: 0,
  });
  const handleChange = (key, value) => {
    setBlogData({
      ...blogData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={'black'} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>Postingan Baru</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        <Text style={{color:'black'}}>Judul</Text>
        <View style={textInput.border}>
          <TextInput
            placeholder="Masukkan Judul Postingan Anda"
            value={blogData.title}
            onChangeText={(text) => handleChange("title", text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.6)'}
            multiline
            style={textInput.title}
          />
        </View>
        <Text style={{color:'black'}}>Deskripsi</Text>
        <View style={[textInput.border, { minHeight: 250 }]}>
          <TextInput
            placeholder="Masukkan Deskripsi Postingan Anda"
            value={blogData.content}
            onChangeText={(text) => handleChange("content", text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.6)'}
            multiline
            style={textInput.content}
          />
        </View>
        <Text style={{color:'black'}}>Foto</Text>
        <View style={[textInput.border]}>
          <TextInput
            placeholder="Masukkan Foto Postingan Anda"
            value={image}
            onChangeText={(text) => setImage(text)}
            placeholderTextColor={'rgba(128, 128, 128, 0.6)'}
            style={textInput.content}
          />
        </View>
        <Text style={{color:'black'}}>Kategori</Text>
        <View style={[textInput.border]}>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === blogData.category.id
                  ? '#FFC600'
                  : '#FFE58C';
              const color =
                item.id === blogData.category.id
                  ? 'black'
                  : 'black';
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange("category", { id: item.id, name: item.name })
                  }
                  style={[category.item, { backgroundColor: bgColor }]}
                >
                  <Text style={[category.name, { color: color }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddBrowseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    marginTop: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFC600',
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 14,
    color: 'black',
  },
});
const textInput = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: 'rgba(128, 128, 128, 0.4)',
  },
  title: {
    fontSize: 14,
    color: 'black',
    padding: 0,
  },
  content: {
    fontSize: 14,
    color: 'black',
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    color: 'rgba(128, 128, 128, 0.6)',
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 12,
  },
});