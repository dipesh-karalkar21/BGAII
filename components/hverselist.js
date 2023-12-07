import * as React from "react";
import {
  View , 
  Text , 
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image
  } from "react-native";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import BGDATA from "../BGDATA.json";
import {RFValue} from "react-native-responsive-fontsize";
const {width,height} = Dimensions.get('window')
var dataLength = BGDATA.length
export default class Hverse extends React.Component{

flatListRef = React.useRef<FlatList>(null);

constructor(props){
    super(props)
    this.cid1 = this.props.route.params.cid
} ;


  componentDidMount(){
    //const cid2 = Platform.OS === "android" ? this.cid1 - 1 : this.cid1
    const cid2 = this.cid1 - 1 
    console.log(cid2)
    this.flatListRef.scrollToIndex({index : cid2})
  }

  renderItem =(item)=>{
    return(
      <View style={[styles.card]}>
      <ScrollView contentContainerStyle={styles.main}>
      <Text> </Text>
      <Text style={[styles.subText,{color:"orange",fontSize:RFValue(17.5)}]}>
        Chapter {item.item.chp} Verse {item.item.data.verno}
       </Text>
      <Text> </Text>
      <Text style={styles.subText}>{item.item.data.shlok}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{color:"orange",fontSize:RFValue(15)}]}>
        Transliteration
        </Text>
      <Text style={styles.subText}>{item.item.data.translit}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{color:"orange",fontSize:RFValue(15)}]}>
        Synonyms
        </Text>
      <Text style={styles.subText}>{item.item.data.synonyms}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{color:"orange",fontSize:RFValue(15)}]}>
        Translation
        </Text>
      <Text style={styles.subText}>{item.item.data.translate}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{color:"orange",fontSize:RFValue(15)}]}>
        Purport
        </Text>
      <Text style={styles.subText}>{item.item.data.purport}</Text>
      <Text> </Text>
      </ScrollView>
      </View>
    )
  }


  render(){ 
    return(
      <View style={{height:"100%",width:width,backgroundColor: "white"}}>
      <SafeAreaView style={styles.droidSafeArea} />
      <ImageBackground source={require("./OIP.jpeg")} style={{width: width,height:height}}>
      <FlatList
        ref={ref =>(this.flatListRef = ref)}
        data={BGDATA}
        renderItem={this.renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item=>(item.id)}
        pagingEnabled
        bounces={false}
        getItemLayout={(data,index)=>({length : width , offset:width*index , index})}
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
    marginRight:RFValue(10),
    textAlign :"center",
    elevation:10
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  card:{
    backgroundColor: "rgba(61, 61, 61 , 0.4)",
    width:width,
    justifyContent:"center",
    alignItems:"center",
  },
  main:{
    width:"100%",
  },
  main2:{
    width:"100%",
  },
  hr:{
    width : RFValue(120),
    height:RFValue(5),
    backgroundColor:"#ff7722",
    borderRadius:RFValue(50),
    alignSelf:"center"
  },
})