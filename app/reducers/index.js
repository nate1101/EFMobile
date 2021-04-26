import { combineReducers } from 'redux';
import token from './token';
import event from './event';
import agenda from './agenda';
import user from './user';
import notifications from './notifications';

export default combineReducers({
    token,
    event,
    agenda,
    user,
    notifications
});
