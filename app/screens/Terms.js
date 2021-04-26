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

class Terms extends React.Component {
    constructor(props) {
        super(props);
    }
    goToWebsite = async => {
        this.props.navigation.navigate('Website');
    };

    onSignIn = async => {};

    render() {
        return <WebView source={{ uri: 'https://www.eventbx.com/terms/' }} />;
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

export default connect(mapStateToProps)(Terms);
