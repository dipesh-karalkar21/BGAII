import * as React from "react";
import {
  View , 
  Text , 
  ImageBackground,
  Image,
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
import { useFonts } from "expo-font";
import { useRoute } from "@react-navigation/native";
import {RFValue} from "react-native-responsive-fontsize";
import * as SplashScreen from 'expo-splash-screen';
export default class Chplist extends React.Component{

  renderItem =(item)=>{
    var id = item.item.id < 10 ? "0"+item.item.id : item.item.id
    return(
    <TouchableOpacity style={item.item.id == "1" ? styles.card1 : styles.card} 
      onPress={()=>{this.props.navigation.navigate("Verse",
        {
          chid : item.item.id,
          chname:item.item.name,
          chogname:item.item.ogname,
        })}}>
      <View style={styles.main}>
      <View style={styles.sub}>
        <Text style={styles.text}>{id}</Text>
        <View style={styles.innerView}>
        <Text style={styles.subText}>{item.item.name}</Text>
        <Text style={styles.subText}>{item.item.ogname}</Text>
        </View>
      </View>
      </View>
    </TouchableOpacity>
    )
  }

  render(){
    return(
      <View style={{height:"100%",width:"100%",backgroundColor:"white"}}>
      <SafeAreaView style={styles.droidSafeArea} />
      <View style={styles.mainHeader}>
        <Image source={require("./BG.png")} style={{height:RFValue(160),width:RFValue(310),marginTop:RFValue(10),marginRight:RFValue(20)}}></Image>
      </View>
      <ImageBackground source={require("./MV.jpg")} style={{width: Dimensions.get('window').width,height:"100%"}}>
      <FlatList
          data={CHPDATA}
          style={{opacity:0.7,backgroundColor:"#1D1D1D",marginBottom:RFValue(105)}}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          bounces={false} />
      </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color:"white",
    fontSize:RFValue(20),
    marginLeft:RFValue(10),
    marginTop:RFValue(10),
  },
  subText:{
    color:"white",
    fontSize:RFValue(12),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(5),
    textAlign :"left",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  card:{
    borderWidth:RFValue(1),
    backgroundColor: "#323232",
    borderRadius: RFValue(0),
    width:"95%",
    height:RFValue(75),
    justifyContent:"center",
    alignSelf:"center",
    margin:RFValue(13),
    marginBottom : RFValue(5),
    marginTop:RFValue(5),
    borderRadius:RFValue(10),
    borderColor:"white"
  },
  card1:{
    borderWidth:RFValue(1),
    backgroundColor: "#323232",
    borderRadius: RFValue(0),
    width:"95%",
    height:RFValue(75),
    justifyContent:"center",
    alignSelf:"center",
    margin:RFValue(13),
    marginBottom : RFValue(5),
    marginTop:RFValue(10),
    borderRadius:RFValue(10),
    borderColor:"white"
  },
  sub:{
    display:"flex",
    flexDirection:"row",
    width:"100%"
  },
  main:{
    verticalAlign:"top",
    textAlignVertical:"top",
    height:"100%",
    width:"95%"
  },
  innerView:{
    marginTop:RFValue(10),
    marginRight:RFValue(5),
  },
  mainHeader:{
    height:RFValue(75),
    backgroundColor:"#424242",
    justifyContent:"center",
    alignItems:"center",
  },

})