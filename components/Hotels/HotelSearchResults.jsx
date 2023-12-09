import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import IMG from '../../assets/4.jpg'
import { Text,Image, FlatList, View, SafeAreaView } from 'react-native'
import { TiStarFullOutline } from "react-icons/ti";
import imageHotel from '../../assets/hotelImg.jpg'
import { ScrollView, StyleSheet } from 'react-native';

export default function HotelSearchResults({hotelsResults, destination}) {

  const data = hotelsResults.map((item)=> (
    <View style={styles.container}>
      <View><Image source={imageHotel} alt='Hotel Image' style={{width: 100, height: 100}}/></View>
      <View style={{ display: 'flex', justifyContent: 'space-around' }}>
        <View><Text style={{ fontSize: 16 }}>Name: {item.hotelName}</Text></View>
        <View><Text style={{ fontSize: 16 }}>City: {item.hotelCity}</Text></View>
        <View style={{ display: 'flex', flexDirection: 'column' }}><Text style={{ fontSize: 16 }}>Rating: {item.rating}/5</Text></View>
      </View>
    </View>
  ))

  return (
    <View>
            <Text style={{color:'white', fontSize: 24, margin: 10}}>Results for '{destination}'</Text>
              {data}
    </View>
  )}

const styles = StyleSheet.create({

  container:{
     display: 'flex',
     flexDirection: 'row',
     gap: 10,
     margin: 10,
     backgroundColor:'#FFFFFF',
     borderRadius: 30,
     overflow: 'hidden',
    },
  })
