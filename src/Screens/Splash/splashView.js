import React, {useState, useEffect} from 'react'
import {
    View,
    Image,
    SafeAreaView,
    StatusBar,
    Dimensions,
    StyleSheet,
    ScrollView,
} from 'react-native'
import styles from './styles'
import {CommonActions} from '@react-navigation/native'
const {width, height} = Dimensions.get('window')

const SplashView = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                })
            )
        }, 1500)
    }, [])

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <StatusBar backgroundColor="#0f303f" barStyle="dark-content" />
            <View style={{flex: 1, width, backgroundColor: '#0f303f'}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerSty}>
                    <View
                        style={[
                            styles.row,
                            {width: '100%', justifyContent: 'center'},
                        ]}>
                        <View style={styles.ImgSty}>
                            <Image
                                source={require('../../assets/images/movies.png')}
                                style={{
                                    flex: 1,
                                    width: null,
                                    height: null,
                                    resizeMode: 'cover',
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SplashView
