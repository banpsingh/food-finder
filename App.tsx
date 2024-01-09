import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './MapScreen';
import ListScreen from './ListScreen';
import DetailScreen from './DetailScreen'

import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet, 
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { LocationProvider } from './Global/LocationContext';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  

  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Map'>
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>  
  );
}



export default App;
