
import Onboarding from '@/components/onboarding'
import { PlatformPressable } from '@react-navigation/elements'
import { useLinkBuilder, useTheme } from '@react-navigation/native'

import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '.'
import Explore from './explore'
import MyTabBar from '@/components/tabBar'


const Tab = createBottomTabNavigator();




const _layout = () => {
  return (
    <Tab.Navigator
    // screenOptions={{ headerShown: false }}
    tabBar={(props) => <MyTabBar {...props} />}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Explore" component={Explore} />
    <Tab.Screen name="Profile" component={Explore} />
  </Tab.Navigator>
  )
}



export default _layout