import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Logout} from '../store/ActionCreators';
import axios from 'axios'
import CategoryCard from '../Components/CategoryCard';


const Home = ({navigation}) => {
  const [email, setEmail] = React.useState('XYZ');
  const [categories,setCategories]=React.useState([])
  const [category,setCategory]=React.useState('electronics')
  useEffect(()=>{
    const fetchCategories=async()=>{
      await axios.get('https://fakestoreapi.com/products/categories').then((res)=>{
        setCategories(res.data)
        console.log('Categories',JSON.stringify(res.data,null,2))
      }).catch((error)=>{
        console.log('Error while fetching Categoris',error)
      })
    }
    fetchCategories()
  },[])
  
//   useEffect(()=>{
//     const fetchCategoryData=async()=>{
//       await axios.get(`https://fakestoreapi.com/products/category/${category}`).then((res)=>{
// //        setCategories(res.data)
//         console.log('CategoryData Electroinics',JSON.stringify(res.data,null,2))
//       }).catch((error)=>{
//         console.log('Error while fetching Categoris',error)
//       })
//     }
//     fetchCategoryData()
//   },[category])

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
  console.log('Categories outside useEffect',categories)
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
  const renderItem = ({ item }) => (
   <TouchableOpacity onPress={()=>navigation.navigate('ProductList',{category:item})}>
   <CategoryCard name={item} selected={category==item?true:false}/>
   </TouchableOpacity>
  );
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
    <FlatList style={{flex:1}} data={categories}
    keyExtractor={(item)=>item}
    renderItem={renderItem}/>
    </View>
  );
};

export default Home;
