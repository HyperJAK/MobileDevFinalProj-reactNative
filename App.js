import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Home from './components/Home/Home'
import Flight from './components/Flights/Flight'
import Hotel from './components/Hotels/Hotel'
import Trips from './components/Trips/Trips'
import ProfileSettings from './components/ProfileSettings/ProfileSettings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
const Tab=createBottomTabNavigator();
import {GetCredentials, SaveCredentials} from './components/Validation/CredentialsSaver'

import Icon from 'react-native-vector-icons/MaterialIcons';
import {CyanBlue, DarkBlue, DarkGrey, JeansBlue, LighterBlue} from "./assets/colors/Colors";
import {EncryptPassword, SignInFunc, ValidEmail, ValidPassword} from "./components/Utilities";
import Signup from "./components/Validation/Signup";
import Login from "./components/Validation/Login";


const tabBar_style = {
    backgroundColor: DarkBlue,
}


const tabBarOptions_style ={
    headerShown:false,
    activeTintColor: CyanBlue, // Color of the active tab
    inactiveTintColor: 'whitesmoke', // Color of inactive tabs
    labelStyle: {
    fontSize: 13, // Font size of tab labels
         // Font weight of tab labels
    },
    style: {
        backgroundColor: 'red', // Background color of the tab bar
    }
}




export const CustomIconComponent = ({ color, size, name }) => {
    return (
        <View>
            <Icon name={name} size={size} color={color} />
        </View>
    );
};





const App = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
    const [user, setUser] = useState({id:null, username: null, email:null, password:null, image:null});
    const [currentScreen, setCurrentScreen] = useState('login');

    const [hotelsData, setHotelsData] = useState([]);
    const [flightsData, setFlightsData] = useState([]);
    const [roomsData, setRoomsData] = useState([]);
    const [tripsData, setTripsData] = useState();
    const [refreshTripsData, setRefreshTripsData] = useState(true);

    const [isAuthed, setIsAuthed] = useState(false);

    const handleLoggin = async e => {
        if(e!=null){
            e.preventDefault();
        }


        if(ValidEmail(email) && ValidPassword(password)){
            try {
                console.log("Entered handling")

                const encryptedPass = await EncryptPassword(password);
                const userInfo = {email, encryptedPass};

                console.log("Logging func awaiting")
                await SignInFunc(userInfo, setUser);

                await SaveCredentials(user);

                setIsAuthed(true);
            } catch (error) {
                console.log(error);
            }
        }

        else{
            // nothin~

        }

    }

    useEffect(() => {
        async function getCred(){
            await GetCredentials({setUser});
        }
        getCred();


    }, [!isAuthed])

  return (

      <NavigationContainer>

          <Tab.Navigator initialRouteName='Login' screenOptions={tabBarOptions_style}>
              {!isAuthed && (
                  <Tab.Screen name="Login" options={{
                      tabBarLabel: 'Login',
                      tabBarStyle: tabBar_style,
                      tabBarIcon: ({ color, size }) => (
                          <CustomIconComponent color={color} size={size} name={'login'} />
                      ),
                  }} >
                      {() => <Login props={{handleLoggin,setIsAuthed,email,setEmail,password,setPassword}}/>}
                  </Tab.Screen>
              )}

              {!isAuthed && (
                  <Tab.Screen name="Signup" options={{
                      tabBarLabel: 'Signup',
                      tabBarStyle: tabBar_style,
                      tabBarIcon: ({ color, size }) => (
                          <CustomIconComponent color={color} size={size} name={'person-add'} />
                      ),
                  }}>
                      {() => <Signup props={{setUser,setIsAuthed,email,setEmail,password,setPassword,cPassword,setCPassword}}/>}
                  </Tab.Screen>
              )}


              {isAuthed &&<Tab.Screen name="Home" component={Home} options={{
                  tabBarLabel: 'Home',
                  tabBarStyle: tabBar_style,
                  tabBarIcon: ({ color, size }) => (
                      <CustomIconComponent color={color} size={size} name={'home'} />
                  ),
              }}

              />}
              {isAuthed &&<Tab.Screen name="Flights" component={Flight} options={{
                  tabBarLabel: 'Flights',
                  tabBarStyle: tabBar_style,
                  tabBarIcon: ({ color, size }) => (
                      <CustomIconComponent color={color} size={size} name={'flight'} />
                  ),
              }}/>}
              {isAuthed &&<Tab.Screen name="Hotels" component={Hotel} options={{
                  tabBarLabel: 'Hotels',
                  tabBarStyle: tabBar_style,
                  tabBarIcon: ({ color, size }) => (
                      <CustomIconComponent color={color} size={size} name={'hotel'} />
                  ),
              }}/>}
              {isAuthed &&<Tab.Screen name="Trips" component={Trips} options={{
                  tabBarLabel: 'Trips',
                  tabBarStyle: tabBar_style,
                  tabBarIcon: ({ color, size }) => (
                      <CustomIconComponent color={color} size={size} name={'map'} />
                  ),
              }}/>}

              {isAuthed &&<Tab.Screen name="Profile" options={{
                  tabBarLabel: 'Profile',
                  tabBarStyle: tabBar_style,
                  tabBarIcon: ({ color, size }) => (
                      <CustomIconComponent color={color} size={size} name={'person'} />
                  ),
              }}>
                  {() => <ProfileSettings props={{email,setEmail,user,setIsAuthed}} />}
              </Tab.Screen>}
          </Tab.Navigator>

      </NavigationContainer>

  );
};

export default App;
