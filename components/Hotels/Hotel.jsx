import React ,{useState} from 'react'
import { StyleSheet,Text, View,SafeAreaView,ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Awesome from 'react-native-vector-icons/FontAwesome'
import {DatePicker} from "../Flights/DatePicker";
import axios from 'axios';
// import HotelSearchResults from './HotelSearchResults' not needed anymore
import { FlatList } from 'react-native';
import imageHotel from '../../assets/hotelImg.jpg'
import { Keyboard } from 'react-native';
import { Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';


const Hotel=({navigation})=>{

    const [hotelsResults,setHotelsResults] = useState([]);
    const [destination, setDestination] = useState('');
    const [searching,setSearching] = useState(false);

    async function searchHotels() {

        const info = {destination: destination}
        try {
            const hotelInfo = await axios.post(
                "http://192.168.132.1:4000/getAllHotels",
                info
            );
            // console.log(hotelInfo.data.data)
            setHotelsResults(hotelInfo.data.data)
            console.log(hotelsResults)
        } catch (error) {
            // alert(error.response.data.error);
            setHotelsResults(null)
        }
    }
   
    return(
        <SafeAreaView style={{backgroundColor:'#080c14',flex:1}}>
        
            <Awesome name='arrow-left' size={40} style={{color:'white',marginTop:40,marginLeft:20}} onPress={()=>{navigation.navigate("Home")}}/>
            <Text style={{color:'white',textAlign:'center',fontSize:20,marginTop:10}}>Choose the infos for your Hotel:</Text>
            <TextInput style={styles.path}  placeholder="Stay In..." placeholderTextColor="black" onChange={(e)=>{setDestination(e.nativeEvent.text); console.log(destination)}}/>
{/*            <TextInput style={styles.path} placeholder="Leave In..." placeholderTextColor="black" />*/}
            <View style={styles.date}>
                <DatePicker title={'Book for'}/>
                <DatePicker title={'Until'}/>
            </View>
            <TouchableOpacity
                onPress={()=>{searchHotels(); setSearching(true); Keyboard.dismiss()}}
                style={{backgroundColor: 'white', marginHorizontal: 10, borderRadius: 10, marginVertical: 20}}
                activeOpacity={0.6}>
                <Text style={{textAlign: 'center', color: 'black', marginVertical: 10, padding: 10}}>Search</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <Text style={{color:'white',textAlign:'center',fontSize:20}}>List of Available Hotel:</Text>
            {/* <FlatList
                data={ searching && <HotelSearchResults destination={destination} hotelsResults={hotelsResults}/>}

            /> */}
            { searching && <FlatList 
            data={hotelsResults}
            renderItem={({item}) => (
              <View style={styles.container}>
                <View><Image source={imageHotel} alt='Hotel Image' style={{width: 100, height: 100}}/></View>
                <View style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '42%' }}>
                  <View><Text style={{ fontSize: 16 }}>Name: {item.hotelName}</Text></View>
                  <View><Text style={{ fontSize: 16 }}>City: {item.hotelCity}</Text></View>
                  <View style={{ display: 'flex', flexDirection: 'column' }}><Text style={{ fontSize: 16 }}>Rating: {item.rating}/5</Text></View>
                </View>
                <View style={{ display: 'flex', justifyContent: 'space-around'}}>
                    <Pressable style={styles.button} onPress={()=> alert('yalla james dawrak') }>
                        <Text style={styles.text}>Add</Text>
                    </Pressable>
                </View>
              </View>
            )}
            keyExtractor={item => item.hotelId}

            />}
        </SafeAreaView>
    );
}
export default Hotel
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
path:{
    borderWidth:1,
    marginHorizontal:20,
    marginVertical:15,
    padding:10,
    borderRadius:10,
    backgroundColor:'white',
    textAlign:'left',
    fontSize:20 ,
    color:'black',
    
},
date:{
    
    flexDirection:'row',
    marginHorizontal:15,
    justifyContent: 'center',
    gap: 50
    
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
button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
},
text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})