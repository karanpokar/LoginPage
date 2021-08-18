import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');

const DATA = [
  {
    "key": "1",
    "title": "Upload Your Passion",
    "description": "",
    "image": require('../../Assets/Camera.png')
  },
  {
    "key": "2",
    "title": "Get Notified",
    "description": "",
    "image": require('../../Assets/Bell.png')
  },
  {
    "key": "3",
    "title": "Calculate your Worth",
    "description": "",
    "image": require('../../Assets/Calculator.png')
  },
  {
    "key": "5",
    "title": "Upload Your Passion",
    "description": "",
    "image": require('../../Assets/Camera.png')
  },
]

export default function App({navigation}) {
  const scrollX=React.useRef(new Animated.Value(0)).current;
  const Indicator=({scrollX})=>{
    return<View style={{flexDirection:'row',alignContent:'center',justifyContent:'center'}}>
    {DATA.map((_,i)=>{
      const inputRange=[(i-1)*width,i*width,(i+1)*width];
      const scale=scrollX.interpolate({
        inputRange,
        outputRange:[0.8,1.4,0.8],
        extrapolate:'clamp'
      })
      return <Animated.View 
      key={`indicator-${i}`}
      style={{height:5,width:18,borderRadius:10,backgroundColor:'#fff',margin:3.5, transform:[{
        scale,
      },]}}/>
    })}
    </View>
  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={{flex:0.7,marginBottom:Dimensions.get('screen').height*0.10}}>
      <Animated.FlatList
      data={DATA}
      keyExtractor={item=>item.key}
      horizontal={true}
      pagingEnabled
      scrollEventThrottle={32}
      onScroll={Animated.event(
        [
          {nativeEvent:{contentOffset:{x:scrollX}}}
        ],
        {useNativeDriver:false}
      )}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>{
        return <View style={{width,alignItems:'center',marginTop:-25,height:400,marginTop:-0}}>
        <View style={{justifyContent:'center',alignSelf:'center'}}>
        <Image source={item.image} style={{width:width/2, height:height/2, resizeMode:'contain'}}/>
        </View>
        <Text style={{marginTop:-50,fontSize:30,fontFamily:'Poppins',fontWeight:'bold',textAlign:'center',color:'#FFFFFF'}}>
        {item.title}</Text>
        <Text style={{fontSize:20,fontFamily:'Poppins',fontWeight:'bold',textAlign:'center',color:'#4F4F4F',marginHorizontal:20,marginTop:20}}>
        {item.description}</Text>
        </View>
      }
      }
      />
      <View style={{marginTop:40}}>
      <Indicator scrollX={scrollX} />
      </View>
      </View>
      <View style={{flex:0.3,flexDirection:'row', alignSelf:'center',marginTop:20}}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexWrap:'wrap',
    backgroundColor: '#222222',
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    width: Dimensions.get("screen").width * 0.6,
    backgroundColor: "cyan",
    height: Dimensions.get("screen").height * 0.08,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 18 },
});