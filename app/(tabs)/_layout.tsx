
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '.'
import Explore from './explore'
import CustomBottomTab from '@/components/bottomTabs/CustomBottomTab';
import Hello from './hello';



const Tab = createBottomTabNavigator();




const _layout = () => {
  return (
    <Tab.Navigator
    screenOptions={{ headerShown: false,  }}
    
    tabBar={(props) => <CustomBottomTab{...props} />}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Explore" component={Explore} />
    <Tab.Screen name="Profile" component={Explore} />
    <Tab.Screen name="hello" component={Hello} />
  </Tab.Navigator>
  )
}



export default _layout