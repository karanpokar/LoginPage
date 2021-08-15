import React from 'react'
import { View, Text,StyleSheet, Dimensions,Image } from 'react-native'

const imageMap= new Map([['electronics',require('../../Assets/electronics.png')],['jewelery',require('../../Assets/jewelery.png')],["men's clothing",require('../../Assets/men.png')],["women's clothing",require('../../Assets/women.png')]])

const CategoryCard = ({name,selected}) => {
    return (
        <View style={{...styles.card,backgroundColor:selected?'cyan':'red'}}>
            <Image style={{height:Dimensions.get('screen').height*0.20,width:Dimensions.get('screen').width*0.90,borderRadius:20}} source={imageMap.get(name)} />
        </View>
    )
}

export default CategoryCard

const styles=StyleSheet.create({
    card:{
        height:Dimensions.get('screen').height*0.20,
        width:Dimensions.get('screen').width*0.90,
        backgroundColor:'red',
        borderRadius:20,
        alignItems:'center',
        marginHorizontal:5,
        marginVertical:10
    }
})