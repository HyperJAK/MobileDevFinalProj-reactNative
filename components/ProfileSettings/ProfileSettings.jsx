import React ,{useState} from 'react'
import { StyleSheet, Text, TextInput,View,SafeAreaView,ImageBackground, ScrollView ,TouchableOpacity,Image,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'


const ProfileSettings = ({navigation}) => {
  const [name,setName]=useState('Antoine')
  const[usernameText,setUsenameText]=useState('locked')
  const [usernameTextField,setUsernameTextField]=useState(false)

  const [passwordTextField,setpasswordTextField]=useState(false)
  return (
   <SafeAreaView style={{backgroundColor:'#080c14',flex:1}}>
   <View style={{marginTop:50,flexDirection:'column',alignItems:'center',   borderBottomWidth: 1,
    borderBottomColor: 'white',paddingBottom:20}}>
    <Image source={require('../../assets/img.jpg')} style={{width:120,height:120,borderRadius:70}}/>
    <Text style={{color:'white'}}>{name}</Text>
    </View>
      <View style={{marginTop:40,rowGap:30}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{color:'white',fontSize:20,flex:2}}>Username:</Text> 
              <TextInput style={{color:'white',flex:3,borderWidth:1,borderColor:'white',borderRadius:50,textAlign:'center'}} 
                value={name} editable={usernameTextField} onChange={(e)=>{setName(e.nativeEvent.text)}}
              />
             <TouchableOpacity
        style={{ flex: 1.5 }}
        onPress={() => {
          setUsernameTextField(!usernameTextField);
          setUsenameText(usernameText === 'locked' ? 'Unlocked' : 'locked'); // Corrected function name
        }}
      >
                <Text style={{backgroundColor:'white',textAlign:'center',width:70,borderRadius:40,marginLeft:10,height:25}}>{usernameText}</Text>
              </TouchableOpacity>
              
        </View>
        <Text style={{color:'white',fontSize:20}}>Password:</Text> 
        

        <Button  onPress={()=>{navigation.navigate('Login')}} title={'Log Out'}/>
      </View>

     <View style={styles.footer}>
        <TouchableOpacity style={styles.items} onPress={()=>{navigation.navigate("Home")}}>
              <Icon name="home" size={30} />
              <Text >Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.items}  onPress={()=>{navigation.navigate("Trips")}}>
                <Material  name="airport" size={30} />
                <Text>Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.items}>
                <Icon style={{color:'white'}} name="user" size={30} />
                <Text style={{color:'white'}} >Profile</Text>
        </TouchableOpacity>
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

