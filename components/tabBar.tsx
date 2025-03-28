import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import TabBarButton from "./tabBarButton";
import { useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export const ICONS: { [key: string]: string } = {
    Home: 'home',
    Explore: 'compass',
    Profile: 'user',
  };
const MyTabBar = ({ state, descriptors, navigation }:{state:any, descriptors:any, navigation:any}) => {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
const [dimensions, setDimensions] = useState({
  width: 0,
  height: 0,
});
 const buttonWidth = dimensions.width / state.routes.length;
 const onTabBarLayout = (e:LayoutChangeEvent)=>{
  setDimensions({
    height:e.nativeEvent.layout.height,
    width:e.nativeEvent.layout.width
  })
 }

 const tabPositionX = useSharedValue(0);

 const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ translateX: tabPositionX.value }],
  };
});

    return (
      <View style={styles.tabBar} onLayout={onTabBarLayout}>
        <Animated.View style={[animatedStyle, {position:'absolute', backgroundColor:'#723FEB',  borderRadius:30, marginHorizontal: 12, height:dimensions.height-15, width:buttonWidth-25, bottom:7.5}]}/>
        {state.routes.map((route:any, index:any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            tabPositionX.value = withSpring(index * buttonWidth, {damping: 15, stiffness: 180, mass: 0.5 });
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TabBarButton
              key={route.key}
              route={route}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              label={label}
              colors={colors}
              options={options}
            />
          );
        })}

      </View>
    );
  }


  const styles = StyleSheet.create({
    tabBar: {
      position: 'absolute',
      bottom:50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 40,
      backgroundColor: '#ffff',
      marginHorizontal: 80,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,    
    },
    
  })

  
  export default MyTabBar