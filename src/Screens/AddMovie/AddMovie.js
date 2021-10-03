import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ActivityIndicator,
    Alert,
    ToastAndroid,
    TextInput,
} from 'react-native'
import Textarea from 'react-native-textarea'
import ImagePicker from 'react-native-image-crop-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles'
const {width, height} = Dimensions.get('window')

const AddMovie = ({navigation, route}) => {
    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [Processing, setProcessing] = useState(false)
    const [isPickerShow, setIsPickerShow] = useState(false)
    const [date, setDate] = useState(new Date())
    const [image, setImage] = useState([])

    const showPicker = () => {
        setIsPickerShow(true)
    }

    const onChange = (event, value) => {
        console.log('event', event)
        console.log('value', value)

        if (Platform.OS === 'android') {
            setIsPickerShow(false)
        }
        if (isPickerShow && value) {
            setDate(value)
        }
    }
    const renderHeader = () => {
        return (
            <View style={[styles.row, styles.headerStyle]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={[styles.row, styles.touchableHeaderSty]}>
                    <Feather name="arrow-left" style={styles.iconSty} />
                </TouchableOpacity>

                <Text allowFontScaling={false} style={styles.textHomeSty}>
                    Add Movie
                </Text>
            </View>
        )
    }

    const pickImageFromPhone = () => {
        try {
            ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
                compressImageQuality: 0.5,
            }).then(images => {
                setProcessing(true)
                Platform.OS == 'android'
                    ? ToastAndroid.show(
                          'يتم الان تحميل الصورة',
                          ToastAndroid.SHORT
                      )
                    : Alert.alert('يتم الان تحميل الصورة')
                for (let index = 0; index < images.length; index++) {
                    if (Platform.OS === 'android') {
                        source = {
                            uri:
                                Platform.OS === 'android'
                                    ? images[index].path
                                    : images[index].sourceURL.replace(
                                          'file://',
                                          ''
                                      ),
                            fileName: images[index].modificationDate,
                            type: images[index].mime,
                        }
                        var arr = [...image]
                        setImage([source.uri])
                        console.log('*-----*', [source.uri])
                        // setImage([source.uri])
                    } else {
                        source = {
                            uri:
                                Platform.OS === 'android'
                                    ? images[index].sourceURL
                                    : images[index].sourceURL.replace(
                                          'file://',
                                          ''
                                      ),
                            fileName: images[index].filename,
                            type: images[index].filename.split('.')[1],
                        }
                        setImage([source.uri])
                    }
                }
                setProcessing(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addMovie = async () => {
        if (!desc || !date || !image || !title) {
            Alert.alert('Sorry :)', 'Please Enter All Data')
        } else {
            let sendImg = image[0]
            const update = await AsyncStorage.getItem('myMovies')
            let Data = []
            if (update) {
                Data = [...JSON.parse(update)]
            }
            Data.push({sendImg, title, date, desc})
            await AsyncStorage.setItem('myMovies', JSON.stringify(Data))

            console.log(sendImg, 'sendImg')
            navigation.navigate('Home')
        }
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <StatusBar backgroundColor="#20232A" barStyle="light-content" />
            <View style={{flex: 1, width, backgroundColor: '#20232A'}}>
                {renderHeader()}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}>
                    <View style={styles.borderedField}>
                        {image.length == 0 && !Processing && (
                            <View style={styles.addPhotoBtnBordered}>
                                <Image
                                    style={styles.addPhotoBtnImgBordered}
                                    source={require('../../assets/images/soon.png')}
                                />
                            </View>
                        )}
                        {image.length == 0 && Processing && (
                            <View style={{margin: 12}}>
                                <ActivityIndicator size="small" color="#000" />
                            </View>
                        )}
                        {image.length > 0 &&
                            !Processing &&
                            image.map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={styles.addPhotoBtnBordered}>
                                        <Image
                                            style={
                                                styles.addPhotoBtnImgBordered
                                            }
                                            source={{
                                                uri: item,
                                            }}
                                        />
                                    </View>
                                )
                            })}
                        {image.length > 0 &&
                            Processing &&
                            image.map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={styles.addPhotoBtnBordered}>
                                        <ActivityIndicator
                                            size="small"
                                            color="#000"
                                        />
                                    </View>
                                )
                            })}
                    </View>

                    <View style={styles.addPhotoBtnRow}>
                        <TouchableOpacity
                            onPress={() => {
                                pickImageFromPhone()
                            }}
                            style={styles.addPhotoBtn}>
                            <FontAwesome
                                name="image"
                                color={'grey'}
                                size={34}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.borderedField}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => {
                                setTitle(text)
                            }}
                            value={title}
                            placeholderTextColor="#000"
                            placeholder="Title"
                            textAlign={styles.textInputAlign.textAlign}
                        />
                    </View>

                    <TouchableOpacity onPress={showPicker}>
                        <View style={styles.borderedField}>
                            <TextInput
                                style={styles.textInput}
                                value={
                                    new Date(date).getFullYear() +
                                    '-' +
                                    (new Date(date).getMonth() + 1) +
                                    '-' +
                                    new Date(date).getDate()
                                }
                                placeholder="Title"
                                textAlign={styles.textInputAlign.textAlign}
                                editable={false}
                            />
                        </View>
                    </TouchableOpacity>

                    {isPickerShow && (
                        <DateTimePicker
                            value={date}
                            mode={'date'}
                            display={
                                Platform.OS === 'ios' ? 'spinner' : 'default'
                            }
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}

                    <View style={styles.borderedField}>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={text => {
                                setDesc(text)
                            }}
                            value={desc}
                            maxLength={250}
                            placeholder="Overview"
                            placeholderTextColor="#000"
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            addMovie()
                        }}
                        style={styles.loginBtn}>
                        <Text
                            allowFontScaling={false}
                            style={styles.loginBtnTxt}>
                            Add Movie
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default AddMovie
