import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Alert } from 'react-native';
import {EncryptPassword, SignUpFunc, ValidEmail, ValidPassword} from "../Utilities";
import { TextInput, Button } from 'react-native-paper';
import authPic from '../../assets/Auth.jpg'
import {NormalBlue} from "../../assets/colors/Colors";

const Signup = ({props}) => {

    const {setUser,setIsAuthed,email,setEmail,password,setPassword,cPassword,setCPassword,schedulePushNotification} = props;


    const [userData, setUserData] = useState([{username:'Antoine',Password:'12345'},
        {username:'Ralph',Password:'1234'},
        {username:'James',Password:'123'}
    ]);



    const handleSignup = async e => {
        //function to handle setCPass not being updated when calling handleSignUp
        e.preventDefault();

        console.log(password);
        console.log(cPassword);

        if((ValidEmail(email) && ValidPassword(password)) && password === cPassword) {
            const encryptedPass = await EncryptPassword(password);
            const username = null;
            const profilePic = null;

            const userInfo = {username, email, encryptedPass, profilePic};
            console.log("Signing up")
            await schedulePushNotification('register')

            try{
                await SignUpFunc(userInfo, setUser);
                setIsAuthed(true)
            }catch(error){
                //alert(error.response.data.error);
                console.log(error)
            }


        }
        else{
            // nothin~
        }

    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                source={authPic}
                style={styles.container}
            >
                <Text style={styles.text}>Sign Up:</Text>
                <View style={styles.child}>
                    <Text style={{fontSize:20}}>Email:</Text>
                    <TextInput style={styles.TextInput} value={email} textContentType='emailAddress' onChangeText={(value) => setEmail(value)} />
                </View>
                <View style={styles.child}>
                    <Text style={{fontSize:20}}>Password:</Text>
                    <TextInput style={styles.TextInput} value={password} secureTextEntry={true} onChangeText={(value) => setPassword(value)} />
                </View>
                <View style={styles.child}>
                    <Text style={{fontSize:20}}>Confirm Password:</Text>
                    <TextInput style={styles.TextInput} value={cPassword} secureTextEntry={true} onChangeText={(value) => setCPassword(value)} />
                </View>
                <View>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={handleSignup}>
                        <Text style={{ textAlign: 'center',color:'white' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Signup;

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
        fontSize: 30,
        fontWeight: '700',

    },
    child: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%'
    },
    TextInput: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 1,
        textAlignVertical: 'center',
        width:200,
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
