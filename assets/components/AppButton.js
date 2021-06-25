import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function AppButton({title = "Search", handleSubmit = () => {}}) {
    return (
        <TouchableOpacity onPress={handleSubmit} style={styles.container} >
            <Text style={styles.text} >{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf:'center',
        width:120,
       
        height: 40, borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    }, 
    text: {
        color: "#111"
    }
})
