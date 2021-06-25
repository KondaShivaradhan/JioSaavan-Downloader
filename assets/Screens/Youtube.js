import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview';
const fs = require('fs');
import Navi from './Navi';

export default function Youtube() {
    return (
        <>
        <Navi/>
        <WebView
        source={{
          uri: 'https://yt1s.com/en6'
        }}
        style={{ marginTop: 5 }}
      />
      </>
    )
}

const styles = StyleSheet.create({})
