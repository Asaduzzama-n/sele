import { View, Text, Animated, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import OnboardingItem from './onboardingItem'
import { onboardingData } from '@/constants/data'
import Paginator from './paginator'
import { useNavigation } from '@react-navigation/native'
import { router, useRouter } from 'expo-router'



const Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false})
  const slideRef = useRef<FlatList | null>(null);
  const viewableItemsChanged = useRef(({viewableItems} : any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const router = useRouter();
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      slideRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex + 1,
      });
    }
  };

    // Function to handle Get Started button press
    const handleGetStarted = () => {
      // router.push('/(tabs)/index'); // Navigate to the Home screen
    };

  return (
    <GestureHandlerRootView style={styles.onboardingContainer}>
      <View style={styles.onboardingContainer}>
        <FlatList 
          data={onboardingData} 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          onViewableItemsChanged={viewableItemsChanged}
          pagingEnabled 
          bounces={false} 
          onScroll={handleScroll} 
          scrollEventThrottle={32} 
          viewabilityConfig={viewConfig} 
          ref={slideRef} 
          renderItem={({item, index}) => (
            <OnboardingItem item={item} currentIndex={currentIndex} index={index}/>
          )} 
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.paginatorWrapper}>
          <Paginator data={onboardingData} scrollX={scrollX} currentIndex={currentIndex} onNext={handleNext} onGetStarted={handleGetStarted}/>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
  paginatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'flex-start',
    height: Dimensions.get('window').height * 0.18,
  },
  paginatorWrapper: {
    backgroundColor: '#FFFF',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },

});

export default Onboarding;