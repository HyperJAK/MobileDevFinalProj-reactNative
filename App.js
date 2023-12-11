import React, {useEffect, useState, useRef} from 'react';
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

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

//import registerNNPushToken from 'native-notify';
//import axios from 'axios';

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





export default function App(){

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    //registerNNPushToken(16469, 'DLqEy7tVzHmNjE1CCgTh2a');
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
        await schedulePushNotification('login');
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
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        };
        

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
                      {() => <Signup props={{setUser,setIsAuthed,email,setEmail,password,setPassword,cPassword,setCPassword,schedulePushNotification}}/>}
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
                  {() => <ProfileSettings props={{email,setEmail,password,setPassword,user,setUser,setIsAuthed,setPassword,setCPassword,schedulePushNotification}} />}
              </Tab.Screen>}
          </Tab.Navigator>

      </NavigationContainer>

  );
};
async function schedulePushNotification(type) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: type=='login'?'Welcome back!':type=='register'?'Thanks for registering':'No dont leave :(',
      body: type=='login'?'Succesfully logged in':type=='register'?'Succesfully registered':'Please come back :(',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 0.1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
