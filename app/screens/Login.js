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
    AsyncStorage
} from 'react-native';
import {
    ListItem,
    Form,
    Input,
    Item,
    Content,
    Label,
    Button,
    Header
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
import { setMyAgendaItems, getMyAgendaItemsSuccess } from '../actions/agenda';
import validate from '../utilities/validate_wrapper';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            error: ''
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
                console.log('DID UPDATE');
            }
        }
    }

    submitForm = async () => {
        let { email, password } = this.state;
        const { token, eventId, navigation } = this.props;
        const redirectTo = navigation.getParam('redirectTo', '0');
        console.log('REDIRECTTO');
        console.log(redirectTo);

        const emailError = validate('email', email);
        const passwordError = validate('password', password);

        this.setState({
            emailError: emailError,
            passwordError: passwordError
        });

        if (emailError) {
            alert(emailError);
        } else if (passwordError) {
            alert(passwordError);
        } else {
            if (__DEV__) {
                console.log('submitted: email: ' + email);
            }

            const submittedEmail = email;
            const submittedPassword = password;

            //LOGIN
            try {
                const api = `${URLS.authenticateUser}`;
                const response = await axios.post(api, {
                    userName: this.state.email,
                    password: this.state.password
                });
                if (__DEV__) {
                    console.log('MESSAGIN_LOGIN_RESULT:  ');
                    if (typeof console.dir === 'function') {
                        console.dir(response.data);
                    }
                }

                //save to redux if we were successful
                if (response.data['token'] != null) {
                    //alert("success!")

                    const { dispatch } = this.props;

                    console.log('SUBMIT');
                    console.log(eventId);
                    console.log(token);
                    console.log(response.data['userId']);
                    dispatch(setUserId(response.data['userId']));
                    dispatch(
                        setUserEmailPassword(submittedEmail, submittedPassword)
                    );
                    dispatch(
                        setUserToken(
                            response.data['token'],
                            response.data['tokenExpiration']
                        )
                    );
                    dispatch(setUserLoggedIn(true));

                    try {
                        const api = `${URLS.myAgendaItems}/${eventId}/${
                            response.data['userId']
                        }`;
                        console.log(api);
                        var result = await axios.get(api, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        this.props.dispatch(
                            getMyAgendaItemsSuccess(result.data)
                        );
                    } catch (error) {
                        console.log(error);
                    }

                    /* dispatch(
                        setMyAgendaItems(
                            eventId,
                            response.data['userId'],
                            token
                        )
                    ); */
                    //AsyncStorage.setItem('userId', response.data['userId']);
                    //AsyncStorage.setItem('idToken', response.data['token']);
                    //AsyncStorage.setItem(
                    //    'tokenExpiration',
                    //    response.data['tokenExpiration']
                    //);

                    console.log('REDIRECT');
                    console.log(redirectTo);
                    if (redirectTo == '0') {
                        this.props.navigation.goBack(); //navigate("MyAgenda");
                    } else {
                        this.props.navigation.navigate(redirectTo);
                    }
                }
            } catch (error) {
                this.setState({
                    error:
                        'Incorrect email or password. Please check your credentials and try again.'
                });
            }
        }
    };

    goToRegistration = () => {
        const { token, eventId, navigation } = this.props;
        const redirectTo = navigation.getParam('redirectTo', '0');
        this.props.navigation.navigate('RegisterModal', {
            redirectTo: redirectTo
        });
        // , {
        //     broadcastOptionVideoLink: item.broadcastOptionVideoLink,
        //     teamName: item.teamName,
        // })
    };

    goToForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    };

    focusPasswordInput = () => {
        if (__DEV__) {
            console.log('calling focus');
        }
        this._passwordInput._root.focus();
    };

    render() {
        var { userLoggedIn } = this.props;
        const { emailError, passwordError } = this.state;
        const { navigation } = this.props;

        return (
            <KeyboardAvoidingView style={styles.container}>
                <Header style={{ height: 80, backgroundColor: '#FFF' }}>
                    <Text
                        numberOfLines={2}
                        style={{
                            fontSize: 18,
                            textAlign: 'center',
                            height: 80,
                            textAlignVertical: 'center',
                            fontWeight: 'bold',
                            paddingBottom: 20,
                            paddingLeft: 20,
                            paddingRight: 20
                        }}
                    >
                        Please log in or register to gain access to more
                        features.
                    </Text>
                </Header>
                <Text style={styles.errorText}>{this.state.error}</Text>
                <Form style={styles.form}>
                    <Item stackedLabel>
                        <Label style={styles.labelText}>Email</Label>
                        <Input
                            style={styles.input}
                            //placeholder='Email'
                            ref={c => (this._emailInput = c)}
                            value={this.state.email}
                            onChangeText={value =>
                                this.setState({ email: value.trim() })
                            }
                            returnKeyType='next'
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            onSubmitEditing={this.focusPasswordInput}
                            onBlur={() => {
                                this.setState({
                                    emailError: validate(
                                        'email',
                                        this.state.email
                                    )
                                });
                            }}
                        />
                    </Item>
                    <Text style={styles.errorText}>
                        {' '}
                        {emailError ? emailError : null}
                    </Text>
                    <Item stackedLabel>
                        <Label style={styles.labelText}>Password</Label>
                        <Input
                            style={styles.input}
                            //placeholder='Password'
                            ref={c => (this._passwordInput = c)}
                            value={this.state.password}
                            onChangeText={value =>
                                this.setState({ password: value.trim() })
                            }
                            secureTextEntry
                            returnKeyType='done'
                            autoCapitalize='none'
                            onBlur={() => {
                                this.setState({
                                    passwordError: validate(
                                        'password',
                                        this.state.password
                                    )
                                });
                            }}
                        />
                    </Item>
                    <Text style={styles.errorText}>
                        {' '}
                        {passwordError ? passwordError : null}
                    </Text>
                    <View>
                        <Button
                            style={styles.button}
                            rounded
                            bordered
                            info
                            onPress={this.submitForm}
                        >
                            <Text>Log In</Text>
                        </Button>
                    </View>
                    {/* <View>
            <Button
              style={styles.button}
              rounded
              light
              onPress={() => navigation.goBack()}
            >
              <Text>Cancel</Text>
            </Button>
          </View> */}
                </Form>
                <View>
                    <Button
                        style={styles.button2}
                        rounded
                        transparent
                        onPress={this.goToRegistration}
                    >
                        <Text style={{ color: 'blue' }}>
                            Not Registered? Click Here
                        </Text>
                    </Button>
                    <Button
                        style={styles.button}
                        transparent
                        onPress={this.goToForgotPassword}
                    >
                        <Text style={{ color: 'blue' }}>Forgot Password?</Text>
                    </Button>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
    const { eventId } = state.event;
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
        eventId
    };
};

export default connect(mapStateToProps)(Login);
