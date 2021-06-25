import React from 'react'
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNRestart from 'react-native-restart';

export default function Navi() {
    const [refreshing, setState] = React.useState(false);
    function refreshScreen() {
        setState({ lastRefresh: Date(Date.now()).toString() })
    }
    const navigation = useNavigation()

    return (
        <View style={styles.containter}>
            <View style={styles.main}>

                <TouchableOpacity style={styles.b}
                    onPress={() => navigation.toggleDrawer()}>
                    <Image
                        source={require("../stuff/menu.png")}
                        style={{ width: 35, height: 20 }}
                    ></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.b2}
                    onPress={() =>RNRestart.Restart()}>
                    <Image
                        source={require("../stuff/final.png")}
                        style={{ width: 55, height: 40 }}
                    ></Image>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    b: {
        alignSelf: 'center',
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    b2: {
        alignSelf: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    main: {
        overflow:'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#7d7d7d'

    }

})
