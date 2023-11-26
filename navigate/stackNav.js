import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {StatusBar, SafeAreaView , StyleSheet ,Platform} from "react-native-web";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Hverse from "../components/hverselist";
import Chplist from "../components/chplist";
import Verselist from "../components/verselist";
import { View } from "react-native";
const Stack  = createNativeStackNavigator();

export default class StackNav extends React.Component{
  render(){
    return(
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {Chplist} options={{headerShown: false}}/>
        <Stack.Screen name = "Verse" component = {Verselist} options={{headerShown: false}}/>
        <Stack.Screen name = "Hverse" component = {Hverse} options={{headerShown: false}}/>
      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
})