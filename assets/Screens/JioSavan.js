import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, RefreshControl, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { FlatList, Image, StyleSheet, Text, TextInput, View, } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import AppButton from '../components/AppButton';
import { startClock } from 'react-native-reanimated';
import { PermissionsAndroid } from 'react-native';
import Navi from './Navi';
import RNRestart from 'react-native-restart';
import LottieView from 'lottie-react-native';
var RNFS = require('react-native-fs');

export default function JioSavan() {
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);
    const [songs, setMain] = useState([]);
    const [err, setErr] = useState([]);
    const [name, setName] = useState([]);
    const [url, setUrl] = useState([]);
    const [search, setSearch] = useState('');
    const [shouldShow, setShouldShow] = useState(false);
    const android = RNFetchBlob.android
    function start() {
        if (search.includes("playlist")) {
            console.log('Playlist');
            axios.get('https://apg-saavn-api.herokuapp.com/result/?q=' + search)
                .then(res => {
                    console.log(res.data.songs[0]);
                    setMain(res.data.songs)
                }).catch((error) => {
                    alert('Incorrect URL')
                    setErr('Not Found')
                })
            console.clear
        }
        if (search.includes("song")) {
            console.log('Song');
            axios.get('https://apg-saavn-api.herokuapp.com/result/?q=' + search)
                .then(res => {
                    setName(res.data.song)
                    setUrl(res.data.media_url)
                    setData(res.data);
                }).catch((error) => {
                    alert('Incorrect URL')
                    setErr('Not Found')
                })
            console.clear
        } else {
            axios.get('https://saavn.me/search/songs?query=' + search +"&page=1&limit=20")
                .then(res => {
                    console.log(JSON.stringify(res.data.results));
                    setMain(res.data.results)
                }).catch((error) => {
                    console.log(JSON.stringify(res.data.results));
                    alert('Incorrect Name')
                    setErr('Not Found')
                })
            console.clear
        }
    }
    function all() {
        songs.forEach(element => {
            return new Promise((resolve, reject) => {
                RNFetchBlob.fs.exists(RNFetchBlob.fs.dirs.DownloadDir + '/SavanD/' + element.title + '.m4a')
                    .then((exist) => {
                        // console.log('came3');
                        // console.log(`file ${exist ? '' : 'not'} exists`)
                        exist ? console.warn('Already Exists') :

                            RNFetchBlob
                                .config({
                                    addAndroidDownloads: {
                                        title: element.name,
                                        useDownloadManager: true,
                                        notification: true,
                                        description: 'File downloaded by download manager.',
                                        path: RNFetchBlob.fs.dirs.DownloadDir + '/SavanD/' + element.name+ '.m4a'
                                    }
                                })
                                .fetch('GET', element.downloadUrl[element.downloadUrl.length-1].link)
                                .then((resp) => {
                                    RNFetchBlob.android.actionViewIntent(resp.path(), '/')
                                })
                                .catch((error) => {
                                    console.log(error);
                                })

                    })
                    .catch((error) => { console.log(error); })

            }).catch((error) => {
                console.log(error);
            })
        });

    }
    function clicked() {
        return new Promise((resolve, reject) => {
            RNFetchBlob.fs.exists(RNFetchBlob.fs.dirs.DownloadDir + '/SavanD/' + name + '.m4a')
                .then((exist) => {
                    console.log(`file ${exist ? '' : 'not'} exists`)
                    exist ? null :
                        RNFetchBlob
                            .config({
                                addAndroidDownloads: {
                                    title: name,
                                    useDownloadManager: true,
                                    notification: true,

                                    description: 'File downloaded by download manager.',
                                    path: RNFetchBlob.fs.dirs.DownloadDir + '/SavanD/' + name + '.m4a'
                                }
                            })
                            .fetch('GET', url)
                            .then((resp) => {
                                RNFetchBlob.android.actionViewIntent(resp.path(), '/')
                            })
                            .catch((error) => {
                            })
                })
                .catch(() => { })

        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            <Navi></Navi>
            <View style={styles.container}>
                <View style={{ flex: 1, }} >
                    <TextInput
                        placeholder="Song Name or Song Link or Playlist Link"
                        style={styles.textInput}
                        placeholderTextColor="#FFF"
                        onChangeText={e => setSearch(e)}
                    />
                    <AppButton style={{}} onPress={() => setShouldShow(true)} handleSubmit={() => {
                        start()
                    }} />
                    <View>
                        {shouldShow ? (<Text>
                            Searching Animation Here
                        </Text>) : null}

                    </View>
                    {data.length == 0 ?
                        null : (
                            <View style={styles.songContainer}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Image
                                        style={{ height: 40, width: 40, borderRadius: 10 }}
                                        source={{ uri: data.image }}
                                    />
                                    <Text
                                        style={{ width: 150, color: '#FFF', fontSize: 14, marginHorizontal: 30 }}>
                                        {data.song}
                                    </Text>
                                    <View>
                                        <TouchableOpacity style={styles.buttonF} onPress={() => {
                                            clicked()

                                        }}>
                                            <View style={{ backgroundColor: "dodgerblue", borderRadius: 14, justifyContent: 'center', aalignItems: 'center' }} >
                                                <Text style={{ color: "#FFF", textAlign: 'center', padding: 5 }} >Down</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>)}
                    {songs.length == 0 ?

                        null
                        : (
                            <View style={{ height: '90%' }}>

                                <TouchableOpacity style={styles.b2}
                                    onPress={() => all()}>
                                    <Text>Download All</Text>
                                </TouchableOpacity>
                                <FlatList
                                    data={songs}
                                    keyExtractor={(item, id) => id.toString()}
                                    renderItem={({ item, id }) => (
                                        <View style={styles.songContainer}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <Image
                                                    style={{ height: 40, width: 40, borderRadius: 10 }}
                                                    source={{ uri: item.image[0].link }}
                                                />
                                                <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                                                    <Text
                                                        style={{ width: 150, color: '#FFF', fontSize: 14, marginHorizontal: 30 }}>
                                                        {item.name}
                                                    </Text>
                                                    <Text
                                                        style={{ width: 150, color: '#FFF', fontSize: 14, marginHorizontal: 30 }}>
                                                        {item.album.name}
                                                    </Text>
                                                    <Text
                                                        style={{ width: 150, color: '#FFF', fontSize: 14, marginHorizontal: 30 }}>
                                                        {item.language}
                                                    </Text>
                                                    {/* <Text
                                                        style={{ width: 150, color: '#FFF', fontSize: 14, marginHorizontal: 30 }}>
                                                        {item.downloadUrl[item.downloadUrl.length-1].link}
                                                    </Text> */}
                                                </View>

                                                <View>
                                                    <TouchableOpacity style={styles.buttonF} onPress={() => {

                                                        return new Promise((resolve, reject) => {

                                                            RNFetchBlob.fs.exists(RNFetchBlob.fs.dirs.DownloadDir + '/SavanD/' + item.title + '.m4a')
                                                                .then((exist) => {
                                                                    console.log(`file ${exist ? '' : 'not'} exists`)
                                                                    exist ? console.warn('Already exits') :
                                                                        RNFetchBlob
                                                                            .config({
                                                                                addAndroidDownloads: {
                                                                                    title: item.name,
                                                                                    useDownloadManager: true,
                                                                                    notification: true,
                                                                                    description: 'File downloaded by download manager.',
                                                                                    path: RNFetchBlob.fs.dirs.DownloadDir + '/SavanD/' + item.name + '.m4a'
                                                                                }
                                                                            })
                                                                            .fetch('GET', item.downloadUrl[item.downloadUrl.length-1].link)
                                                                            .then((resp) => {
                                                                                RNFetchBlob.android.actionViewIntent(resp.path(), '/')
                                                                            })
                                                                            .catch((error) => {
                                                                                console.log(error);
                                                                            })
                                                                })
                                                                .catch(() => { console.log('Not Exits error'); })


                                                        }).catch((error) => {
                                                            console.log(error);
                                                        })

                                                    }}>
                                                        <View style={{ backgroundColor: "dodgerblue", borderRadius: 14, marginTop:10, justifyContent: 'center', aalignItems: 'center' }} >
                                                            <Text style={{ color: "#FFF", textAlign: 'center', padding: 5 }} >Down</Text>
                                                        </View>
                                                      
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                    )}
                                />
                            </View>
                        )}

                </View>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    start: {
        marginTop: 10
    },
    b2: {
        marginTop: 10,
        alignSelf: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    button: {
        alignItems: "center",
        padding: 10,
        marginTop: 10,
    },
    buttonF: {
        width: 70,
        marginTop: 5,
        alignSelf: 'center',
    },
    error: {
        marginTop: 20,
        color: '#fff',
        borderRadius: 30,
        backgroundColor: 'tomato',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#333',
        padding: 10,
    },
    songContainer: {
        padding: 7,


        backgroundColor: '#111',
        borderRadius: 7,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    textInput: {
        textAlign: 'center',
        height: 40,
        width: '100%',
        backgroundColor: '#111',
        color: '#fff',
        fontSize: 14,
        marginTop: 40,
        borderRadius: 7,
        marginBottom: 20
    },
});
