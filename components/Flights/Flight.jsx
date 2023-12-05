import React ,{useState} from 'react'
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    SafeAreaView,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Button, Platform
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Awesome from 'react-native-vector-icons/FontAwesome'
import {DarkGrey, LighterBlue} from "../../assets/colors/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import {DatePicker} from "./DatePicker";


const styles = StyleSheet.create({
    path:{
        borderWidth:1,
        marginHorizontal:20,
        marginVertical:15,
        padding:10,
        borderRadius:10,
        backgroundColor:'white',
        textAlign:'center',
        fontSize:20 ,
        color:'black',

    },
    date:{

        flexDirection:'row',
        marginHorizontal:15,
        justifyContent: "center",
        gap: 50

    },
    locationButton:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        border: 2 + ' solid ' + LighterBlue,
        width: 50,
    },
    dateItems:{
        flex:1,
        borderWidth:3,
        padding:10,
        margin: 5,
        borderRadius:10,
        backgroundColor: 'white',
        marginVertical:15,
        textAlign:'center',
        maxWidth: 40
    },
    separator: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 30,
        marginHorizontal:15,
    },

})


const Flight=({navigation})=>{



        return (
            <SafeAreaView style={{backgroundColor: '#080c14', flex: 1}}>

                <Awesome name='arrow-left' size={40} style={{color: 'white', marginTop: 40, marginLeft: 20}}
                         onPress={() => {
                             navigation.navigate("Home")
                         }}/>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 20, marginTop: 10}}>Choose the infos for
                    your Flight:</Text>
                <TextInput style={styles.path} placeholder="Departing From..." placeholderTextColor="black"/>
                <TextInput style={styles.path} placeholder="Flying To..." placeholderTextColor="black"/>
                <View style={styles.date}>

                    <DatePicker title={'Departure'}/>
                    <DatePicker title={'Arrival'}/>

                </View>
                <TouchableOpacity
                    style={{backgroundColor: 'white', marginHorizontal: 10, borderRadius: 10, marginVertical: 20}}
                    activeOpacity={0.6}>
                    <Text style={{textAlign: 'center', color: 'black', marginVertical: 10, padding: 10}}>Search</Text>
                </TouchableOpacity>
                <View style={styles.separator}/>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>List of Available Flights:</Text>
            </SafeAreaView>
        );
}
export default Flight;