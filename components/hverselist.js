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
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
  BackHandler
  } from "react-native";
import { useEffect } from "react";
import {useCallback, useRef } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import chplist from "../chplist.json";
import {RFValue} from "react-native-responsive-fontsize";
const {width,height} = Dimensions.get('window')
var value = []
const Hverse1=(data)=>{ 
  var chpid = parseInt(data.data1)
  var cid1 = data.data
  const[chps,setChps] = useState(chplist[0][chpid])
  const[cid,setCid] = useState(cid1)
  const[rerender, setRerender] = useState(true)
  const[refreshing,setRefreshing] = useState(false); 
  const[zIndex,setZindex]=useState(0);
  var flatListRef = React.useRef<FlatList>(null);   
  useEffect(()=>{
    flatListRef.scrollToIndex({index : cid})
    for(i in chps){
      if(chps[i].id == cid){
        AsyncStorage.setItem('Recent',JSON.stringify(chps[i]))
      }
    }
  },[cid])


  const renderItem =useCallback((item)=>{
    var bookmark = "bookmark-outline"
    for(i in value){
      if(value[i].id == item.item.id && value[i].chp == item.item.chp){
        bookmark = "bookmark"
      }
    }
    
    if(item.item.id > 0){return(
      <View style={[styles.card]}>
      <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
      <Text> </Text>
      <TouchableOpacity 
        onPress={()=>{
          var status = "added"
          for(i in value){
            if(value[i].id == item.item.id && value[i].chp == item.item.chp){
              value.splice(i,1)
              status = "removed"
            }
          }   

          if(status === "added"){
            value.push(item.item)
          }
          
          for(var j = 0;j<(value.length - 1);j++){
            for(var k = 0;k<(value.length - j - 1);k++){
              if(parseInt(value[k].chp) > parseInt(value[k+1].chp)){
                var temp = value[k]
                value[k] = value[k+1]
                value[k+1] = temp
              }
              else if(parseInt(value[k].chp) == parseInt(value[k+1].chp)){
                if(parseInt(value[k].id) > parseInt(value[k+1].id)){
                  var temp = value[k]
                  value[k] = value[k+1]
                  value[k+1] = temp
                }
              }
            }
          }
          AsyncStorage.setItem('BookMark',JSON.stringify(value))
          setRerender(!rerender)  
        }}
        style={{alignSelf:"flex-end",marginTop:RFValue(20),position:"absolute",zIndex:1}} >
        <Ionicons name = {bookmark} style={styles.subText1} ></Ionicons>
      </TouchableOpacity>
      <Text style={[styles.subText,{fontSize:RFValue(17.5)}]}>
        Chapter {item.item.chp} Verse {item.item.data.verno}
      </Text>
      <Text> </Text>
      <Text style={styles.subText}>{item.item.data.shlok}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{fontSize:RFValue(17)}]}>
        Transliteration
        </Text>
        <Text> </Text>
      <Text style={styles.subText}>{item.item.data.translit}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{fontSize:RFValue(17)}]}>
        Synonyms
        </Text>
        <Text> </Text>
      <Text style={styles.subText}>{item.item.data.synonyms}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{fontSize:RFValue(17)}]}>
        Translation
        </Text>
        <Text> </Text>
      <Text style={styles.subText}>{item.item.data.translate}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{fontSize:RFValue(17)}]}>
        Purport
        </Text>
        <Text> </Text>
      <Text style={styles.subText}>{item.item.data.purport}</Text>
      <Text> </Text>
      <Text> </Text>
      </ScrollView>
      </View>
    );}
    else{
      return(
        <View style={{height:height,width:width,justifyContent:"center",alignItems:"center"}}>
          <Text style={[styles.subText,{fontSize:RFValue(20)}]}>Chapter {item.item.chp}</Text>
          <Text style={[styles.subText,{fontSize:RFValue(20)}]}> {item.item.name} </Text>
          <TouchableOpacity onPress={loadMorePrevious} style={{display : item.item.chp == 1 ? "none" : "flex"}} >
            <Text style={[styles.subText,{fontSize:RFValue(20)}]}>Previous Chapter </Text>
          </TouchableOpacity>
        </View>
      )  
    }
  },[rerender])

  const ListFooterComponent =useCallback(()=>{
    return(
      <View style={{height:height,width:width,justifyContent:"center",alignItems:"center"}}>
        <Text style={[styles.subText,{fontSize:RFValue(20)}]}>Thus Ends Bhagavad Gita</Text>
        <Text style={[styles.subText,{fontSize:RFValue(20)}]}>Chapter {chpid}</Text>
        <Text> </Text>
        <TouchableOpacity onPress={loadMore} style={{display : chpid == 18 ? "none" : "flex"}} >
          <Text style={[styles.subText,{fontSize:RFValue(20)}]}>Next Chapter </Text>
        </TouchableOpacity>
      </View>
    )
  },[chpid])

  const loadMore =useCallback(()=>{
    setZindex(2)
    setRefreshing(true)
    setTimeout(()=>{
      setChps(chplist[0][`${parseInt(chpid)+1}`])
      chpid += 1
      setCid(1)
      setCid(0)
      setRefreshing(false)
      setZindex(0)
    },0)
  },[])
  
  const loadMorePrevious = useCallback(()=>{
    setZindex(2)
    setRefreshing(true)
    setTimeout(()=>{
      setChps(chplist[0][`${parseInt(chpid)-1}`])
      chpid -= 1
      setCid((chplist[0][`${chpid}`]).length-1)
      setRefreshing(false)
      setZindex(0)
    },0)
  },[])

  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spinDeg = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });


  return(
    <View style={styles.droidSafeArea}>
    <View style={{height:height,display:"flex",width:width,position:"absolute",zIndex:zIndex}}>
      <ImageBackground source={require("./OIP2.jpg")} style={{height:height,width:width,justifyContent:"center",alignItems:"center"}} resizeMode="stretch">
        <Animated.Image source={require("./morPankh1.png")} style={{marginTop:RFValue(70),width:210,height:210,transform: [{rotate: spinDeg,},{scaleX:1}]}} />
        <View style={{position:"absolute",fontWeight:"bold",width:width,height:height}}>
          <Text style={{fontSize:RFValue(25),color:"white",margin:RFValue(10),textAlign:"right",}}>
            Loading...  
          </Text></View>
      </ImageBackground>
    </View>
    <ImageBackground source={require("./OIP4.jpg")} style={{height:height}} resizeMode="stretch">
    <FlatList
      ref={ref =>(flatListRef = ref)}
      data={chps}
      renderItem={renderItem}
      style={{zIndex:1,backgroundColor:"rgba(213, 213, 213 , 0.4)"}}
      horizontal={true}
      ListFooterComponent={ListFooterComponent}
      showsHorizontalScrollIndicator={false}
      keyExtractor={useCallback(item=>(item.id))}
      pagingEnabled
      initialNumToRender={0}
      maxToRenderPerBatch={80}
      updateCellsBatchingPeriod={3}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          const currentVerse = viewableItems[0].item;
          AsyncStorage.setItem('Recent',JSON.stringify(currentVerse))
        }
      }}
      viewabilityConfig={{itemVisiblePercentThreshold:100,}}
      bounces={false}
      refreshing={refreshing}
      getItemLayout={(data,index)=>({length : width , offset:width*index , index})}
        />
      </ImageBackground>
    </View>
  )
}

export default class Hverse extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      info : null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('BookMark').then((value) => {
        if (value) {
            const data = JSON.parse(value);
            this.setState({info : data});
        }
        else{
          this.setState({info : []});
        }
    });
  }

  render(){
    value = this.state.info
    const cid1 = this.props.route.params.cid
    const chpid1 = this.props.route.params.chpid
    const chpname1 = this.props.route.params.chpname
    return(
      <Hverse1 data={cid1} data1={chpid1} data2={chpname1} />
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color:"white",
    fontSize:RFValue(25),
    fontFamily:"sans-serif-medium"
  },
  subText1:{
    color:"rgba(0, 0, 0 , 1)",
    fontSize:RFValue(30),
    fontWeight:"Bold",
    textAlign :"right",
    marginRight:RFValue(10),
    alignSelf:"flex-end"
  },
  subText:{
    color:"rgba(0, 0, 0 , 1)",
    fontSize:RFValue(16),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(10),
    textAlign :"center",
    textShadowColor:"white",
    elevation:10,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    height:"100%",width:width,backgroundColor: "white"
  },
  card:{
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
  },
})