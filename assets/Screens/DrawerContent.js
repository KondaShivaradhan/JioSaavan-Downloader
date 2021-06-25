import React from "react";
import { View, StyleSheet, Image, Linking } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Drawer } from 'react-native-paper';
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Icon } from 'react-native-elements'
export function DrawerContent(props) {

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#111',
    }}>
      <View style={styles.drawerContent} >
        <View style={styles.userInfoSection}>
          <View style={{ height: 100, width: "100%", }}>
            <Image
              source={require("../stuff/logoRing.jpg")}
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          
          {/* <DrawerItem
            style={styles.Items}
            icon={({ color, size }) => (
              <Image
              source={require("../stuff/home.png")}
              style={{ width: "10%", height: "100%" }}
            ></Image>
            )}
            labelStyle={styles.label}
            label="Home"
            onPress={() => {
              props.navigation.navigate("JioSavan");
            }}
            >
            
          </DrawerItem> */}
          <DrawerItem
            style={styles.Items}
            labelStyle={styles.label}
            icon={({ color, size }) => (
              <Image
              source={require("../stuff/jio2.png")}
              style={{ width: "10%", height: "100%" }}
            ></Image>
            )}
            label="Jio Savan"
            onPress={() => {
              props.navigation.navigate("JioSavan");
            }}
          />
          
          
          <DrawerItem
            style={styles.Items}
            labelStyle={styles.label}
            icon={({ color, size }) => (
              <Image
              source={require("../stuff/youtube.png")}
              style={{ width: "10%", height: "100%" }}
            ></Image>
            )}
            label="Youtube"
            onPress={() => {
              props.navigation.navigate("youtube");
            }}
          />

        </Drawer.Section>
  
      </View>
      <View style={
        {
          flex: 1,
          justifyContent: 'flex-end'
        }
      }>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            inactiveBackgroundColor="transparent"
            labelStyle={{ color: "#fff" }}
            style={styles.hyper}
            icon={({ color, size }) => (
              <Image
              source={require("../stuff/bb.png")}
              style={{ width: "12%", height: "100%" }}
            ></Image>
            )}
            label="Made by BlazingBane"
            onPress={() => {
              Linking.openURL("http://kondashivaradhan.github.io");
            }}
          ></DrawerItem>
        </Drawer.Section>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {

  },
  userInfoSection: {
    color: 'white',
    backgroundColor: 'red'
    // paddingLeft: 20,
  },

  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  Items: {
     textAlign: 'center',
  backgroundColor:'#2C3539'
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    textAlign: "center",
    justifyContent: 'space-around',
    alignContent: 'center',
    height: '40%'
  },
  label: {
    color: '#fff',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
