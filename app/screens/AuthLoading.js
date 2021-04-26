import React from 'react';
import { View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

class AuthLoading extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        //const idToken = await AsyncStorage.getItem('idToken');
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        console.log('LOGGED IN');
        console.log(this.props.userLoggedIn);
        this.props.navigation.navigate(
            this.props.userLoggedIn ? 'Root' : 'LoginStack',
            {
                redirectTo: 'Root'
            }
        );
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle='light-content' />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
    const tokenExpiration = state.token.expiration;
    const { userLoggedIn, userId } = state.user;
    return {
        token,
        tokenSet,
        tokenExpiration,
        userLoggedIn,
        userId
    };
};

export default connect(mapStateToProps)(AuthLoading);
