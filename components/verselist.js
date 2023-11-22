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
    console.log(item)
    return(
      <TouchableOpacity style={styles.card} onPress={()=>{this.props.navigation.navigate("Hverse",{cid:item.item.id})}}>
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
    var main = chplist[0][chpid]
    console.log(main)
    return(
      <View style={{height:"100%",width:"100%"}}>
      <SafeAreaView style={styles.droidSafeArea} />
      <ImageBackground source={require("./KVR.jpg")} style={{height:"100%",width:Dimensions.get('window').width,}}>
      <FlatList
          data={main}
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