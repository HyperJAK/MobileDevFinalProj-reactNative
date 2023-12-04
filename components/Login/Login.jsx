import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Alert } from 'react-native';

const Login = ({navigation,setIsAuthed}) => {


  const [userData, setUserData] = useState([{username:'Antoine',Password:'12345'},
                                            {username:'Ralph',Password:'1234'},
                                            {username:'James',Password:'123'}
                                          ]);

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data.users);
      } catch (error) {
        console.error('Error fetching or parsing JSON file:', error);
      }
    };
  
    fetchData();
  }, []);*/
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  
  const checkLogin = () => {
    for (let i = 0; i < userData.length; i++) {
      if (Username === userData[i].username && Password === userData[i].Password) {
        console.log("Entered")
        setIsAuthed(true);
          navigation.navigate("Home",{username:userData[i].username,Password:userData[i].Password});
        return ;
      }
    }
    
           Alert.alert('error');
    
    
  };

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
          <TextInput style={styles.TextInput} value={Username} onChangeText={(value) => setUsername(value)} />
        </View>
        <View style={styles.child}>
          <Text style={{fontSize:20}}>Password:</Text>
          <TextInput keyboardType='numeric' style={styles.TextInput} value={Password} onChangeText={(value) => setPassword(value)} />
        </View>
        <View style={styles.child}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={() => { checkLogin() }}>
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
