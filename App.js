import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Hverse from "./components/hverselist"
import Chplist from './components/chplist';
import StackNav from './navigate/stackNav';
import { NavigationContainer } from "@react-navigation/native";
export default function App() {

  //console.log(BGDATA[0].id)aaa
  
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
