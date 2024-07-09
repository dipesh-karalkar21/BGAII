import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {StatusBar, SafeAreaView , StyleSheet ,Platform} from "react-native-web";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Hverse from "../components/hverselist";
import Chplist from "../components/chplist";
import Verselist from "../components/verselist";
import { Ionicons } from "@expo/vector-icons";
import Bookmark1 from "../components/bookmark";
import Bookmark from "../components/bookmark";
import { View } from "react-native";
import { useState , useEffect } from "react";
const Tab  = createBottomTabNavigator()

export default function HomeNav(){
    return(
      <Tab.Navigator >
        <Tab.Screen name = "Main" component = {Chplist} options={{headerShown: false,unmountOnBlur:true,tabBarStyle:{display:"none"}}}/>
        <Tab.Screen name = "Hverse2" component = {Hverse} options={{headerShown: false,unmountOnBlur:true,tabBarStyle:{display:"none"}}}/>
      </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
})