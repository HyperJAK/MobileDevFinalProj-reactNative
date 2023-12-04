import React ,{useState} from 'react'
import { StyleSheet, TextInput,Text, View,SafeAreaView,ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Awesome from 'react-native-vector-icons/FontAwesome'


const Hotel=({navigation})=>{
   
    return(
        <SafeAreaView style={{backgroundColor:'#080c14',flex:1}}>
        
            <Awesome name='arrow-left' size={40} style={{color:'white',marginTop:40,marginLeft:20}} onPress={()=>{navigation.navigate("Home")}}/>
            <Text style={{color:'white',textAlign:'center',fontSize:20,marginTop:10}}>Choose the infos for your Hotel:</Text>
            <TextInput style={styles.path}  placeholder="Stay In..." placeholderTextColor="white" />
            <TextInput style={styles.path} placeholder="Leave In..." placeholderTextColor="white" />
            <View style={styles.date}>
                <TextInput style={styles.dateItems} placeholder='Date From...' placeholderTextColor="white" />
                <TextInput style={styles.dateItems}  placeholder='Date To...' placeholderTextColor="white" />
            </View>
            <TouchableOpacity style={{backgroundColor:'grey',marginHorizontal:10, borderRadius:10}} activeOpacity={0.6}>
                <Text style={{textAlign:'center',color:'white',marginVertical:10,padding:10}}>Search</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <Text style={{color:'white',textAlign:'center',fontSize:20}}>List of Available Hotel:</Text>
        </SafeAreaView>
    );
}
export default Hotel
const styles = StyleSheet.create({
path:{
    borderWidth:1,
    marginHorizontal:20,
    marginVertical:15,
    padding:10,
    borderRadius:10,
    backgroundColor:'grey',
    textAlign:'center',
    fontSize:20 ,
    color:'white',
    
},
date:{
    
    flexDirection:'row',
    marginHorizontal:15,
    
},
dateItems:{
    flex:1,
    borderWidth:3,
    padding:10,
    borderRadius:10,
    backgroundColor:'grey',
    marginVertical:15,
    textAlign:'center'
},
separator: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginVertical: 30, 
    marginHorizontal:15,
  },

})