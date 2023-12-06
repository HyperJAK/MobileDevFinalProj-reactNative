import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Alert } from 'react-native';
import {EncryptPassword, SignUpFunc, ValidEmail, ValidPassword} from "../Utilities";

const Signup = ({props}) => {

    const {setUser,setIsAuthed,email,setEmail,password,setPassword,cPassword,setCPassword} = props;


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
                source={{
                    uri:
                        'https://media.istockphoto.com/id/1174854848/vector/aircraft-destinations-with-planes-icons-on-blue-background-abstract-seamless-pattern.jpg?s=612x612&w=0&k=20&c=hcj3Eu8HC2JWbliY5CZChDNpGrLNjvZylU-6JidI3IM=',
                }}
                style={styles.container}
            >
                <Text style={styles.text}>Log In:</Text>
                <View style={styles.child}>
                    <Text style={{fontSize:20}}>Username:</Text>
                    <TextInput style={styles.TextInput} value={email} onChangeText={(value) => setEmail(value)} />
                </View>
                <View style={styles.child}>
                    <Text style={{fontSize:20}}>Password:</Text>
                    <TextInput style={styles.TextInput} value={password} onChangeText={(value) => setPassword(value)} />
                </View>
                <View style={styles.child}>
                    <Text style={{fontSize:20}}>Confirm Password:</Text>
                    <TextInput style={styles.TextInput} value={cPassword} onChangeText={(value) => setCPassword(value)} />
                </View>
                <View style={styles.child}>
                    <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={handleSignup}>
                        <Text style={{ textAlign: 'center',color:'white' }}>Login</Text>
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
    },
    TextInput: {
        borderWidth: 3,
        borderRadius: 100,
        padding: 4,
        textAlignVertical: 'center',
        width:200,
        textAlign:'center',

    },
    btn: {
        backgroundColor: 'black',
        borderRadius: 40,
        padding: 10,
        width: 100,
    },
});
