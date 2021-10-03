import {StyleSheet} from 'react-native'
import {Dimensions, I18nManager} from 'react-native'
const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    flex: {
        flex: 0,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    rowReverse: {
        flexDirection: 'row-reverse',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    ImgSty: {width: width / 3, height: width / 3},
    contentContainerSty: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    SafeAreaView: {flex: 1, backgroundColor: '#20232A'},
})

export default styles
