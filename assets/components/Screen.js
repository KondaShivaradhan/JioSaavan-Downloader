import React from 'react'
import { StyleSheet, Text, View ,TextInput} from 'react-native'
import HamburgerMenu from './HamburgerMenu'

export default function Screen({ children ,style}) {
    return (
        <View style={[styles.container,style]}>
            <View style={styles.hamburgerMenu} >
                <HamburgerMenu />
                {children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    
})
