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
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import chplist from "../chplist.json";
import { useNavigation } from '@react-navigation/native';
import {RFValue} from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
const {width,height} = Dimensions.get('window')
var addFactor = 0
var mainHeight = height-width
if(mainHeight>300){addFactor = height*0.09}
if(mainHeight>400){addFactor = height*0.065}
if(mainHeight<300){addFactor = height*0.09}

const BookMark=()=>{
  const { navigate } = useNavigation();
    
  const[data,setData] = useState(null)

  

  async function getData(){
    setData(JSON.parse(await AsyncStorage.getItem('BookMark')))
  }
    useEffect(()=>{
      getData()
    },[])
    
      const renderItem =(item)=>{
        return(
          <TouchableOpacity style={styles.card} 
          onPress={()=>{navigate("Hverse1",{cid:item.item.id ,chpid : item.item.chp , chpname : item.item.name})}}>
            <View style={styles.main}>
            <View style={styles.sub}>
              <Text style={styles.subText}>Chapter {item.item.chp} Verse {item.item.data.verno}</Text>
              <Text style={styles.subText}>{item.item.data.shlok}</Text>
            </View>
            </View>
          </TouchableOpacity>
        )
       }

      if(data!=null && data.length != 0){
      return(
        <View style={styles.droidSafeArea}>
        <View style={styles.mainHeader}>
         <Text style={{textAlign:"center",color:"white",fontSize:RFValue(15),marginLeft:RFValue(10),fontWeight:"bold"}}>Bookmarks</Text>
        </View>
        <ImageBackground source={require("./KVR2.jpg")} resizeMode="stretch" style={{height:height}}>
        <FlatList
            data={data}
            style={{height:"auto",backgroundColor:"#",width:"100%",borderColor:"grey",borderWidth:RFValue(1),borderTopWidth:RFValue(0),}}
            renderItem={renderItem}
            ListFooterComponent={()=>{
              return(
                <View style={{height:(mainHeight*0.12) + addFactor}} ></View>
              )
            }}
            keyExtractor={item => `${item.chp}.${item.id}`}
            bounces={false}
            initialNumToRender={20}
            />
        </ImageBackground>
        </View>
      )}
      else{
        return(
          <View style={styles.droidSafeArea}>
          <View style={styles.mainHeader}>
          <Text style={{textAlign:"center",color:"white",fontSize:RFValue(15),marginLeft:RFValue(10),fontWeight:"bold"}}>Bookmarks</Text>
          </View>
          <ImageBackground source={require("./KVR1.jpg")} resizeMode="stretch" style={{height:height}}>
          <View style = {styles.main1} >
              <View style = {styles.sub} >
                <Text> </Text>
                <Text style = {styles.subText} > You Have Not Added Any Bookmarks Yet </Text>
              </View>
            </View>
          </ImageBackground>
          </View>
        )
      }

}

export default class BookMark1 extends React.Component{  
  render(){
    return(
      <BookMark/>
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
  subText1:{
    color:"#E2E2E2",
    fontSize:RFValue(12),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(8),
    textAlign :"center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    height:"auto",width:"100%",backgroundColor:"white"
  },
  card:{
    borderWidth:RFValue(1),
    backgroundColor: "rgba(73, 73, 73 ,0.5)",
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
    width:"95%",
  },
  main1:{
    textAlign:"center",
    alignItems:"center",
    width:"100%",
    height : "100%",
    backgroundColor: "rgba(73, 73, 73 ,0.4)",

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