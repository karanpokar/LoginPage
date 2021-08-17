import React,{useEffect,useState} from 'react'
import { View, Text,Modal, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from './Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Camera from './Camera'
import firestore from '@react-native-firebase/firestore';
import {connect, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextField from './TextField';
import Calculator from './Calculator';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import functions from '@react-native-firebase/functions';

const requestUserPermission = async () => {

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
     console.log(fcmToken);
     //console.log("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken() //<---- Add this
    //console.log('Authorization status:', authStatus);
  }
}



 


const Notifications=()=>{
  const [token,setToken]=useState('')
    getFcmToken = async () => {
      await messaging().getToken().then((tkn)=>{setToken(tkn)})
      if (token) {
       //console.log('FCMToken',token);
       
       //console.log("Your Firebase Token is:", fcmToken);
      } else {
       console.log("Failed", "No token received");
      }
    }
    getFcmToken()
  const getVal=async (token)=>{
    //console.log('Function Token',token)
    await functions()
      .httpsCallable('sendNotification')(token)
      .then(response => {
          console.log('Response',response)
      }).catch((error)=>console.log('Error',error))
    }
    return(
        <View style={{flex:1,justifyContent:'center'}}><TouchableOpacity style={{alignItems:'center',justifyContent:'center',alignSelf:'center',width:150,height:60,backgroundColor:'red',borderRadius:20,elevation:6}} onPress={()=>getVal(token)}><Text>Send Notification</Text></TouchableOpacity></View>
    )
}


const text=()=>{
    return(
        <View></View>
    )
}



const Tab=createMaterialBottomTabNavigator()

export default function Dashboard() {

  const [visibleNotification,setVisibleNotification]=useState(false)
  const [message,setMessage]=useState('')
  useEffect(() => {
    requestUserPermission();
   }, []);
   useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setVisibleNotification(true)
      setMessage(remoteMessage.notification.body)
      setTimeout(() => {
        setVisibleNotification(false)
      }, 4000);
      //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.notification.body));
    });
    return unsubscribe;
   }, []);
    return (
<>
<Modal transparent={true} visible={visibleNotification} animationType={"fade"}>
  <TouchableOpacity onPress={()=>setVisibleNotification(false)} style={{height:100,width:Dimensions.get('screen').width-20,padding:15,backgroundColor:'lightblue',margin:20,borderRadius:10,alignSelf:'center'}}>
    <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{message}</Text>
    <Text style={{color:'black',fontSize:18}}>{message}</Text>
  </TouchableOpacity>
</Modal>
      <NavigationContainer independent={true} >

        <Tab.Navigator initialRouteName="Text"
      activeColor="darkblue"
      inactiveColor='grey'
      barStyle={{ backgroundColor: 'white' }}>
          <Tab.Screen
        name="Text"
        component={TextField}
        options={{
          tabBarLabel: 'Text',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="note" color={color} size={26} />
          ),
        }}
      />
          <Tab.Screen name="Photo" component={Camera}  options={{
          tabBarLabel: 'Photo',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera-image" color={color} size={26} />
          ),
        }}/>
        
       <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          tabBarLabel: 'Calculator',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calculator-variant" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />

        </Tab.Navigator>
      </NavigationContainer>
      </>
    );
  }


