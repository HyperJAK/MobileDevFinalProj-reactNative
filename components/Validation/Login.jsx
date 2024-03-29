import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import authPic from '../../assets/Auth.jpg'
import {NormalBlue} from "../../assets/colors/Colors";

const Login = ({props}) => {

  const {handleLoggin,setIsAuthed,email,setEmail,password,setPassword} = props;

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={authPic}
        style={styles.container} 
      >
        <Text style={styles.text}>Log In:</Text>
        <View style={styles.child}>
          <Text style={{fontSize:20}}>Email:</Text>
          <TextInput style={styles.TextInput} placeholder={"Email"} value={email} onChangeText={(value) => setEmail(value)} />
        </View>
        <View style={styles.child}>
          <Text style={{fontSize:20}}>Password:</Text>
          <TextInput style={styles.TextInput} placeholder={"Password"} value={password} secureTextEntry={true} onChangeText={(value) => setPassword(value)} />
        </View>
        <View>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={()=>{Keyboard.dismiss();handleLoggin()}}>
            <Text style={{ textAlign: 'center',color:'white' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap:20
  },
  text: {
    fontSize: 40,
    fontWeight: '700',

  },
  child: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%'
  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 1,
    textAlignVertical: 'center',
    width:230,
    textAlign:'left',
    
  },
  btn: {
    backgroundColor: NormalBlue,
    borderRadius: 40,
    marginTop: 20,
    padding: 20,
    width: 200,
    height: 60,
    textAlign:'center',
    textAlignVertical: 'center',
  },
});
