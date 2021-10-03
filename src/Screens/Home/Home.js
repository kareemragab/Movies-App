import React, {useState, useEffect, useRef} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useFocusEffect} from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
const {width, height} = Dimensions.get('window')
import axios from 'axios'
axios.defaults.timeout = 10000
import global from '../../api/global'

const Home = ({navigation}) => {
    const [Page, setPage] = useState(1)
    const [TotalPages, setTotalPages] = useState(0)
    const [Movies, setMovies] = useState([])
    const [MyMovies, setMyMovies] = useState([])

    console.log('TotalPages', MyMovies)

    useFocusEffect(
        React.useCallback(async () => {
            const myMovie = await AsyncStorage.getItem('myMovies')
            if (myMovie == null) {
                setMyMovies([])
            } else {
                setMyMovies(JSON.parse(myMovie))
            }
            GetData()
        }, [])
    )

    const GetData = () => {
        axios

            .get(global.API + 'movie/upcoming/', {
                params: {
                    api_key: '56fff997ef722ad11d5f6da54adf78a5',
                    language: 'en-US',
                    page: Page,
                    region: 'US',
                },
            })
            .then(function (response) {
                // console.log(response.data)
                // console.log(Page)
                // console.log(response.data.total_pages)
                setMovies(movies => [...movies, ...response.data.results])
                setPage(lastpage => lastpage + 1)
                setTotalPages(response.data.total_pages)
            })
            .catch(function (error) {
                // console.log(error)
                setTimeout(() => {
                    alert(error)
                }, 100)
            })
    }

    const renderHeader = () => {
        return (
            <View style={[styles.row, styles.headerStyle]}>
                <Text allowFontScaling={false} style={styles.textHomeSty}>
                    Home
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddMovie')
                    }}
                    style={[styles.row, styles.touchableHeaderSty]}>
                    <Entypo name="plus" style={styles.iconSty} />
                </TouchableOpacity>
            </View>
        )
    }

    const isCloseToBottom = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }) => {
        const paddingToBottom = 20
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        )
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <StatusBar backgroundColor="#20232A" barStyle="light-content" />
            {renderHeader()}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    // paddingTop: 18,
                }}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        console.log('----- End Page -----')
                        GetData()
                    }
                }}
                scrollEventThrottle={400}>
                <View style={{flex: 1, width, backgroundColor: '#20232A'}}>
                    {/* ---------- My Movies Header ---------- */}
                    <View style={[styles.row, styles.myMoviesHead]}>
                        <Text allowFontScaling={false} style={styles.myMovies}>
                            {'My Movies'}
                        </Text>
                        <Text
                            allowFontScaling={false}
                            onPress={() => navigation.navigate('AddMovie')}
                            style={styles.addMovie}>
                            {'Add Movie'}
                        </Text>
                    </View>
                    {/* ---------- My Movies ---------- */}
                    {MyMovies.length != 0 ? (
                        <View
                            style={[
                                styles.column,
                                {width: '100%', paddingHorizontal: 18},
                            ]}>
                            {MyMovies.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        key={index.toString()}
                                        style={[
                                            styles.column,
                                            {width: '100%'},
                                        ]}>
                                        <View
                                            style={[
                                                styles.row,
                                                {
                                                    marginBottom: 8,
                                                    paddingVertical: 18,
                                                    borderBottomColor:
                                                        '#C8C8C8',
                                                    borderBottomWidth: 0.2,
                                                },
                                            ]}>
                                            {!item.sendImg ? (
                                                <View style={styles.imgMyMovie}>
                                                    <Image
                                                        source={require('../../assets/images/soon.png')}
                                                        resizeMethod="resize"
                                                        style={{
                                                            flex: 1,
                                                            width: null,
                                                            height: null,
                                                        }}
                                                    />
                                                </View>
                                            ) : (
                                                <View style={styles.imgMyMovie}>
                                                    <Image
                                                        source={{
                                                            uri: item.sendImg,
                                                        }}
                                                        resizeMethod="resize"
                                                        style={{
                                                            flex: 1,
                                                            width: null,
                                                            height: null,
                                                        }}
                                                    />
                                                </View>
                                            )}

                                            <View
                                                style={[
                                                    styles.column,
                                                    {flex: 1, paddingTop: 8},
                                                ]}>
                                                <Text
                                                    allowFontScaling={false}
                                                    numberOfLines={2}
                                                    style={styles.titleMsg}>
                                                    {item.title}
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
                                                    numberOfLines={2}
                                                    style={{color: '#888'}}>
                                                    {item.desc}
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
                                                    numberOfLines={2}
                                                    style={{color: '#888'}}>
                                                    {item.date.split('T')[0]}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    ) : (
                        <View style={[styles.row, styles.NoDataSty]}>
                            <Text
                                allowFontScaling={false}
                                style={styles.NoDataMsg}>
                                {'No Data available , Please Add Movies'}
                            </Text>
                        </View>
                    )}

                    {/* ---------- All Movies Header---------- */}
                    <View
                        style={[
                            styles.row,
                            {
                                width: '100%',
                                alignItems: 'center',
                                marginTop: 30,
                                paddingHorizontal: 18,
                            },
                        ]}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: '#ff4c6f',
                                fontWeight: 'bold',
                                fontSize: 24,
                            }}>
                            {'All Movies'}
                        </Text>
                    </View>

                    {/* ---------- All Movies ---------- */}
                    {Movies.length != 0 ? (
                        <View
                            style={{
                                flex: 1,
                                width,
                                backgroundColor: '#20232A',
                            }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={
                                    styles.contentContainerSty
                                }>
                                <View
                                    style={[styles.row, styles.moviesViewSty]}>
                                    {Movies.map((item, index) => {
                                        return index == 0 ? (
                                            <View></View>
                                        ) : (
                                            <View
                                                key={index.toString()}
                                                style={[
                                                    styles.flex,
                                                    styles.column,
                                                    styles.headViewMap,
                                                ]}>
                                                <View
                                                    style={styles.ImgMovieSty}>
                                                    {item.poster_path ==
                                                    null ? (
                                                        <Image
                                                            source={require('../../assets/images/soon.png')}
                                                            resizeMethod="resize"
                                                            style={{
                                                                flex: 1,
                                                                width: null,
                                                                height: null,
                                                                resizeMode:
                                                                    'stretch',
                                                            }}
                                                        />
                                                    ) : (
                                                        <Image
                                                            source={{
                                                                uri:
                                                                    global.STORAGE_URL +
                                                                    item.poster_path,
                                                            }}
                                                            resizeMethod="resize"
                                                            style={{
                                                                flex: 1,
                                                                width: null,
                                                                height: null,
                                                                resizeMode:
                                                                    'stretch',
                                                            }}
                                                        />
                                                    )}
                                                </View>
                                                <View
                                                    style={[
                                                        styles.column,
                                                        styles.headTitleSty,
                                                    ]}>
                                                    <Text
                                                        allowFontScaling={false}
                                                        numberOfLines={1}
                                                        style={{
                                                            color: '#CCC',
                                                            fontSize: 16,
                                                            fontWeight: '500',
                                                        }}>
                                                        {item.title}
                                                    </Text>
                                                    <Text
                                                        allowFontScaling={false}
                                                        numberOfLines={1}
                                                        style={{
                                                            color: '#888',
                                                            fontSize: 12,
                                                        }}>
                                                        {item.overview}
                                                    </Text>
                                                    <View style={styles.row}>
                                                        <Text
                                                            allowFontScaling={
                                                                false
                                                            }
                                                            numberOfLines={1}
                                                            style={{
                                                                color: '#888',
                                                                fontSize: 12,
                                                            }}>
                                                            {item.release_date}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                                {Page <= TotalPages && (
                                    <View style={{marginBottom: 20}}>
                                        <ActivityIndicator
                                            size="large"
                                            color="#ff4c6f"
                                        />
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    ) : (
                        <View style={[styles.row, styles.NoDataSty]}>
                            <Text
                                allowFontScaling={false}
                                style={styles.NoDataMsg}>
                                {
                                    'No Data available , check your internet connection.'
                                }
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
