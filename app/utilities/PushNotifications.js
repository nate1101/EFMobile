import React from 'react';
import { AsyncStorage, Platform, Alert } from 'react-native';
import { Permissions, Notifications } from 'expo';
import {
    setNotificationToken,
    setDontAskUserAgain
} from '../actions/notifications';
import { URLS } from '../config';
import axios from 'axios';

const APP_IS_LAUNCHED = 'appislaunched';

export async function executePushForNewLaunch(props) {
    try {
        const value = await AsyncStorage.getItem(APP_IS_LAUNCHED);
        console.log('APP LAUNCHED');
        console.log(value);
        if (value == 'yes') {
            await AsyncStorage.setItem(APP_IS_LAUNCHED, 'no');
            showAlertIfNeeded(props);
        } else {
        }
    } catch (error) {}
}

export async function showAlertIfNeeded(props) {
    //if the user hasn't said not to be asked and
    //if we have no stored token
    //then ask about notifications
    if (!props.dontAskUserAgain && props.notificationToken == null) {
        //console.log('SHOW ALERT');
        //this.showPushAlert(props);
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            this.showPushAlert(props);
        } else {
            optInReceivePushes(props);
        }
    }
}

showPushAlert = props => {
    //ask for push notifications iOS only, on Android it's granted during install
    if (Platform.OS === 'ios') {
        console.log('SHOW ACTUAL ALERT');
        Alert.alert(
            'Notifications',
            'Would you like to receive notifications about your events such as reminders and updates?',
            [
                { text: 'Yes', onPress: () => optInReceivePushes(props) },
                { text: 'No', onPress: () => optOutReceivePushes(props) },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }
            ],
            { cancelable: false }
        );
    } else {
        optInReceivePushes(props);
    }
};

export function optInReceivePushes(props) {
    console.log('yes for notifications pressed');
    //now do the push signup
    registerForPushNotifications(props);
}

optOutReceivePushes = props => {
    console.log('dont ask again');
    const { dispatch } = props;
    dispatch(setDontAskUserAgain(true));
};

registerForPushNotifications = async props => {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        if (__DEV__) {
            console.log('asking for permission');
        }
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        console.log('push permission not granted');
        //so in case the user says no to the iOS popup, we should not ask again
        optOutReceivePushes(props);
        return;
    }

    if (__DEV__) {
        console.log('permission granted');
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    if (__DEV__) {
        console.log('got token: ' + token);
    }

    //POST the token to our server from where we can retrieve it to send push notifications.
    try {
        const api = `${URLS.createPushSubscription}/${token}`;
        console.log(api);
        const response = await axios.post(api);
        if (__DEV__) {
            console.log('PUSH_Registration_RESULT:  ');
            if (typeof console.dir === 'function') {
                console.dir(response.data);
            }
        }

        //save to redux if we were successful
        if (response.data['success'] == true) {
            const { dispatch } = props;
            dispatch(setNotificationToken(token));
        }
    } catch (error) {
        console.log(error);
    }
    return;
};
