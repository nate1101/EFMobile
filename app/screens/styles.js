import { StyleSheet } from 'react-native';
//import { COLORS } from '../../config'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#FFF'
    },
    landingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    animatedLogo: {
        width: 225,
        //height: 200,
        justifyContent: 'center',
        resizeMode: 'contain',
        marginTop: -80,
        marginLeft: -15
        //backgroundColor: 'red'
    },
    mainLogo: {
        width: 200,
        alignSelf: 'center'
    },
    sectionHeader: {
        backgroundColor: '#656565'
    },
    sectionHeaderText: {
        color: '#000',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    listItemText: {
        fontSize: 16
    },
    button: {
        width: 250,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: '#1b859d',
        //backgroundColor: '#5d939f',
        marginTop: 5,
        borderWidth: 2
    },
    button2: {
        width: '60%',
        height: 36,
        margin: 10,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    touchIdButton: {
        width: 80,
        height: 80,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    faceIdButton: {
        width: 60,
        height: 60,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    form: {
        margin: 12
        //backgroundColor: '#FFF'
    },
    modalHeaderBody: {
        //justifyContent: 'center',
        alignSelf: 'center'
        //alignContent: 'center',
    },
    modalHeader: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    errorText: {
        color: '#C00',
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 16,
        marginTop: 10
    }
});
