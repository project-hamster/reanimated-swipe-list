import { useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import SwipeableListItem from '../components/SwipeableItem'

const initLists = [
  {
    title: 'task1',
    taskID: 31
  },
  {
    title: 'task2',
    taskID: 11
  },
  {
    title: 'task3',
    taskID: 10
  },
  {
    title: 'task4',
    taskID: 48
  }
]

export default () => {
  const [lists, setLists] = useState(initLists);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        {
          lists.map((l, index)=>(
            <SwipeableListItem 
            key={l.taskID}
            title={l.title}
            onLeftActive={({reset})=>{
              reset()
            }}
            onRightActive={()=>{
              setLists(lists.filter((item) => item.taskID!==l.taskID))
            }}
            />
          ))
        }
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    // paddingHorizontal: 30
  }
})