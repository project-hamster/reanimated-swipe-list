import { Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons';

const ITEM_HEIGHT = 50;
const ITEM_BORDER_RADIUS = 0;
const SWIPEABLE_WIDTH = 50;

export default SwipeableListItem = ({
    title,
    onRightActive = () => {},
    onLeftActive = () => {}
}) => {

    const swiped = useSharedValue(0);

    const reset = () => {
        swiped.value = withTiming(0);
    }

    const swipeGesture = Gesture.Pan()
    .onStart(()=>{
        swiped.value = 0
    })
    .onUpdate((e)=>{
        if(Math.abs(e.translationX) < SWIPEABLE_WIDTH)swiped.value = e.translationX
        else if(e.translationX < 0)swiped.value = -SWIPEABLE_WIDTH
        else if(e.translationX > 0)swiped.value = SWIPEABLE_WIDTH
    })
    .onEnd(()=>{
        if(swiped.value === SWIPEABLE_WIDTH)runOnJS(onLeftActive)({reset})
        else if(swiped.value === -SWIPEABLE_WIDTH)runOnJS(onRightActive)(reset)
        else swiped.value = withTiming(0, {duration:300})
    })

    const animeLeftIconContainerStyle = useAnimatedStyle(()=>{
        return {
            opacity: swiped.value / SWIPEABLE_WIDTH
        }
    })

    const animeRightIconContainerStyle = useAnimatedStyle(()=>{
        return {
            opacity: -swiped.value / SWIPEABLE_WIDTH
        }
    })

    const animeTaskContainerStyle = useAnimatedStyle(()=>{
        return {
            transform: [{translateX: swiped.value}]
        }
    })

    return (
        <GestureDetector gesture={swipeGesture}>
            <Animated.View 
            entering={FadeIn}
            exiting={FadeOut}
            layout={Layout}
            style={[styles.listItemContainer]}
            >
                <Animated.View style={[styles.leftIconContainer, animeLeftIconContainerStyle]}>
                    <FontAwesome5 name='archive' size={20} />
                </Animated.View>
                <Animated.View style={[styles.rightIconContainer, animeRightIconContainerStyle]} >
                    <FontAwesome5 name='trash' size={20} />
                </Animated.View>
                <Animated.View style={[styles.taskContainer, animeTaskContainerStyle]}>
                    <Text>{title}</Text>    
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
  listItemContainer: {
    height: ITEM_HEIGHT,
    width: '100%',
    borderRadius: ITEM_BORDER_RADIUS,
    marginVertical: 10
  },
  taskContainer: {
    height: ITEM_HEIGHT,
    backgroundColor:'white',
    width: '100%',
    paddingHorizontal: 10,
    // shadowOffset: {
    //     width:1,
    //     height:3
    // },
    // shadowOpacity: 0.5,
    justifyContent:'center',
    // alignItems: 'center'
  },
  leftIconContainer: {
    position: 'absolute',
    left: 0,
    height: ITEM_HEIGHT,
    width: ITEM_HEIGHT,
    borderTopLeftRadius: ITEM_BORDER_RADIUS,
    borderBottomLeftRadius: ITEM_BORDER_RADIUS,
    backgroundColor: 'green',
    justifyContent:'center',
    alignItems:'center'
  },
  rightIconContainer: {
    position: 'absolute',
    right: 0,
    height: ITEM_HEIGHT,
    width: ITEM_HEIGHT,
    borderTopRightRadius: ITEM_BORDER_RADIUS,
    borderBottomRightRadius: ITEM_BORDER_RADIUS,
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'center'    
  }  
})