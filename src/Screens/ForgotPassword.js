import React,{useState} from 'react'
import { View, Text,TextInput,StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;


const ForgotPassword = ({navigation}) => {
    const [mail,setMail]=useState('')
    const forgotPassword = (mail) => {
        console.log('Email',mail)
        auth().sendPasswordResetEmail(mail)
          .then(function (user) {
            alert('Password Reset Link is sent to your Email')
            navigation.navigate('Login')
          }).catch(function (e) {
              alert('Email is Invalid or Does not Exist')
            console.log(e)
          })
      } 
    return (
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
            <TextInput
            placeholder={'Email'}
            placeholderTextColor={'#999999'}
            
            onChangeText={text => setMail(text)}
            
            style={
             styles.activeInput
            }></TextInput>
            <TouchableOpacity
          style={{...styles.button,backgroundColor:'#b22342'}}
          onPress={()=>forgotPassword(mail)}
          
          >
          
          <Text style={{color: 'white', fontSize: 21, fontWeight: 'bold'}}>
            Send Reset Link
          </Text>
        </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    button: {
        backgroundColor: '#b22342',
        width: WIDTH * 0.65,
        alignSelf: 'center',
        justifyContent: 'center',
        height: HEIGHT * 0.08,
        alignItems: 'center',
        borderRadius: 10,
      },
      activeInput: {
        backgroundColor: '#fdcd84',
        width:WIDTH*0.80,
        height: HEIGHT * 0.08,
        marginVertical: 10,
        borderRadius: 15,
        paddingHorizontal: WIDTH * 0.1,
        fontSize: 20,
        color: 'black',
      },
})

export default ForgotPassword
