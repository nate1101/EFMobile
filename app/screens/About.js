import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ListItem } from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    goToWebsite = async => {
        this.props.navigation.navigate('Website');
    };

    goToTerms = async => {
        this.props.navigation.navigate('Terms');
    };

    goToPrivacy = async => {
        this.props.navigation.navigate('Privacy');
    };

    render() {
        return (
            <View style={styles.container}>
                <ListItem>
                    <Text>ABOUT</Text>
                </ListItem>
                <ScrollView>
                    <ListItem onPress={this.goToWebsite}>
                        <Text style={styles.listItemText}>EventBx Website</Text>
                    </ListItem>
                    <ListItem onPress={this.goToTerms}>
                        <Text style={styles.listItemText}>
                            Terms of Service
                        </Text>
                    </ListItem>
                    <ListItem onPress={this.goToPrivacy}>
                        <Text style={styles.listItemText}>Privacy Policy</Text>
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

export default connect(mapStateToProps)(About);
