import {StyleSheet} from 'react-native'
import {Dimensions, I18nManager} from 'react-native'
const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    SafeAreaView: {flex: 1, backgroundColor: '#20232A'},
    flex: {
        flex: 0,
    },
    row: {
        flexDirection: 'row',
    },
    headerStyle: {
        width,
        height: 100,
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
    },
    textHomeSty: {color: '#FFF', fontWeight: 'bold', fontSize: 28},
    touchableHeaderSty: {
        backgroundColor: '#fedc33',
        width: 38,
        height: 38,
        borderRadius: 38 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSty: {color: '#20232A', fontSize: 25},

    borderedField: {
        width: '90%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fedc33',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 22,
        paddingTop: 12,
    },
    addPhotoBtnImgBordered: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
    },
    addPhotoBtnRow: {
        // flexDirection: 'row',
        marginTop: 10,
    },
    textInputAlign: {
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        justifyContent: 'flex-start',
    },
    textInput: {
        flex: 1,
        borderRadius: 8,
        marginHorizontal: 0,
        height: 40,
        paddingHorizontal: 14,
        backgroundColor: '#888',
        color: '#000',
    },
    textareaContainer: {
        height: 150,
        padding: 8,
        backgroundColor: '#888',
        borderRadius: 8,
        borderColor: '#fedc33',
        paddingLeft: 12,
    },
    textarea: {
        textAlignVertical: 'top', // hack android
        height: 170,
        fontFamily: 'Cairo-Bold',
        fontSize: 14,
        color: '#333',
    },
    addPhotoBtnBordered: {
        margin: 12,
        borderRadius: 8,
        borderColor: '#888',
        borderWidth: 1,
        overflow: 'hidden',
    },

    loginBtn: {
        width: '90%',
        backgroundColor: '#e6b838',
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: '42%',
        alignSelf: 'center',
    },
    loginBtnTxt: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#000',
    },
})

export default styles
