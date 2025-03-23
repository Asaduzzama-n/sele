import { View, Text, Image, Animated, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import OnboardingItem from './onboardingItem'
import Svg, { Circle, G } from 'react-native-svg'
import { Feather } from '@expo/vector-icons'
import { onboardingData } from '@/constants/data'

const Paginator = ({data, scrollX}: {data: any, scrollX: Animated.Value}) => {
  const width = Dimensions.get('window').width;

  return (
    <View style={styles.paginatorContainer}>
      {data.map((_: any, index: number) => {
        const inputRange = [(index-1)*width, index*width, (index+1)*width]
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 25, 10],
          extrapolate: 'clamp'
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        })
       return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={index} />
      })}
    </View>
  )
}

const Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false})
  const slideRef = useRef(null);
  const viewableItemsChanged = useRef(({viewableItems} : any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

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
          renderItem={({item}) => (
            <OnboardingItem item={item} />
          )} 
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.paginatorWrapper}>
          <Paginator data={onboardingData} scrollX={scrollX} />
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    marginHorizontal: 5,
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