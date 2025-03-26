import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

const Paginator = ({
  data,
  scrollX,
  currentIndex,
  onNext,
  onGetStarted,
}: {
  data: any;
  scrollX: Animated.Value;
  currentIndex: number;
  onNext: () => void; // Function to handle Next button press
  onGetStarted: () => void; // Function to handle Get Started button press
}) => {
  const width = Dimensions.get('window').width;

  // Animation values for Next button
  const nextScaleAnim = useRef(new Animated.Value(0)).current;
  const nextOpacityAnim = useRef(new Animated.Value(0)).current;

  // Animation values for Get Started button
  const getStartedScaleAnim = useRef(new Animated.Value(0)).current;
  const getStartedOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentIndex !== data.length - 1) {
      // Animate Next button in
      Animated.parallel([
        Animated.spring(nextScaleAnim, { toValue: 1, useNativeDriver: true, friction: 60 }),
        Animated.timing(nextOpacityAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();

      // Animate Get Started button out
      Animated.parallel([
        Animated.spring(getStartedScaleAnim, { toValue: 0, useNativeDriver: true, friction: 60 }),
        Animated.timing(getStartedOpacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      // Animate Get Started button in
      Animated.parallel([
        Animated.spring(getStartedScaleAnim, { toValue: 1, useNativeDriver: true, friction: 60 }),
        Animated.timing(getStartedOpacityAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();

      // Animate Next button out
      Animated.parallel([
        Animated.spring(nextScaleAnim, { toValue: 0, useNativeDriver: true, friction: 60 }),
        Animated.timing(nextOpacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [currentIndex]);

  return (
    <View style={styles.paginatorContainer}>
      {data.map((_: any, index: number) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 35, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={index} />;
      })}

      {/* Next Button */}
      {currentIndex !== data.length - 1 && (
        <Animated.View style={[styles.nextButton, { transform: [{ scale: nextScaleAnim }], opacity: nextOpacityAnim }]}>
          <TouchableOpacity onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Get Started Button */}
      {currentIndex === data.length - 1 && (
        <Animated.View style={[styles.getStartedButton, { transform: [{ scale: getStartedScaleAnim }], opacity: getStartedOpacityAnim }]}>
          <TouchableOpacity onPress={onGetStarted}>
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paginatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: Dimensions.get('window').height * 0.18,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    marginHorizontal: 5,
  },
  nextButton: {
    backgroundColor: '#E6F2FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 100,
    bottom: 20,
  },
  nextButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  getStartedButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 200,
    borderRadius: 10,
    bottom: 20,
  },
  getStartedButtonText: {
    color: '#FFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Paginator;