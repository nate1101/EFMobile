export const SET_NOTIFICATION_TOKEN = 'SET_NOTIFICATION_TOKEN';
export const SET_DONT_ASK_USER_AGAIN = 'SET_DONT_ASK_USER_AGAIN';
// export const SET_ALL_NOTIFICATIONS = 'SET_ALL_NOTIFICATIONS';
export const SET_SELECTED_NOTIFICATIONS = 'SET_SELECTED_NOTIFICATIONS';
export const SET_PUSH_NOTIFICATIONS = 'SET_PUSH_NOTIFICATIONS';
export const SET_GENERAL_PUSH_NOTIFICATIONS = 'SET_GENERAL_PUSH_NOTIFICATIONS';
export const SET_MESSAGE_PUSH_NOTIFICATIONS = 'SET_MESSAGE_PUSH_NOTIFICATIONS';

export const setNotificationToken = notificationToken => ({
    type: SET_NOTIFICATION_TOKEN,
    notificationToken: notificationToken
});

export const setDontAskUserAgain = dontAskUserAgain => ({
    type: SET_DONT_ASK_USER_AGAIN,
    dontAskUserAgain: dontAskUserAgain
});

// export const setAllNotifications = () => ({
//         type: SET_ALL_NOTIFICATIONS,
// });

export const setSelectedNotifications = notificationsArray => ({
    type: SET_SELECTED_NOTIFICATIONS,
    notificationsArray: notificationsArray
});

export const setPushNotifications = pushNotificationsOn => ({
    type: SET_PUSH_NOTIFICATIONS,
    pushNotificationsOn: pushNotificationsOn
});

export const setGeneralPushNotifications = (
    generalPushNotificationsOn,
    generalPushNotificationsId,
    generalPushNotificationsObject
) => ({
    type: SET_GENERAL_PUSH_NOTIFICATIONS,
    generalPushNotificationsOn: generalPushNotificationsOn,
    generalPushNotificationsId: generalPushNotificationsId,
    generalPushNotificationsObject: generalPushNotificationsObject
});

export const setMessagePushNotifications = (
    messagePushNotificationsOn,
    messagePushNotificationsId,
    messagePushNotificationsObject
) => ({
    type: SET_MESSAGE_PUSH_NOTIFICATIONS,
    messagePushNotificationsOn: messagePushNotificationsOn,
    messagePushNotificationsId: messagePushNotificationsId,
    messagePushNotificationsObject: messagePushNotificationsObject
});
