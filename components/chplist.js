import * as React from "react";
import {
  View , 
  Text , 
  ImageBackground,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  } from "react-native";
import CHPDATA from "../chp.json";
import { useRef } from "react";
import { useRoute } from "@react-navigation/native"
import {RFValue} from "react-native-responsive-fontsize";
export default class Chplist extends React.Component{

  renderItem =(item)=>{
    return(
    <TouchableOpacity style={styles.card} onPress={()=>{this.props.navigation.navigate("Verse",{chid : item.item.id})}}>
      <View style={styles.main}>
      <View style={styles.sub}>
        <Text style={styles.text}>{item.item.id}</Text>
        <Text style={styles.subText}>{item.item.name}</Text>
      </View>
      </View>
    </TouchableOpacity>
    )
  }

  render(){
    return(
      <View style={{height:"100%",width:"100%"}}>
      <ImageBackground source={require("./MV.jpg")} style={{width: Dimensions.get('window').width,height:"100%"}}>
      <FlatList
          data={CHPDATA}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          bounces={false}
          />
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color:"black",
    fontSize:RFValue(25),
    fontFamily:"sans-serif-medium"
  },
  subText:{
    color:"black",
    fontSize:RFValue(12),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(10),
    textAlign :"center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  card:{
    borderWidth:RFValue(1),
    backgroundColor: "#CBCBCB",
    borderRadius: RFValue(0),
    width:"100%",
    height:RFValue(100),
    justifyContent:"center",
    alignSelf:"center",
    margin:RFValue(13),
    marginBottom : 0,
    marginTop:0,
    opacity:0.7
  },
  sub:{
    flexDirection:"row",
    justifyContent:"space-around"
  },
  main:{
    margin:RFValue(10),
    textAlign:"center",
    alignItems:"center",
  },
})