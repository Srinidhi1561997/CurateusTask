import React from 'react';
import type {Node} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Preview from './Src/Preview';
import Schedule from './Src/Schedule';
const Stack = createStackNavigator();

const App: () => Node = () => {
 
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Schedule'>
      <Stack.Screen name="Schedule" component={Schedule} options={{headerShown: false}}/>
      <Stack.Screen name="Preview" component={Preview} options={{headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;