import React from 'react';
import { View, Text, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { ListItem, Form, Button } from 'native-base';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/token';
import {
    setUserId,
    setUserLoggedIn,
    setUserEmailPassword,
    setUserToken
} from '../actions/user';
import { setMyAgendaItemsEmpty } from '../actions/agenda';
import Moment from 'moment';
import styles from './styles';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            email: 'snharris@gmail.com',
            emailError: '',
            password: 'K@j@g00g00',
            passwordError: '',
            hasTouchIDSupport: false,
            hasFaceIDSupport: false,
            touchOrFace: 'Touch ID'
        };
    }

    componentDidMount() {
        if (__DEV__) {
            console.log('messaging props:  ');
            if (typeof console.dir === 'function') {
                console.dir(this.props);
            }
        }

        Moment.locale('en');
        var dt = this.props.userTokenExpirationDate;
        const expired = Moment().isAfter(Moment(dt));
        if (__DEV__) {
            console.log('messaging token expired: ' + expired);
        }

        if (
            !this.props.userToken ||
            this.props.userToken == '' ||
            !this.props.userTokenExpirationDate ||
            expired
        ) {
            const { dispatch } = this.props;
            dispatch(setUserLoggedIn(false));
        }

        if (
            this.props.userEmail &&
            this.props.userPassword &&
            this.props.userId
        ) {
            this.setState({ email: this.props.userEmail });
        }

        if (this.props.userLoggedIn) {
            //this.fetchGroups()
        }
    }

    //fetch data when token changes
    componentDidUpdate(prevProps) {
        if (
            prevProps.userToken != this.props.userToken ||
            prevProps.userLoggedIn != this.props.userLoggedIn
        ) {
            if (
                this.props.userLoggedIn &&
                this.props.userToken &&
                this.props.userToken != ''
            ) {
                //this.fetchGroups()
            }
        }
    }

    submitForm = async () => {
        //LOGIN
        try {
            const { dispatch } = this.props;
            dispatch(setUserId(null));
            dispatch(setUserEmailPassword(null, null));
            dispatch(setUserToken(null, null));
            dispatch(setUserLoggedIn(false));
            dispatch(setMyAgendaItemsEmpty());
            //AsyncStorage.removeItem("userId");
            //AsyncStorage.removeItem("idToken");
            //AsyncStorage.removeItem("tokenExpiration");

            this.props.navigation.navigate('EventSearch');
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <ListItem itemDivider style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>MESSAGING</Text>
                </ListItem>
                <ListItem>
                    <Text>
                        Please log in or register to access messaging
                        functionality.
                    </Text>
                </ListItem>

                <Form style={styles.form}>
                    <View>
                        <Button
                            style={styles.button}
                            rounded
                            light
                            onPress={this.submitForm}
                        >
                            <Text>Submit</Text>
                        </Button>
                    </View>
                </Form>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
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
        userPassword
    };
};

export default connect(mapStateToProps)(Logout);
