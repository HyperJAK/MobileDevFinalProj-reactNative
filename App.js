import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Home from './components/Home/Home'
import Flight from './components/Flights/Flight'
import Hotel from './components/Hotels/Hotel'
import Trips from './components/Trips/Trips'
import Login from './components/Login/Login'
import ProfileSettings from './components/ProfileSettings/ProfileSettings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
const Tab=createBottomTabNavigator();

import Icon from 'react-native-vector-icons/MaterialIcons';
import {CyanBlue, DarkBlue, DarkGrey, JeansBlue, LighterBlue} from "./assets/colors/Colors";


const tabBarOptions_style ={
    activeTintColor: CyanBlue, // Color of the active tab
    inactiveTintColor: 'whitesmoke', // Color of inactive tabs
    labelStyle: {
    fontSize: 13, // Font size of tab labels
         // Font weight of tab labels
    },
    style: {
        backgroundColor: 'red', // Background color of the tab bar
    },
}

const tabBar_style = {
    backgroundColor: DarkBlue,
}


const CustomIconComponent = ({ color, size, name }) => {
    return (
        <View>
            <Icon name={name} size={size} color={color} />
        </View>
    );
};





const App = () => {

    const [isAuthed, setIsAuthed] = useState(false);



  return (

      <NavigationContainer>

          <Tab.Navigator tabBarOptions={tabBarOptions_style} initialRouteName='Login' screenOptions={{headerShown:false}}>
              {!isAuthed && (
                  <Tab.Screen name="Login" options={{
                      tabBarLabel: 'Login',
                      tabBarStyle: tabBar_style,
                      tabBarIcon: ({ color, size }) => (
                          <CustomIconComponent color={color} size={size} name={'login'} />
                      ),
                  }}>
                      {(props) => <Login {...props} setIsAuthed={setIsAuthed}/>}
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
                      {(props) => <Login {...props} setIsAuthed={setIsAuthed}/>}
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
          </Tab.Navigator>

      </NavigationContainer>

  );
};

export default App;
