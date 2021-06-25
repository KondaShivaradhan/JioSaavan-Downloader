import * as React from "react";
import { Button, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerContent } from "../Screens/DrawerContent";
import { createStackNavigator } from "@react-navigation/stack";
import JioSavan from "../Screens/JioSavan";
import Youtube from "../Screens/Youtube";
const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="JioSavan" component={JioSavan} />
        <Drawer.Screen name="youtube" component={Youtube} />
        {/* <Drawer.Screen name="JioSavan" component={JioSavan} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
