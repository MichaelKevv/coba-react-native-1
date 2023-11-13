import React, { useRef, useState } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BrowseDetail, BrowseScreen, HomeScreen, ProfileScreen } from '../screens';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabArr = [
  { id: 1, route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeScreen },
  { id: 2, route: 'Browse', label: 'Browse', type: Ionicons, activeIcon: 'compass', inActiveIcon: 'compass-outline', component: BrowseScreen },
  { id: 3, route: 'Profile', label: 'Profile', type: Ionicons, activeIcon: 'people-circle', inActiveIcon: 'people-circle-outline', component: ProfileScreen }
];
function MainApp() {
  return (
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
      {TabArr.map((item) => {
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
  );
}
const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BrowseDetail"
        component={BrowseDetail}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};
export default Router;