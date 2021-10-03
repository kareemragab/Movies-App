import {StyleSheet} from 'react-native'
import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    SafeAreaView: {flex: 1, backgroundColor: '#20232A'},
    flex: {
        flex: 0,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    contentContainerSty: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 18,
    },
    headerStyle: {
        width,
        height: 100,
        paddingTop: 30,
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
    NoDataSty: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
    NoDataMsg: {
        fontSize: 22,
        color: '#888',
        textAlign: 'center',
    },
    titleMsg: {
        color: '#CCC',
        fontSize: 18,
        fontWeight: '500',
    },
    addMovie: {
        color: '#ff4c6f',
        fontWeight: 'bold',
        fontSize: 16,
    },
    myMovies: {
        color: '#ff4c6f',
        fontWeight: 'bold',
        fontSize: 24,
    },
    myMoviesHead: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 18,
    },
    imgMyMovie: {
        width: 90,
        height: 90,
        borderRadius: 24,
        backgroundColor: '#888',
        marginRight: 12,
        overflow: 'hidden',
    },
    moviesViewSty: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    headViewMap: {
        width: width / 2 - 28,
        height: width * 0.7,
        margin: 9,
        backgroundColor: '#4c4e54',
        padding: 9,
    },
    ImgMovieSty: {
        flex: 0.8,
        marginBottom: 9,
        backgroundColor: '#CCC',
        overflow: 'hidden',
    },
    headTitleSty: {
        flex: 0.24,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})

export default styles
