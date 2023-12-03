import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Like1, Receipt21, Message, Share, More, DocumentDownload } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { dataExplore } from '../../../data';
import axios from 'axios';
import ActionSheet from 'react-native-actions-sheet';

const BrowseDetail = ({ route }) => {
  const { browseId } = route.params;
  const [iconStates, setIconStates] = useState({
    liked: { variant: 'Linear', color: 'black' },
    bookmarked: { variant: 'Linear', color: 'black' },
  });
  const [selectedBrowseItem, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  useEffect(() => {
    getBlogById();
  }, [browseId]);

  const getBlogById = async () => {
    try {
      const response = await axios.get(
        `https://65644966ceac41c0761dccb1.mockapi.io/nusantaraart/browseData/${browseId}`,
      );
      setSelectedBlog(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateEdit = () => {
    closeActionSheet()
    navigation.navigate('EditBrowse', { browseId })
  }
  const handleDelete = async () => {
    await axios.delete(`https://65644966ceac41c0761dccb1.mockapi.io/nusantaraart/browseData/${browseId}`)
      .then(() => {
        closeActionSheet()
        navigation.navigate('Browse');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const navigation = useNavigation();
  const toggleIcon = iconName => {
    setIconStates(prevStates => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color:
          prevStates[iconName].variant === 'Linear'
            ? 'rgb(255, 125, 0)'
            : 'black',
      },
    }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 50, padding: 10 }} onPress={() => navigation.goBack()}>
          <ArrowLeft
            color={'white'}
            variant="Linear"
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openActionSheet} style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 50, padding: 10 }}>
          <More
            color={'white'}
            variant="Linear"
            size={24}
          />
        </TouchableOpacity>
      </View>
      {loading ? (<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size={'large'} color={'#FFC600'} />
      </View>) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
          }}>
          <ImageBackground
            style={styles.image}
            source={{
              uri: selectedBrowseItem?.image,
            }}
            resizeMode={'cover'}>
            {/* <View style={styles.darkOverlay}></View> */}
          </ImageBackground>
          <View style={{ paddingHorizontal: 24 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{
                    uri: 'https://templates.iqonic.design/sofbox-admin/sofbox-dashboard-html/html/images/user/1.jpg',
                  }}
                  style={styles.profileImage}
                />
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.userName}>{selectedBrowseItem?.createdBy}</Text>
                  <Text style={styles.userFollower}>100 Pengikut</Text>
                </View>
              </View>
              <TouchableOpacity style={{ backgroundColor: 'white', borderWidth: 1, justifyContent: 'center', paddingHorizontal: 24, borderRadius: 25 }}>
                <Text style={{ color: 'rgb(255, 125, 0)', fontSize: 14, }}>Ikuti</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 25,
                }}>
                <Text style={styles.category}>{selectedBrowseItem?.category.name}</Text>
              </View>
              <Text style={styles.title}>{selectedBrowseItem?.name}</Text>
              <Text style={styles.content}>{selectedBrowseItem?.description}</Text>
            </View>
          </View>
        </ScrollView>
      )}
      <View style={styles.bottomBar}>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => toggleIcon('liked')}>
            <Like1
              color={iconStates.liked.color}
              variant={iconStates.liked.variant}
              size={24}
            />
          </TouchableOpacity>
          <Text style={styles.info}>
            2K
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
            <Receipt21
              color={iconStates.bookmarked.color}
              variant={iconStates.bookmarked.variant}
              size={24}
            />
          </TouchableOpacity>
          <Text style={styles.info}>
            1K
          </Text>
        </View>
        <TouchableOpacity>
          <Share
            color={'black'}
            variant={'Linear'}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}
          >
          <Text
            style={{
              
              color: 'black',
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              
              color: 'black',
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};
export default BrowseDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginVertical: 5,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
  },
  bottomBar: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 60,
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 400,
    width: 'auto',
    borderRadius: 10,
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
  info: {
    color: 'rgba(128,128,128,0.6)',

    fontSize: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    color: 'black',
    fontSize: 14,
  },
  userFollower: {
    color: 'grey',
    fontSize: 12,
  },
  category: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 25,
    color: 'gold',
    fontSize: 12,
  },
  date: {
    color: 'rgba(128,128,128,0.6)',
    fontSize: 10,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
  },
  content: {
    color: 'black',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 15,
  },
});