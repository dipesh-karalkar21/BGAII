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
const {width,height} = Dimensions.get('window')
console.log(`${height},${width}`)
var addFactor = 0
if(height>819){addFactor = (height - 819)*0.26}
if(height<819){addFactor = (819 - height)*0.25}
var mainHeight = 819
export default class Chplist extends React.Component{

  renderItem =(item)=>{
    var id = item.item.id < 10 ? "0"+item.item.id : item.item.id
    var style1 = item.item.id == "1" ? styles.card1 : styles.card
    var style2 = item.item.id == "18" ? styles.card2 : style1
    return(
    <TouchableOpacity style={style2} 
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
      <View style={{height:"auto",width:"100%",backgroundColor:"white"}}>
      <SafeAreaView style={styles.droidSafeArea} />
      <View style={styles.mainHeader}>
        <Image source={require("./BG.png")} style={{height:RFValue(160),width:RFValue(310),marginTop:RFValue(10),marginRight:RFValue(20)}}></Image>
      </View>
      <ImageBackground source={require("./MV.jpg")} style={{width: width,height:height}}>
      <FlatList
          data={CHPDATA}
          style={{
            height:height,
            backgroundColor:"#",borderColor:"grey",borderWidth:RFValue(1),borderTopWidth:RFValue(0),borderBottomWidth:RFValue(1),
            marginBottom:(mainHeight*0.09) + addFactor
          }}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          bounces={false}
          showsVerticalScrollIndicator = {false} />
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
    backgroundColor: "rgba(73, 73, 73,0.4)",
    borderRadius: RFValue(0),
    width:"95%",
    height:RFValue(75),
    justifyContent:"center",
    alignSelf:"center",
    margin:RFValue(13),
    marginBottom : RFValue(5),
    marginTop:RFValue(5),
    borderRadius:RFValue(10),
    borderColor:"grey"
  },
  card1:{
    borderWidth:RFValue(1),
    backgroundColor: "rgba(73, 73, 73,0.4)",
    borderRadius: RFValue(0),
    width:"95%",
    height:RFValue(75),
    justifyContent:"center",
    alignSelf:"center",
    margin:RFValue(13),
    marginBottom : RFValue(5),
    marginTop:RFValue(10),
    borderRadius:RFValue(10),
    borderColor:"grey"
  },
  card2:{
    borderWidth:RFValue(1),
    backgroundColor: "rgba(73, 73, 73,0.4)",
    borderRadius: RFValue(0),
    width:"95%",
    height:RFValue(75),
    justifyContent:"center",
    alignSelf:"center",
    margin:RFValue(13),
    marginBottom : StatusBar.currentHeight,
    marginTop:RFValue(5),
    borderRadius:RFValue(10),
    borderColor:"grey"
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
    width:"100%",
    borderColor:"grey",
    borderTopColor:"grey",
    borderWidth:RFValue(1),
  },

})