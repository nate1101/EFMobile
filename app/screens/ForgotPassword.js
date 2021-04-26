import React from 'react';
import { View, Text, KeyboardAvoidingView, Alert } from 'react-native';
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
import URLS from '../config/API';
//import Spinner from 'react-native-loading-spinner-overlay'
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './styles';
//import GlobalStyles from '../../components/GlobalStyles'
import validate from '../utilities/validate_wrapper';

const SUCCESS_CODE = 130;

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            email: '',
            emailError: '',
            submitted: false
        };
    }

    /* static navigationOptions = {
        header: null
    }; */

    // componentDidMount() {
    // }

    submitForm = async () => {
        let { email } = this.state;

        const emailError = validate('email', email);

        this.setState({
            emailError: emailError
        });

        if (emailError) {
            alert(emailError);
        } else {
            //LOGIN
            try {
                this.setState({ loading: true });

                const api = `${URLS.forgotPassword}?Username=${
                    this.state.email
                }`;

                if (__DEV__) {
                    console.log(
                        'submitted: email: ' + this.state.email + ' api: ' + api
                    );
                }

                const response = await axios.post(api);

                if (__DEV__) {
                    console.log('FORGOT_PASSWORD_RESULT:  ');
                    if (typeof console.dir === 'function') {
                        console.dir(response.data);
                    }
                }

                this.setState({ loading: false });

                //save to redux if we were successful
                //if (response.data['code'] == SUCCESS_CODE) {
                //    //alert("success!")
                this.setState({
                    submitted: true
                });
                //} else {
                //    const message = response.data['message']
                //        ? response.data['message']
                //        : ''
                //    this.showAlert(
                //        'There has been a problem with the password reset. ' +
                //            message +
                //            ' - Please check that you used the correct email address and try again later.'
                //    )
                //}
            } catch (error) {
                this.setState({ loading: false });
                console.log(error);
                this.showAlert(
                    'There has been a problem with the password reset. Please check that you used the correct email address and try again later.'
                );
            }
        }
    };

    showAlert = message => {
        setTimeout(() => {
            Alert.alert('', message, [{ text: 'OK', style: 'cancel' }], {
                cancelable: true
            });
        }, 100);
    };

    donePressed = () => {
        this.props.navigation.navigate('Login');
    };

    render() {
        const { emailError } = this.state;

        if (this.state.submitted) {
            return (
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                    <Content>
                        <Header
                            style={{ height: 150, backgroundColor: '#FFF' }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    height: 150,
                                    textAlignVertical: 'center',
                                    fontWeight: 'bold',
                                    padding: 20
                                }}
                            >
                                Instructions to reset your password have been
                                sent to your email. After resetting your
                                password, please return to the app to login.
                            </Text>
                        </Header>

                        <Form style={styles.form}>
                            <View>
                                <Button
                                    style={styles.button}
                                    rounded
                                    light
                                    onPress={this.donePressed}
                                >
                                    <Text>Done</Text>
                                </Button>
                            </View>
                        </Form>
                    </Content>
                </KeyboardAvoidingView>
            );
        } else {
            return (
                <KeyboardAvoidingView style={styles.container}>
                    {/* <Spinner
                        visible={this.state.loading}
                        textStyle={styles.spinnerTextStyle}
                    /> */}
                    <Content>
                        <Header
                            style={{ height: 150, backgroundColor: '#FFF' }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    height: 150,
                                    textAlignVertical: 'center',
                                    fontWeight: 'bold',
                                    padding: 20
                                }}
                            >
                                Enter your email to reset your password.
                            </Text>
                        </Header>

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
                                    returnKeyType='done'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    keyboardType='email-address'
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
            );
        }
    }
}

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
    const { userLoggedIn } = state.user;

    return {
        token,
        tokenSet,
        userLoggedIn
    };
};

export default connect(mapStateToProps)(ForgotPassword);
