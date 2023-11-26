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
export default class Verselist extends React.Component{


  renderItem =(item)=>{
    return(
      <TouchableOpacity style={item.item.id == "1" ? styles.card1 : styles.card} 
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
    var chpname = this.props.route.params.chname
    var chpogname = this.props.route.params.chogname
    return(
      <View style={{height:"100%",width:"100%",backgroundColor:"white"}}>
      <SafeAreaView style={styles.droidSafeArea} />
      <View style={styles.mainHeader}>
        <Text style={{textAlign:"left",color:"white",fontSize:RFValue(15),marginLeft:RFValue(10),fontWeight:"bold"}}>Chapter {chpid1} : {chpogname} </Text>
      </View>
      <ImageBackground source={require("./KVR.jpg")} style={{height:"100%",width:Dimensions.get('window').width,}}>
      <FlatList
          data={main}
          style={{opacity:0.7,backgroundColor:"#1D1D1D",width:"100%",marginBottom:RFValue(65)}}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          bounces={false}
          />
      <Text style={{height:RFValue(30)}}> </Text>
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
    borderColor:"white"
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
    flexDirection:"row"
  }
})