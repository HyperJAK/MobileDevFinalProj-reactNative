import { scheduleNotificationAsync } from 'expo-notifications';
import React ,{useState} from 'react'
import { StyleSheet, Text, TextInput,View,SafeAreaView,ImageBackground, ScrollView ,TouchableOpacity,Image,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'


const ProfileSettings = ({props}) => {


  const[usernameText,setUsenameText]=useState('locked')

  const [passwordTextField,setpasswordTextField]=useState(true)

    const {email,setEmail,user,setIsAuthed,setPassword,setCPassword,schedulePushNotification} = props;


  return (
   <SafeAreaView style={{backgroundColor:'#080c14',flex:1}}>
   <View style={{marginTop:50,flexDirection:'column',alignItems:'center', borderBottomWidth: 1,
    borderBottomColor: 'white',paddingBottom:20}}>
    <Image source={user.image?user.image : require('../../assets/img.jpg')} style={{width:120,height:120,borderRadius:70}}/>
    <Text style={{color:'white'}}>{user.username?user.username : user.email}</Text>
   </View>
      <View style={{marginTop:40,rowGap:30}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{color:'white',fontSize:20,flex:2}}>Email:</Text>
              <TextInput style={{color:'white',flex:3,borderWidth:1,borderColor:'white',borderRadius:50,textAlign:'center'}} 
                value={email} editable={false} onChange={(e)=>{setEmail(e.nativeEvent.text)}}
              />
              
        </View>
        <Text style={{color:'white',fontSize:20}}>Password:</Text> 
        

        <Button onPress={async () => {await schedulePushNotification('logout');setIsAuthed(false);setEmail('');setPassword('');setCPassword('')}} title={'Log Out'}/>
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
  items:{
    flexDirection:'column',
    alignItems:'center',
    flexBasis:'30%',
   height:55,
   
  }
});

