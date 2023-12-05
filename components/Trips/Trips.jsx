import React ,{useState} from 'react'
import { StyleSheet, TextInput,Text, View,SafeAreaView,ImageBackground, ScrollView,FlatList, Image,TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Awesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome'

const Trips = ({navigation}) => {
    const [trips, setTrips] = useState(null);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#080c14'}}>
    <Text style={{color:'white',fontSize:40,marginVertical:100,marginHorizontal:20}}>Trips:</Text>
    <View>
      {trips === null ? (
        <View>
        <Text style={{color:'white',fontSize:30,textAlign:'center'}}>No trips yet ...</Text>
        <Image  source={{uri:'https://www.shutterstock.com/image-vector/no-data-empty-concept-illustration-260nw-2134675073.jpg'}} style={{height:300,opacity:0.5,marginHorizontal:20,borderRadius:20}}/>
        </View>
      ) : (
        <FlatList
            data={trips}
            keyExtractor={(item) => item.id.toString()} // Assuming id is a number
            renderItem={({ item }) => (
                <View>
                <Text style={{ color: 'white',marginHorizontal:10, fontSize: 30 }}>{item.name}</Text>
                </View>
            )}
            />
      )}
      
    
    </View>

    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
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
})
export default Trips
