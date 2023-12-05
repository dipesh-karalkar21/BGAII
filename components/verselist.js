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
import BGDATA from "../BGDATA.json";
import chplist from "../chplist.json"
import {RFValue} from "react-native-responsive-fontsize";
const {width,height} = Dimensions.get('window')
var addFactor = 0
if(height>820){addFactor = (height - 820)*0.26}
if(height<820){addFactor = (820 - height)*0.25}
var mainHeight = 820
export default class Verselist extends React.Component{


  renderItem =(item)=>{
    var style1 = item.item.id == "1" ? styles.card1 : styles.card
    var style2 = item.item.id == "18" ? styles.card2 : style1
    return(
      <TouchableOpacity style={style2} 
      onPress={()=>{this.props.navigation.navigate("Hverse",{cid:item.item.id})}}>
        <View style={styles.main}>
        <View style={styles.sub}>
          <Text style={styles.subText}>{item.item.data.verno}</Text>
          <Text style={styles.subText}>{item.item.data.shlok}</Text>
        </View>
        </View>
      </TouchableOpacity>
    )
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
        <Text style={{textAlign:"left",color:"white",fontSize:RFValue(15),marginLeft:RFValue(10),fontWeight:"bold"}}>Chapter {chpid1} : {chpogname} </Text>
      </View>
      <ImageBackground source={require("./KVR.jpg")} style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width,}}>
      <FlatList
          data={main}
          style={{opacity:0.7,height:"auto",backgroundColor:"#1D1D1D",width:"100%",borderColor:"white",borderWidth:RFValue(1),borderTopWidth:RFValue(0),
          marginBottom:(mainHeight*0.085) + addFactor}}
          renderItem={this.renderItem}
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
    backgroundColor: "#323232",
    borderRadius: RFValue(0),
    width:"95%",
    justifyContent:"center",
    alignSelf:"center",
    margin:RFValue(13),
    marginBottom : RFValue(5),
    marginTop:RFValue(5),
    borderRadius:RFValue(10),
    borderColor:"white",
    height:"auto"
  },
  card2:{
    borderWidth:RFValue(1),
    backgroundColor: "#323232",
    borderRadius: RFValue(0),
    width:"95%",
    height:RFValue(75),
    justifyContent:"center",
    alignSelf:"center",
    margin:RFValue(13),
    marginBottom : StatusBar.currentHeight,
    marginTop:RFValue(5),
    borderRadius:RFValue(10),
    borderColor:"white"
  },
  card1:{
    borderWidth:RFValue(1),
    backgroundColor: "#323232",
    borderRadius: RFValue(0),
    width:"95%",
    justifyContent:"center",
    alignSelf:"center",
    margin:RFValue(13),
    marginBottom : RFValue(5),
    marginTop:RFValue(10),
    borderRadius:RFValue(10),
    borderColor:"white",
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
    borderColor:"white",
    borderTopColor:"black",
    borderWidth:RFValue(1),
    width:"100%"
  }
})