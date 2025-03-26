import { Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { ICONS } from './tabBar';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = ({
  route,
  isFocused,
  onPress,
  onLongPress,
  label,
}: {
  route: any;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  label: string;
}) => {
  const scale = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { damping: 10, stiffness: 100 });
  }, [isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scale.value, [0, 1], [1, 0]),
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(scale.value, [0, 1], [0, 8]), // Moves icon slightly up
      transform: [{ scale: interpolate(scale.value, [0, 1], [1, 1.2]) }], // Smooth scale animation
    };
  });

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tabItem} key={route.key}>
      <Animated.View style={[animatedIconStyle]}>
        <Feather name={ICONS[route.name as keyof typeof ICONS]} size={24} color={isFocused ? '#fff' : '#222'}  />
      </Animated.View>
      <Animated.Text style={[animatedTextStyle, { color: isFocused ? '#673ab7' : '#222' }, { fontSize: 12 }]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
  },
});

export default TabBarButton;
