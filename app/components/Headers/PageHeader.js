import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Col, Row } from 'react-native-easy-grid';

export default function PageHeader({ onPress }) {
    return (
        <View>
            <StatusBar barStyle='light-content' />
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Image
                        source={require('../../../assets/images/header.png')}
                        resizeMode='contain'
                        style={styles.mainImageHeader}
                    />
                </View>
                <TouchableOpacity onPress={onPress} style={styles.barButton}>
                    <Icon
                        name='bars'
                        color='white'
                        size={moderateScale(32, 0.2)}
                    />
                </TouchableOpacity>
            </View>
            {/* <View style={styles.header}>
                <Row>
                    <Col style={{ width: 100, backgroundColor: 'red' }}>
                        <TouchableOpacity
                            onPress={onPress}
                            style={styles.barButton}
                        >
                            <Icon
                                name='bars'
                                color='white'
                                size={moderateScale(32, 0.2)}
                            />
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        <View style={styles.titleContainer}>
                            <Image
                                source={require('../../../assets/images/header.png')}
                                resizeMode='contain'
                                style={styles.mainImageHeader}
                            />
                        </View>
                    </Col>
                    <Col style={{ width: 100 }} />
                </Row>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center'
        //width: 50
        //flexDirection: 'column'
    },
    mainImageHeader: {
        height: 25,
        width: 80,
        marginTop: 15,
        alignSelf: 'center'
        //backgroundColor: '#000'
    },
    header: {
        //flex: 1,
        //flexDirection: 'row',
        //justifyContent: 'space-around',
        //alignContent: 'center',
        height: 60,
        backgroundColor: '#1b859d'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
        padding: 10
    },
    barButton: {
        position: 'absolute',
        //flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 10,
        height: 50,
        width: 50,
        //marginLeft: 10,
        //backgroundColor: '#000',
        alignSelf: 'flex-start'
        //width: 100
    },
    headerTitle: {
        alignSelf: 'center',
        fontSize: 24,
        color: 'white',

        marginLeft: -20
    },
    whitebar: {
        flex: 1,
        height: 4,
        backgroundColor: 'white'
    }
});
