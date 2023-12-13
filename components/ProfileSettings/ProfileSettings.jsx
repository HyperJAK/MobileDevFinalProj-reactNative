import { scheduleNotificationAsync } from 'expo-notifications';
import React ,{useState} from 'react'
import { StyleSheet, Text, TextInput,View,SafeAreaView,ImageBackground, ScrollView ,TouchableOpacity,Image,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {DecryptPassword, EncryptPassword, ValidEmail, ValidPassword} from "../Utilities";
import axios from 'axios';
import {ImageGalleryPicker} from "./ImageGalleryPicker";
import Camera from "./Camera";


const ProfileSettings = ({props}) => {
  const {email,setEmail,password,setPassword,user,setUser,setIsAuthed,setCPassword,schedulePushNotification} = props;

  const[usernameText,setUsenameText]=useState(false)

  const[passwordTextField,setpasswordTextField]=useState(false)

  const[title,setTitle] = useState('Edit')

  let [validPass, setValidPass] = useState(false);
  let [validEmail, setValidEmail] = useState(false);
    let [validUsername, setValidUsername] = useState(false);

  let [newEmail, setNewEmail] = useState(email);
  let [newPassword, setNewPassword] = useState(password);
  let [newUsername, setNewUsername] = useState('Default User');

  // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false);
  const [imageSave, setImageSave] = useState(null);
  
  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { 
      setShowPassword(!showPassword); 
  }; 

  console.log(newPassword)
  console.log(newEmail)

  const HandleProfileSave = async () => {

    if(newEmail.length !== 0){
        validEmail = true;
    }
    if(newPassword.length !== 0){
        validPass = true;
    }
    if(newUsername.length !== 0){
        validUsername = true;
    }

    if (validPass && validEmail && validUsername) {

        const encryptedPass = await EncryptPassword(newPassword);
        setNewPassword(encryptedPass);
        console.log('Entered !!!')
        console.log(newPassword)
        console.log(newEmail)
        console.log(newUsername)

        const data = {user, newEmail, encryptedPass, newUsername};

        try {
            await axios.post('http://192.168.2.102:4000/updateUserInfo', data);

            setUser((prevUser) => ({
                ...prevUser,
                email: newEmail,
                password: newPassword,
            }));

        } catch (error) {
            console.log(error);
        }
    }
    else{
        console.log('Not valid credentials')
    }
  }

  return (
   <SafeAreaView style={{backgroundColor:'#080c14',flex:1, padding: 20, flexDirection: 'column'}}>
    <View style={{marginTop:50,flexDirection:'column',alignItems:'center', borderBottomWidth: 1, borderBottomColor: 'white',paddingBottom:20, gap: 20}}>
      <Image source={imageSave? {uri: imageSave} : require('../../assets/nopfp.png')} style={{width:120,height:120,borderRadius:70}}/>

      <Text style={{color:'white'}}>{user.username?user.username : user.email}</Text>
        <ImageGalleryPicker showImage={false} imageSave={setImageSave}/>
    </View>
    <View style={{marginTop:40,rowGap:30}}>

        <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{color:'white',fontSize:20,flex:2}}>Username:</Text>
            <TextInput placeholder="Enter Username" style={{color:'white',flex:3,borderWidth:1,borderColor:'white',borderRadius:50,textAlign:'center'}} value={newUsername} editable={passwordTextField} onChange={(e)=>{setNewUsername(e.nativeEvent.text)}}/>
        </View>


      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:'white',fontSize:20,flex:2}}>Email:</Text>
        <TextInput placeholder="Enter Email" style={{color:'white',flex:3,borderWidth:1,borderColor:'white',borderRadius:50,textAlign:'center'}} value={email} editable={passwordTextField} onChange={(e)=>{setEmail(e.nativeEvent.text);setNewEmail(e.nativeEvent.text);}}/>      
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:'white',fontSize:20,flex:2}}>Password:</Text> 
        <TextInput 
  
          // Set secureTextEntry prop to hide  
          //password when showPassword is false 
          secureTextEntry={!showPassword} 
          value={password} 
          onChange={(e)=>{setPassword(e.nativeEvent.text);setNewPassword(e.nativeEvent.text)}}
          style={{color:'white',flex:3,borderWidth:1,borderColor:'white',borderRadius:50,textAlign:'center'}}
          placeholder="Enter Password"
          placeholderTextColor="white"
          editable={passwordTextField}
        /> 
        <MaterialCommunityIcons 
          name={showPassword ? 'eye-off' : 'eye'} 
          size={24} 
          color="#aaa"
          style={styles.icon} 
          onPress={passwordTextField==true?toggleShowPassword:null} 
        />
      </View>
      <View style={{ gap: 20 }}>
        <Button title={title} onPress={() => {title=='Edit'?(setUsenameText(true), setpasswordTextField(true), setTitle('Save')):(setUsenameText(false), setpasswordTextField(false), setTitle('Edit'), setShowPassword(false), HandleProfileSave())}}/> 
        <Button onPress={async () => {await schedulePushNotification('logout');setIsAuthed(false);setEmail('');setPassword('');setCPassword('')}} title={'Log Out'}/>
      </View>
        <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{color:'white',fontSize:20}}>Photograph a document for verification:</Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <ImageGalleryPicker showImage={true} imageSave={setImageSave}/>
                <Camera />
            </View>

        </View>
    </View>
   </SafeAreaView>
  )
}

export default ProfileSettings;
const styles = StyleSheet.create({
  footer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#0c8289',
     position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: 'black',
  },
  input: { 
    flex: 1, 
    color: 'white', 
    paddingVertical: 10, 
    paddingRight: 10, 
    fontSize: 16, 
  }, 
  items:{
    flexDirection:'column',
    alignItems:'center',
    flexBasis:'30%',
   height:55,
   
  },
  icon: { 
    marginLeft: 10, 
    position: 'absolute',
    left: '85%'
  }, 
  container: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#f3f3f3', 
    borderRadius: 8, 
    paddingHorizontal: 14, 
  }, 

  heading: { 
      alignItems: 'center', 
      fontSize: 20, 
      color: 'green', 
      marginBottom: 20, 
  },
});

