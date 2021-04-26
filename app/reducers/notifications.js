import {
    SET_NOTIFICATION_TOKEN,
    SET_DONT_ASK_USER_AGAIN,
    SET_SELECTED_NOTIFICATIONS,
    SET_PUSH_NOTIFICATIONS,
    SET_GENERAL_PUSH_NOTIFICATIONS,
    SET_MESSAGE_PUSH_NOTIFICATIONS
} from '../actions/notifications';

const initialState = {
    notificationToken: null,
    dontAskUserAgain: false,
    notificationsArray: null,
    pushNotificationsOn: true,
    generalPushNotificationsOn: true,
    generalPushNotificationsId: 0,
    generalPushNotificationsObject: null,
    messagePushNotificationsOn: true,
    messagePushNotificationsId: 0,
    messagePushNotificationsObject: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION_TOKEN:
            return {
                ...state,
                notificationToken: action.notificationToken
            };
        case SET_DONT_ASK_USER_AGAIN:
            return {
                ...state,
                dontAskUserAgain: action.dontAskUserAgain
            };
        case SET_SELECTED_NOTIFICATIONS:
            return {
                ...state,
                notificationsArray: action.notificationsArray
            };
        case SET_PUSH_NOTIFICATIONS:
            return {
                ...state,
                pushNotificationsOn: action.pushNotificationsOn
            };
        case SET_GENERAL_PUSH_NOTIFICATIONS:
            return {
                ...state,
                generalPushNotificationsOn: action.generalPushNotificationsOn,
                generalPushNotificationsId: action.generalPushNotificationsId,
                generalPushNotificationsObject:
                    action.generalPushNotificationsObject
            };
        case SET_MESSAGE_PUSH_NOTIFICATIONS:
            return {
                ...state,
                messagePushNotificationsOn: action.messagePushNotificationsOn,
                messagePushNotificationsId: action.messagePushNotificationsId,
                messagePushNotificationsObject:
                    action.messagePushNotificationsObject
            };
        default:
            return state;
    }
};
