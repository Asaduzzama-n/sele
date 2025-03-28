import { View, Platform, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import ThirdTabButton from './thirdTabButton';

function ThirdTabBar({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) {
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

  console.log(dimensions, buttonWidth);

  const tabPositionX= useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });



  return (
    <View style={styles.tabBar} onLayout={onTabBarLayout}>
        <Animated.View style={[
    animatedStyle,
    {
      position: 'absolute',
      backgroundColor: '#4D55CC',
      borderWidth:5,
        borderColor:'#fff',
      borderRadius: 40,
      shadowColor: '#fff', // Simulates a white border
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10, // Adjust this for smoothness
      marginHorizontal: 12,
      height: dimensions.height - 2,
      width: buttonWidth - 80,
      top: -35,
      left: '6%',
      transform: [{ translateX: -(buttonWidth - 70) / 2 }],
    },
  ]}/>
      {state.routes.map((route: any, index: number) => {
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
         <ThirdTabButton
         onPress={onPress}
         onLongPress={onLongPress}
         route={route}
         label={label}
         isFocused={isFocused}
         colors={colors}
         />
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    backgroundColor: '#211C84',
    paddingVertical: 10,
    // height: 60,
  },
 animatedTabBar: {
  position:'absolute',
  borderRadius:100,
  marginHorizontal: 12,
  left: '50%',  // Move to the center
 
  top:-40
 }
})


export default ThirdTabBar