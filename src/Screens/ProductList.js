import React,{useState,useEffect} from 'react'
import { View, Text,FlatList, ActivityIndicator, Dimensions } from 'react-native'
import axios from 'axios'

const ProductList = ({naviagtion,route}) => {
    const [category,setCategory]=useState(route.params.category)
    const [productList,setProducstList]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        
        const fetchCategoryData=async()=>{
            await axios.get(`https://fakestoreapi.com/products/category/${category}`).then((res)=>{
                setProducstList(res.data)
                setLoading(false)
              console.log('CategoryData Electroinics',JSON.stringify(res.data,null,2))
            }).catch((error)=>{
              console.log('Error while fetching Categoris',error)
            })
          }
          fetchCategoryData()
    },[category])

    const renderItem = ({ item }) => (
        <Text>{item.title}</Text>
       );

    //console.log('Product list outside useEffect',productList)
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
        {loading?<ActivityIndicator size={36} color={'cyan'} style={{alignSelf:'center',marginTop:Dimensions.get('screen').width*0.45}}/>:
        <FlatList style={{flex:1}} data={productList}
        keyExtractor={(item)=>item.id}
        renderItem={renderItem}/>
    }
        </View>
    
    )
}

export default ProductList
