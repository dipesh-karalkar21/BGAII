import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Hverse from "./components/hverselist"
import Chplist from './components/chplist';
import StackNav from './navigate/stackNav';
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
enableScreens(false);

export default function App() {
  
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    onFetchUpdateAsync()
  },[])

  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
