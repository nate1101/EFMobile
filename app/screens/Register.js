import React from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    AsyncStorage,
    Alert
} from 'react-native';
import {
    Container,
    CardItem,
    Left,
    Body,
    Right,
    Icon,
    ListItem,
    Form,
    Input,
    Item,
    Content,
    Label,
    Button
} from 'native-base';

import { URLS } from '../config';
import axios from 'axios';
import { connect } from 'react-redux';

import styles from './styles';
import validate from '../utilities/validate_wrapper';
import {
    setUserId,
    setUserLoggedIn,
    setUserEmailPassword,
    setUserToken
} from '../actions/user';
import { setMyAgendaItems, getMyAgendaItemsSuccess } from '../actions/agenda';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            firstName: '',
            firstNameError: '',
            lastName: '',
            lastNameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            password2: '',
            password2Error: ''
        };
    }

    static navigationOptions = {
        header: null
    };

    // componentDidMount() {
    // }

    submitForm = async () => {
        let { firstName, lastName, email, password, password2 } = this.state;
        const { token, eventId, navigation } = this.props;
        const redirectTo = navigation.getParam('redirectTo', '0');

        if (__DEV__) {
            console.log(firstName, lastName);
        }

        const firstNameError = validate('firstName', firstName);
        const lastNameError = validate('lastName', lastName);
        const emailError = validate('email', email);
        const passwordError = validate('password', password);
        var password2Error = validate('password', password2);
        if (
            (!password2Error || password2Error == '') &&
            (!passwordError || passwordError == '')
        ) {
            if (password != password2) {
                password2Error = 'Passwords need to match.';
            }
        }

        this.setState({
            firstNameError: firstNameError,
            lastNameError: lastNameError,
            emailError: emailError,
            passwordError: passwordError,
            password2Error: password2Error
        });

        if (
            firstNameError ||
            lastNameError ||
            emailError ||
            passwordError ||
            password2Error
        ) {
            if (firstNameError) {
                alert(firstNameError);
            } else if (lastNameError) {
                alert(lastNameError);
            } else if (emailError) {
                alert(emailError);
            } else if (passwordError) {
                alert(passwordError);
            } else if (password2Error) {
                alert(password2Error);
            }
        } else {
            //Register
            try {
                const api = `${URLS.registerUser}`;
                const response = await axios.post(api, {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userName: email,
                    password: password,
                    passwordConfirmation: password
                });
                if (__DEV__) {
                    console.log('REGISTER_RESULT:  ');
                    if (typeof console.dir === 'function') {
                        console.dir(response.data);
                    }
                }

                //save to redux if we were successful
                if (response.data['token'] != null) {
                    //alert("success!")

                    const { dispatch } = this.props;

                    console.log('SUBMIT');
                    console.log(token);
                    console.log(response.data['userId']);
                    dispatch(setUserId(response.data['userId']));
                    dispatch(setUserEmailPassword(email, password));
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
                    //dispatch(
                    //    setMyAgendaItems(
                    //        eventId,
                    //        response.data['userId'],
                    //        token
                    //    )
                    //);

                    //AsyncStorage.setItem("userId", response.data["userId"]);
                    //AsyncStorage.setItem("idToken", response.data["token"]);
                    //AsyncStorage.setItem(
                    //  "tokenExpiration",
                    //  response.data["tokenExpiration"]
                    //);
                    Alert.alert(
                        'Registration Successful',
                        'You have successfully registered your account.'
                    );
                    console.log('REDIRECT');
                    console.log(redirectTo);
                    if (redirectTo == '0') {
                        this.props.navigation.goBack(); //navigate("MyAgenda");
                    } else {
                        this.props.navigation.navigate(redirectTo);
                    }
                } else {
                    const message = response.data[0]['description']
                        ? response.data[0]['description']
                        : response.data[0];
                    alert(
                        'There has been a problem with the registration. ' +
                            message
                    );
                }
            } catch (error) {
                alert('An error occurred, please try again later. ' + error);
            }
        }
    };

    focusLastName = () => {
        this._lastnameInput._root.focus();
    };
    focusEmail = () => {
        //this._emailInput._root.focus();
        this._emailInput._root.focus();
    };
    focusPasswordInput = () => {
        this._passwordInput._root.focus();
    };
    focusPassword2Input = () => {
        this._password2Input._root.focus();
    };

    render() {
        const { navigation } = this.props;
        const {
            firstNameError,
            lastNameError,
            emailError,
            passwordError,
            password2Error
        } = this.state;

        return (
            <Container>
                <CardItem>
                    <Left>
                        <Button
                            icon
                            rounded
                            light
                            textStyle={{ color: '#87838B' }}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name='ios-close' style={{ fontSize: 30 }} />
                        </Button>
                    </Left>
                    <Body style={styles.modalHeaderBody}>
                        <Text style={styles.modalHeader}>REGISTER</Text>
                    </Body>
                    <Right>
                        <Text> </Text>
                    </Right>
                </CardItem>

                <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                    <Content>
                        <Form style={styles.form}>
                            <Item stackedLabel>
                                <Label style={styles.labelText}>
                                    First Name
                                </Label>
                                <Input
                                    style={styles.input}
                                    ref={c => (this._firstnameInput = c)}
                                    value={this.state.firstName}
                                    onChangeText={value =>
                                        this.setState({
                                            firstName: value.trim()
                                        })
                                    }
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    autoCapitalize='words'
                                    onSubmitEditing={this.focusLastName}
                                    onBlur={() => {
                                        this.setState({
                                            firstNameError: validate(
                                                'firstName',
                                                this.state.firstName
                                            )
                                        });
                                    }}
                                />
                            </Item>
                            <Text style={styles.errorText}>
                                {' '}
                                {firstNameError ? firstNameError : null}
                            </Text>
                            <Item stackedLabel>
                                <Label style={styles.labelText}>
                                    Last Name
                                </Label>
                                <Input
                                    style={styles.input}
                                    ref={c => (this._lastnameInput = c)}
                                    value={this.state.lastName}
                                    onChangeText={value =>
                                        this.setState({
                                            lastName: value.trim()
                                        })
                                    }
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    autoCapitalize='words'
                                    onSubmitEditing={this.focusEmail}
                                    onBlur={() => {
                                        this.setState({
                                            lastNameError: validate(
                                                'lastName',
                                                this.state.lastName
                                            )
                                        });
                                    }}
                                />
                            </Item>
                            <Text style={styles.errorText}>
                                {' '}
                                {lastNameError ? lastNameError : null}
                            </Text>
                            <Item stackedLabel>
                                <Label style={styles.labelText}>Email</Label>
                                <Input
                                    style={styles.input}
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
                                    ref={c => (this._passwordInput = c)}
                                    value={this.state.password}
                                    onChangeText={value =>
                                        this.setState({
                                            password: value.trim()
                                        })
                                    }
                                    secureTextEntry
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    onSubmitEditing={this.focusPassword2Input}
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
                            <Item stackedLabel>
                                <Label style={styles.labelText}>
                                    Password Confirmation
                                </Label>
                                <Input
                                    style={styles.input}
                                    ref={c => (this._password2Input = c)}
                                    value={this.state.password2}
                                    onChangeText={value =>
                                        this.setState({
                                            password2: value.trim()
                                        })
                                    }
                                    secureTextEntry
                                    returnKeyType='done'
                                    autoCapitalize='none'
                                    onBlur={() => {
                                        this.setState({
                                            password2Error: validate(
                                                'password',
                                                this.state.password2
                                            )
                                        });
                                    }}
                                />
                            </Item>
                            <Text style={styles.errorText}>
                                {' '}
                                {password2Error ? password2Error : null}
                            </Text>
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
                    </Content>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
    const { roles, userLoggedIn, userIsAdmin } = state.user;
    const { eventId } = state.event;
    return {
        token,
        tokenSet,
        roles,
        userLoggedIn,
        userIsAdmin,
        eventId
    };
};

export default connect(mapStateToProps)(Register);
