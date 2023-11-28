import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Home from './components/Home/Home'
import Flight from './components/Flights/Flight'
import Hotel from './components/Hotels/Hotel'
import Trips from './components/Trips/Trips'
import Login from './components/Login/Login'
import ProfileSettings from './components/ProfileSettings/ProfileSettings'
import {Navigation} from "./components/Navigation/Navigation";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
const Stack=createBottomTabNavigator();


const Tab = createBottomTabNavigator();
const App = () => {



  return (
       <Tab.Navigator>
           <Tab.Screen name="Login" component={Login} />
           <Tab.Screen name="Home" component={Home} />
           <Tab.Screen name="Flight" component={Flight} />
           <Tab.Screen name="Trips" component={Trips} />
           <Tab.Screen name="Hotel" component={Hotel} />
           <Tab.Screen name="ProfileSettings" component={ProfileSettings} />
       </Tab.Navigator>


  );
};

export default App;
