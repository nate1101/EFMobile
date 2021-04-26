import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    Switch
} from 'react-native';
import { ListItem, Left, Body, Right } from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './styles';
import {
    setUserId,
    setUserLoggedIn,
    setUserEmailPassword,
    setUserToken
} from '../actions/user';
import { setMyAgendaItemsEmpty } from '../actions/agenda';
import { URLS } from '../config';
import { Constants } from 'expo';
import { optInReceivePushes } from '../utilities/PushNotifications';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationActive: false,
            pushGranted: true
        };
    }
    onLogout = async => {
        Alert.alert(
            'Log out?',
            'Are you sure you want to log out?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        try {
                            const { dispatch } = this.props;
                            dispatch(setUserId(null));
                            dispatch(setUserEmailPassword(null, null));
                            dispatch(setUserToken(null, null));
                            dispatch(setUserLoggedIn(false));
                            dispatch(setMyAgendaItemsEmpty());
                            console.log('LOGGING OUT');
                            //this.props.navigation.navigate('EventSearch');
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };

    onSignIn = async => {
        this.props.navigation.navigate('Login');
    };

    isNotificationActive = async token => {
        const { notificationToken } = this.props;

        try {
            const api = `${URLS.isNotificationActive}/${notificationToken}`;
            console.log(api);
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(response.data);
            this.setState({
                notificationActive: response.data
            });
        } catch (error) {
            console.error(error);
        }
    };

    updatePushSubscription = async active => {
        const { notificationToken, token } = this.props;

        if (!this.state.pushGranted) {
            Alert.alert(
                'Push Notifications Permission.',
                'You must grant access to receive notifications for this app in your device settings.',
                [{ text: 'OK', style: 'cancel' }],
                { cancelable: true }
            );
            //this.setState({
            //    notificationActive: active.value
            //});
        } else {
            console.log(active.value);
            try {
                const api = `${
                    URLS.updatePushSubscription
                }/${notificationToken}/${active.value}`;
                console.log(api);
                const response = await axios.get(api, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                this.setState({
                    notificationActive: active.value
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    checkIfRemoteNotificationsDisabledAsync = async () => {
        const { Permissions } = Expo;
        const { status } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        if (status === 'granted') {
            this.setState({
                pushGranted: true
            });
        } else {
            this.setState({
                pushGranted: false
            });
        }
    };

    componentDidMount = async () => {
        const { token, tokenSet } = this.props;

        await this.checkIfRemoteNotificationsDisabledAsync();
        //in case we don't have registration yet
        //this will be called only if there is no notification token yet but access is granted
        if (this.state.pushGranted && !this.props.notificationToken) {
            await optInReceivePushes(this.props);
        }

        //console.log("DID MOUNT");
        //if (tokenSet) {
        this.isNotificationActive(token);
        //} else {
        //    const { dispatch } = this.props;
        //    fetchToken(dispatch);
        //}
    };

    render() {
        return (
            <View style={styles.container}>
                <ListItem>
                    <Text>SETTINGS</Text>
                </ListItem>
                <ScrollView>
                    <ListItem itemDivider>
                        <Text style={styles.sectionHeaderText}>Account</Text>
                    </ListItem>
                    {this.props.userLoggedIn && (
                        <ListItem onPress={this.onLogout}>
                            <Text style={styles.listItemText}>Logout</Text>
                        </ListItem>
                    )}
                    {!this.props.userLoggedIn && (
                        <ListItem onPress={this.onSignIn}>
                            <Text style={styles.listItemText}>Sign In</Text>
                        </ListItem>
                    )}
                    <ListItem itemDivider>
                        <Text style={styles.sectionHeaderText}>
                            Notifications
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Body>
                            <Text>Push Notifications</Text>
                        </Body>
                        <Right>
                            <Switch
                                value={this.state.notificationActive}
                                onValueChange={value =>
                                    this.updatePushSubscription({ value })
                                }
                            />
                        </Right>
                    </ListItem>
                </ScrollView>
            </View>
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
    const { notificationToken } = state.notifications;

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
        notificationToken
    };
};

export default connect(mapStateToProps)(Settings);
