import React, { useState,useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { FIREBASE_TEXT_ID, setTextVal } from '../utils';
import { Logout } from '../store/ActionCreators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useSelector, useDispatch} from 'react-redux';
const TextField = () => {
    const [text,setText]=useState('Hello')
    const [inputText,setInputText]=useState(null)
    const doc = firestore().collection('Text').doc(FIREBASE_TEXT_ID);
    const dispatch = useDispatch();
    const logout = status => dispatch(Logout(status));
    const deleteUser = async () => {
      console.log('Inside Delete User');
      try {
        await AsyncStorage.removeItem('uid');
        await AsyncStorage.removeItem('email');
      } catch (e) {
        // saving error
        console.log('Error', e);
      }
    };
    useEffect(() => {
        const subscriber = doc.onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
            setText( documentSnapshot.data().Text)
          });
    
        return () => subscriber();
      }, []);

    return (
        <View style={{alignSelf:'center',justifyContent:'center',flex:1,width:Dimensions.get('screen').width,alignItems:'center'}}>
            <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:32}}>{text}</Text>
            </View>
            <View style={{flex:1,justifyContent:'flex-start'}}>
           <TextInput style={{width:Dimensions.get('screen').width*0.80,backgroundColor:'#fffff2',padding:10,paddingHorizontal:20,height:Dimensions.get('screen').height*0.08,borderRadius:14,fontSize:18,color:'black'}} placeholderTextColor={'gray'} placeholder={text} onChangeText={(val)=>setInputText(val)}/>
            <TouchableOpacity style={{marginTop:20,alignSelf:'center',width:Dimensions.get('screen').width*.40,backgroundColor:'cyan',height:Dimensions.get('screen').height*0.06,alignItems:'center',justifyContent:'center',borderRadius:14,}} onPress={()=>setTextVal(inputText)}><Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Submit</Text></TouchableOpacity>
            <TouchableOpacity style={{marginTop:20,alignSelf:'center',width:Dimensions.get('screen').width*.40,backgroundColor:'cyan',height:Dimensions.get('screen').height*0.06,alignItems:'center',justifyContent:'center',borderRadius:14,}} onPress={() => {
          logout(false);
          deleteUser();
        }}><Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Logout</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default TextField
