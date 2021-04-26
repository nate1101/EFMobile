import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    WebView
} from 'react-native';
import { ListItem } from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';

class Privacy extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <WebView source={{ uri: 'https://www.eventbx.com/privacy/' }} />;
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

export default connect(mapStateToProps)(Privacy);
