import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const OnboardingItem = ({
  item,
  currentIndex,
  index,
}: {
  item: { image: string; text: string; description: string };
  currentIndex: number;
  index: number;
}) => {
  const { width, height } = Dimensions.get('window');

  // Animation values
  const imageScale = useSharedValue(0.8);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(30);

  // Trigger animations when the screen changes
  useEffect(() => {
    if (currentIndex === index) {
      // Animate image scale
      imageScale.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      });

      // Animate text opacity and slide-up
      textOpacity.value = withTiming(1, { duration: 500 });
      textTranslateY.value = withTiming(0, { duration: 500 });
    } else {
      // Reset animations when not on the current screen
      imageScale.value = 0.8;
      textOpacity.value = 0;
      textTranslateY.value = 30;
    }
  }, [currentIndex, index]);

  // Animated styles
  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Animated.Image
          source={typeof item.image === 'string' ? { uri: item.image } : item.image}
          style={[
            styles.image,
            { width: width * 0.9, height: height * 0.55 },
            imageAnimatedStyle,
          ]}
        />
        <Image
          style={[styles.backgroundImage, { width, height: height * 0.65 }]} // Extended height
          source={require("../assets/images/bg.png")}
        />
      </View>

      {/* Text Section */}
      <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
        <Text style={styles.title}>{item.text}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Animated.View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  imageContainer: {
    flex: 0.66, // 66% of the screen height
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  textContainer: {
    flex: 0.15, // 15% of the screen height
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});