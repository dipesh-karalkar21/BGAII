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
import BookNav from "./bookNav";
import { View } from "react-native";
import { useState , useEffect } from "react";
import HomeNav from "./homeNav";
const Tab  = createBottomTabNavigator()

export default function TabNav(){

    return(
      <Tab.Navigator>
        <Tab.Screen name = "Read" component = {HomeNav} options={{headerShown: false,unmountOnBlur:true,tabBarStyle:{display:"none"}}}/>
        <Tab.Screen name = "Bookmarks" component = {BookNav} options={{headerShown: false,unmountOnBlur:true,tabBarStyle:{display:"none"}}}/>
      </Tab.Navigator>
    )
  
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
})