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
const {width,height} = Dimensions.get('window')
var addFactor = 0
var mainHeight = height-width
if(mainHeight>300){addFactor = height*0.09}
if(mainHeight>400){addFactor = height*0.065}
if(mainHeight<300){addFactor = height*0.09}
console.log(`${mainHeight},${height},${addFactor}`)
export default class Chplist extends React.Component{

  renderItem =(item)=>{
    var id = item.item.id < 10 ? "0"+item.item.id : item.item.id
    return(
    <TouchableOpacity style={styles.card} 
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
      <View style={styles.mainHeader}>
        <Image source={require("./BGBG.png")} style={{height:RFValue(120),width:RFValue(240),marginBottom:RFValue(20),marginRight:RFValue(30)}}></Image>
      </View>
      <ImageBackground source={require("./MV1.jpg")} style={{height:height}} resizeMode="stretch" >
      <FlatList
          data={CHPDATA}
          style={{
            height:height,
            backgroundColor:"#",borderColor:"grey",borderWidth:RFValue(1),borderTopWidth:RFValue(0),borderBottomWidth:RFValue(1),}}
          renderItem={this.renderItem}
          ListFooterComponent={()=>{
            return(
              <View style={{height:(mainHeight*0.12) + addFactor}} ></View>
            )
          }}
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
    borderColor:"black"
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