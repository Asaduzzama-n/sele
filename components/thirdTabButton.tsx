import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const ThirdTabButton = ({onPress, onLongPress, route, label, isFocused, colors}: {onPress: () => void, onLongPress: () => void, route: any, label: string, isFocused: boolean, colors: any}) => {

    const ICONS = {
        Home: 'home',
        Explore: 'compass',
        Profile: 'user',
      };



      const scale = useSharedValue(0);

      useEffect(()=>{
        scale.value = withSpring(isFocused ? 1 : 0, {damping: 10, stiffness: 100 });
      },[isFocused])


      const animatedTextStyle = useAnimatedStyle(() => {
        return {
          opacity: interpolate(scale.value, [0,1], [1,0]),
        };
      });

      const animatedIconStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: interpolate(scale.value, [1,0], [-28,0]) }],
        };
      });


  return (
    <Pressable
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.tabBarItems}
    key={route.key}
  >
    <Animated.View style={[animatedIconStyle]}>
      <Feather name={ICONS[route.name as keyof typeof ICONS]} size={24} color={isFocused ? '#fff' : '#fff'} />
    </Animated.View>
    <Animated.Text style={[animatedTextStyle, { color: isFocused ? '#fff' : '#fff' }, { fontSize: 12 }]}>
      {label}
    </Animated.Text>
  </Pressable>
  )
}


const styles = StyleSheet.create({
    tabBarItems: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5
      },
})

export default ThirdTabButton