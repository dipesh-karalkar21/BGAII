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
  } from "react-native";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import BGDATA from "../BGDATA.json";
import {RFValue} from "react-native-responsive-fontsize";
const {width,height} = Dimensions.get('window')
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
      <View style={styles.card}>
      <ScrollView contentContainerStyle={parseInt(BGDATA.length/2)<item.item.id ? styles.main : styles.main2}>
      <Text> </Text>
      <Text style={styles.subText}>Chapter {item.item.chp} Verse {item.item.data.verno}</Text>
      <Text style={styles.hr}> </Text>
      <Text style={styles.subText}>{item.item.data.shlok}</Text>
      <Text> </Text>
      <Text style={styles.subText}>Transliteration</Text>
      <Text style={styles.hr} > </Text>
      <Text style={styles.subText}>{item.item.data.translit}</Text>
      <Text> </Text>
      <Text style={styles.subText}>Synonyms</Text>
      <Text style={styles.hr}> </Text>
      <Text style={styles.subText}>{item.item.data.synonyms}</Text>
      <Text> </Text>
      <Text style={styles.subText}>Translation</Text>
      <Text style={styles.hr}> </Text>
      <Text style={styles.subText}>{item.item.data.translate}</Text>
      <Text> </Text>
      <Text style={styles.subText}>Purport</Text>
      <Text style={styles.hr}> </Text>
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
      <FlatList
        ref={ref =>(this.flatListRef = ref)}
        data={BGDATA}
        renderItem={this.renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item=>(item.id)}
        bounces={false}
        getItemLayout={(data,index)=>({length : width , offset:width*index , index})}
          />
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
    textAlign :"center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  card:{
    backgroundColor: "#1D1D1D",
    width:width,
    justifyContent:"center",
    alignItems:"center"
  },
  main:{
    backgroundColor: "#1D1D1D",
    width:"100%",
    paddingRight : RFValue(10)
  },
  main2:{
    backgroundColor: "#1D1D1D",
    width:"100%",
  },
  hr:{
    width : RFValue(120),
    height:RFValue(5),
    backgroundColor:"#ff7722",
    borderRadius:RFValue(50),
    alignSelf:"center"
  },
  mainHeader:{
    height:RFValue(65),
    backgroundColor:"#424242",
    alignItems:"center",
    flexDirection:"row"
  }
})