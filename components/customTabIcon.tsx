import usePath from "@/hooks/usePath"
import { getPathXCenterByIndex } from "@/utils/path"
import { Feather } from "@expo/vector-icons"
import { useEffect } from "react"
import { Dimensions, Pressable, StyleSheet, Text } from "react-native"
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"


export type TabProps = {
    label:string,
    icon: string,
    index: number
    activeIndex: number
    onTabPress: () => void
}


const {width: SCREEN_WIDTH,height:SCREEN_HEIGHT} = Dimensions.get('window')

const ICON_SIZE = 25
const LABEL_WIDTH = SCREEN_WIDTH / 3
const AnimatedIcon = Animated.createAnimatedComponent(Feather)


const CustomTabIcon = ({label,icon,index,activeIndex,onTabPress}:TabProps) => {

    const {curvedPaths} = usePath();
    const animatedActiveIndex = useSharedValue(activeIndex);
    const iconPosition = getPathXCenterByIndex(curvedPaths,index);
    const labelPosition = getPathXCenterByIndex(curvedPaths,index);

    const tabStyle = useAnimatedStyle(() => {
        const translateY = animatedActiveIndex.value -1 === index ? -35 :20;
        const iconPositionX = iconPosition - index * ICON_SIZE;
        return {
           width: ICON_SIZE,
           height: ICON_SIZE,
          transform:[
            {translateY:withTiming(translateY)},
            {translateX:iconPositionX-ICON_SIZE/2}
          ]
        }
    })

    const labelContainerStyle = useAnimatedStyle(() => {
        const translateY = animatedActiveIndex.value -1 === index ? -36 :100;

        return {
          transform:[
            {translateY:withTiming(translateY)},
            {translateX:labelPosition-LABEL_WIDTH/2}
          ]
        }
    })

    const iconColor = useSharedValue(activeIndex === index + 1 ? '#4D55CC' : 'rgba(128,128,128,0.8)')

    useEffect(() => {
        animatedActiveIndex.value = activeIndex
        if(activeIndex === index + 1) {
            iconColor.value = withTiming('#4D55CC')
        } else {
            iconColor.value = withTiming('rgba(128,128,128,0.8)')
        }
    }, [activeIndex])

 const animatedIconProps = useAnimatedProps(() => {
    return {
        color: iconColor.value
    }
 })

    return (
<>
<Animated.View style={[tabStyle]}>
            <Pressable
            testID={label}
            hitSlop={{top:30, bottom:30, left:50, right:50}}
            onPress={onTabPress}
            >
            <AnimatedIcon
            name={icon}
            size={ICON_SIZE}
            animatedProps={animatedIconProps}
            />
            </Pressable>
        </Animated.View>
        <Animated.View style={[labelContainerStyle, styles.labelContainer]}>
            <Text style={styles.label}>{label}</Text>
        </Animated.View>
</>
    )
}

const styles = StyleSheet.create({
    labelContainer: {
        position: 'absolute',
        alignItems: 'center',
        width: LABEL_WIDTH,

    },
    label: {
        color: '#4D55CC',
        fontSize: 17,

    },
})
