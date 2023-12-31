import * as React from "react";
import {
  View , 
  Text , 
  ImageBackground,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions
  } from "react-native";
import { useRoute } from "@react-navigation/native";
import chplist from "../chplist.json"
import {RFValue} from "react-native-responsive-fontsize";
const {width,height} = Dimensions.get('window')
var addFactor = 0
var mainHeight = height-width
if(mainHeight>300){addFactor = height*0.09}
if(mainHeight>400){addFactor = height*0.065}
if(mainHeight<300){addFactor = height*0.09}
export default class Verselist extends React.Component{


  renderItem =(item)=>{
    if(item.item.id > 0){return(
      <TouchableOpacity style={styles.card} 
      onPress={()=>{this.props.navigation.navigate("Hverse",{cid:item.item.id ,chpid : item.item.chp , chpname : item.item.name})}}>
        <View style={styles.main}>
        <View style={styles.sub}>
          <Text style={styles.subText}>{item.item.data.verno}</Text>
          <Text style={styles.subText}>{item.item.data.shlok}</Text>
        </View>
        </View>
      </TouchableOpacity>
    )}
  }


  render(){
    var chpid = this.props.route.params.chid
    var chpid1 = chpid < 10 ? "0"+chpid : chpid
    var main = chplist[0][chpid]
    var chpogname = this.props.route.params.chogname
    return(
      <View style={{height:"auto",width:"100%",backgroundColor:"white"}}>
      <SafeAreaView style={styles.droidSafeArea} />
      <View style={styles.mainHeader}>
       <Text style={{textAlign:"center",color:"white",fontSize:RFValue(15),marginLeft:RFValue(10),fontWeight:"bold"}}>Chapter {chpid1} : {chpogname} </Text>
      </View>
      <ImageBackground source={require("./KVR1.jpg")} resizeMode="stretch" style={{height:height}}>
      <FlatList
          data={main}
          style={{height:"auto",backgroundColor:"#",width:"100%",borderColor:"grey",borderWidth:RFValue(1),borderTopWidth:RFValue(0),}}
          renderItem={this.renderItem}
          ListFooterComponent={()=>{
            return(
              <View style={{height:(mainHeight*0.12) + addFactor}} ></View>
            )
          }}
          keyExtractor={item => item.id}
          bounces={false}
          initialNumToRender={20}
          />
      </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color:"white",
    fontSize:RFValue(25),
    fontFamily:"sans-serif-medium"
  },
  subText:{
    color:"white",
    fontSize:RFValue(12),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(8),
    textAlign :"center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  card:{
    borderWidth:RFValue(1),
    backgroundColor: "rgba(73, 73, 73 ,0.4)",
    borderRadius: RFValue(0),
    width:"95%",
    justifyContent:"center",
    alignSelf:"center",
    margin:RFValue(13),
    marginBottom : RFValue(5),
    marginTop:RFValue(5),
    borderRadius:RFValue(10),
    borderColor:"black",
    height:"auto"
  },
  sub:{
    flexDirection:"column",
    width:"100%",
  },
  main:{
    margin:RFValue(10),
    textAlign:"center",
    alignItems:"center",
    width:"95%"
  },
  mainHeader:{
    height:RFValue(65),
    backgroundColor:"#424242",
    alignItems:"center",
    flexDirection:"row",
    borderColor:"grey",
    borderTopColor:"grey",
    borderWidth:RFValue(1),
    width:width,
    justifyContent:"space-evenly"
  }
})