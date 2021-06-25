import React, { useRef } from 'react'
import { StatusBar, Animated } from 'react-native';
// console.log('statusBarHeight: ', StatusBar.currentHeight);
import { createIconSet } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, Header } from "@react-navigation/stack";
import Constants from 'expo-constants';
import Icon from "react-native-vector-icons/Ionicons";
export default function HamburgerMenu() {
    const navigation = useNavigation()
    const { statusBarHeight } = Constants
    const pan = useRef(new Animated.ValueXY()).current;

    return <TouchableOpacity style={styles.container} onPress={() => navigation.toggleDrawer()} >
        <Icon.Button
            name="ios-menu"
            size={23}
            style={{
                position: 'relative',
                left: 4,
            }}
            onPress={() => navigation.toggleDrawer()}
        ></Icon.Button>
        <Icon.Button
            name="ios-menu-sharp"
            size={23}
            style={{
                position: 'relative',
                left: 4,
            }}
            onPress={() => navigation.toggleDrawer()}
        ></Icon.Button>
        <Icon.Button
            name="ios-menu-sharp"
            size={23}
            style={{
                position: 'relative',
                left: 4,
            }}
            onPress={() => navigation.toggleDrawer()}
        ></Icon.Button>
    </TouchableOpacity>
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40, width: '90%', left: '0%',
        borderRadius: 10,
    }
})