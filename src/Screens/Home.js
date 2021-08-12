import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Logout} from '../store/ActionCreators';
const Home = () => {
  const [email, setEmail] = React.useState('XYZ');
  const getData = async () => {
    try {
      //      console.log('InsideuseEffect');
      const value = await AsyncStorage.getItem('email');
      console.log('Value', value);
      if (value == null) {
        console.log('Key Not found');
      } else {
        setEmail(value);
      }
    } catch (e) {
      console.log('Error', e);
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          alignSelf: 'center',
          marginBottom: 20,
        }}>
        {email}
      </Text>
      <TouchableOpacity
        onPress={() => {
          logout(false);
          deleteUser();
        }}
        style={{
          height: Dimensions.get('screen').height * 0.07,
          alignSelf: 'center',
          backgroundColor: 'darkblue',
          borderRadius: 21,
          width: Dimensions.get('screen').width * 0.3,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
