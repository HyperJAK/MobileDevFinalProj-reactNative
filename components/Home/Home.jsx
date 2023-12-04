import React ,{useState} from 'react'
import { StyleSheet, Text, View,SafeAreaView,ImageBackground, ScrollView, TouchableOpacity,RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Hotel from 'react-native-vector-icons/FontAwesome5'


const Home = ({navigation,route}) => {
  const[refreshing,setRefresh]=useState(false)
  const onRefresh=()=>{
    setRefresh(true)
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }
  return (
   <SafeAreaView style={{backgroundColor:'#080c14',flex:1}}>
    <ScrollView   refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  } >
   
        <Text style={{color:'#0c8289',padding:20,fontSize:30,marginTop:30}}><Icon name="hotel"  size={30}/>   WordTrip</Text>
        <View style={styles.container} >
              <TouchableOpacity style={styles.child}  onPress={() => {
    navigation.navigate("Flight");
  }}>
                        <Icon style={styles.icons} name='plane' size={20}/>
                        <Text style={{color:'white'}}>Flights</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.child} onPress={()=>{navigation.navigate("Hotel")}}>
                      <Hotel style={styles.icons} name='hotel' size={20}/>
                       <Text style={{color:'white'}}>Hotel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.child} onPress={()=>{navigation.navigate("Trips")}}>
                        <Material style={styles.icons} name='purse' size={20}/>
                        <Text style={{color:'white'}}>Trips</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.body}>
          <View style={styles.boxes}>
              <ImageBackground source={{uri:'https://offloadmedia.feverup.com/parissecret.com/wp-content/uploads/2022/01/19044022/COUV-ARTICLES-1920x1080-44.jpg'}}
                style={styles.bodyBackground}
              >
                <Text style={styles.bodyText}>Search for hotels that you find appealing and consider feasible, taking into account their prices.</Text>
              </ImageBackground>
          </View>
        <View style={styles.boxes}>
            <ImageBackground source={{uri:'https://t3.ftcdn.net/jpg/05/67/71/40/360_F_567714042_UvQVT3tVEsQFcbqvgsoJ8Mju0jp6TdxK.jpg'}}
                style={styles.bodyBackground}>
             <Text  style={styles.bodyText}>Book the best plane for your travel, considering both the aircraft itself and its departure time.</Text>
            </ImageBackground>
        </View>
    </View>

     </ScrollView>
     <View style={styles.footer}>
        <TouchableOpacity style={styles.items} >
              <Icon style={{color:'white'}} name="home" size={30} />
              <Text style={{color:'white'}}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.items}  onPress={()=>{navigation.navigate("Trips")}}>
                <Material  name="airport" size={30} />
                <Text>Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.items} onPress={()=>{navigation.navigate("ProfileSettings")}}>
                <Icon name="user" size={30} />
                <Text>Profile</Text>
        </TouchableOpacity>
      </View>
   </SafeAreaView>
  )
}
export default Home;
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    flexWrap:'nowrap',
   
  },
  child:{
      flexBasis:'30%',
      flexDirection:'column',
      columnGap:10,
      alignItems:'center',
     padding:2,
     color:'white'
  },
  icons:{
    backgroundColor:'#0c8289',
    borderRadius: 30,
    padding: 20,
    paddingHorizontal:25,
    borderWidth: 1,
  
  },
  boxes:{
    marginTop:20,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:70,
    
  },
  bodyBackground:{
    height:400,
    borderRadius: 20,
     overflow: 'hidden',
     opacity:0.9
  },
  bodyText:{
    fontSize:25,
    padding:10,
    color:'white',
    fontWeight:'500'
  },
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
