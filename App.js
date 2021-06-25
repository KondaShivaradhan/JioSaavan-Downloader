import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigation from './assets/Navigation/AppNavigation'
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerContent } from "./assets/Screens/DrawerContent";
import Constants from 'expo-constants';

import {
  View,
  Text,
  Linking,
  TextInput,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
const Drawer = createDrawerNavigator();

export default function App() {
  return (

    <View style={
      { flex: 1, marginTop: Constants.statusBarHeight }
    } >
      <AppNavigation > </AppNavigation> 
      </View>
    );
}