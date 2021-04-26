import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    AsyncStorage,
    Animated,
    Easing,
    TouchableWithoutFeedback
} from 'react-native';
import {
    ListItem,
    Form,
    Input,
    Item,
    Content,
    Label,
    Button,
    Header,
    Container
} from 'native-base';
import { URLS } from '../config';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/token';
import {
    setUserId,
    setUserLoggedIn,
    setUserEmailPassword,
    setUserToken
} from '../actions/user';
import Moment from 'moment';
import styles from './styles';
import { setMyAgendaItems } from '../actions/agenda';
import validate from '../utilities/validate_wrapper';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    executePushForNewLaunch,
    resetData
} from '../utilities/PushNotifications';
import AnimatedLogo from '../components/Interactive/AnimatedLogo';

class AuthChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'none'
        };
        this.moveAnimation = new Animated.ValueXY({ x: 0, y: 0 });
        this.buttonAnimation = new Animated.Value(0);
    }
    //static navigationOptions = {
    //  header: null
    //};

    goToEventSearch = () => {
        const { token, eventId, navigation } = this.props;
        this.props.navigation.navigate('Search');
    };

    goToLogin = () => {
        this.props.navigation.navigate('Login', { redirectTo: 'EventSearch' });
    };

    _moveLogo = () => {
        Animated.timing(this.moveAnimation, {
            toValue: { x: 0, y: -200 },
            speed: 12,
            duration: 750
            //delay: 1000
        }).start();
    };

    _showButton1 = () => {
        Animated.timing(this.buttonAnimation, {
            toValue: 1,
            //speed: 12,
            duration: 2000
            //delay: 1000
        }).start();
    };

    componentDidMount() {
        this._moveLogo();
        this._showButton1();
        if (__DEV__) {
            console.log(
                'saved notification token: ' + this.props.notificationToken
            );
        }
        //code for below function is in the PushNotificationHelper in utilities
        //----------------------------------------------------------------------
        //resetData(this.props) //uncomment to reset push notification (and comment next line)
        executePushForNewLaunch(this.props);
    }

    render() {
        return (
            <View style={styles.landingContainer}>
                <Animated.Image
                    style={[
                        styles.animatedLogo,
                        this.moveAnimation.getLayout()
                    ]}
                    source={require('../../assets/images/logo.png')}
                />
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            top: 300,
                            opacity: this.buttonAnimation
                        }
                        //this.buttonAnimation.getLayout()
                    ]}
                >
                    <Button
                        rounded
                        bordered
                        style={styles.button}
                        onPress={this.goToEventSearch}
                    >
                        <Text style={{ color: '#1b859d', fontWeight: 'bold' }}>
                            Search For Events
                        </Text>
                    </Button>
                    <Button
                        rounded
                        bordered
                        style={styles.button}
                        onPress={this.goToLogin}
                    >
                        <Text style={{ color: '#1b859d', fontWeight: 'bold' }}>
                            Login
                        </Text>
                    </Button>
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
    const { eventId } = state.event;
    const { notificationToken, dontAskUserAgain } = state.notifications;

    const {
        roles,
        userLoggedIn,
        userIsAdmin,
        userId,
        userToken,
        userTokenExpirationDate,
        userEmail,
        userPassword
    } = state.user;

    return {
        token,
        tokenSet,
        roles,
        userLoggedIn,
        userIsAdmin,
        userId,
        userToken,
        userTokenExpirationDate,
        userEmail,
        userPassword,
        eventId,
        notificationToken,
        dontAskUserAgain
    };
};

export default connect(mapStateToProps)(AuthChoice);
