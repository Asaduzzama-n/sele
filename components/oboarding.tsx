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
    <View style={{flexDirection: 'row', height:64, alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
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
       return <Animated.View className="mx-2 rounded-full bg-[#F4338F]" style={{width: dotWidth, height: 10, borderRadius: 5, marginBottom: 20, opacity}} key={index} />
      })}
    </View>
  )
}


const NextButton = ({percentage}: {percentage: number}) => {
  const size = 100;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size/2 - strokeWidth/2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<Circle | null>(null);

  const animation =(toValue: number)=>{
    console.log(toValue,"toValue")
   return Animated.timing(progressAnimation, {
    toValue,
    duration: 300,
    useNativeDriver: true
   }).start();
  }

  useEffect(() => {
    animation(percentage);
    progressAnimation.addListener(value => {
      const strokeDashoffset = circumference - (circumference * Number(value.value)) / 100;
      if (progressRef.current) {
        progressRef.current.setNativeProps({ strokeDashoffset });
      }
    });

  }, [percentage]);
console.log(percentage)
  return (
    <View style={{flex: 1, marginBottom: 60,  justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: '600'}}>{percentage}</Text>

      <Svg width={size} height={size}>
       <G rotation={-90} origin={center} fill="none">
       <Circle stroke="#E6E7E8" strokeWidth={strokeWidth} cx={center} cy={center} r={radius}></Circle>
       <Circle ref={progressRef} cx={center}  cy={center} r={radius} stroke="#F4338F" strokeWidth={strokeWidth} strokeDasharray={circumference} />
       </G>

      </Svg>
      <TouchableOpacity style={styles.button}>
        <Feather style={{color: '#E6E7E8' , fontSize: 30}} name="arrow-right"></Feather>
      </TouchableOpacity>
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
    <GestureHandlerRootView  >
      <View style={{flex: 3
        , justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFF'}}>
      <FlatList data={onboardingData} horizontal showsHorizontalScrollIndicator={false} onViewableItemsChanged={viewableItemsChanged}
       pagingEnabled bounces={false} onScroll={handleScroll} scrollEventThrottle={32} viewabilityConfig={viewConfig} ref={slideRef} renderItem={({item}) => (
        <OnboardingItem item={item} />
      )} keyExtractor={(item, index) => index.toString()}></FlatList>
      <Paginator data={onboardingData} scrollX={scrollX} />
      <NextButton percentage={(currentIndex + 1)*(100/onboardingData.length)} />
      </View>
     
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  button: {
    position:'absolute',
    backgroundColor:'#f4338f',
    borderRadius: 100,
    padding: 20,
  }
})

export default Onboarding