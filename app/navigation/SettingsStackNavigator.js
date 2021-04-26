import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PageHeader from '../components/Headers/PageHeader';
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import About from '../screens/About';
import Website from '../screens/Website';
import ForgotPassword from '../screens/ForgotPassword';

export default (SettingsStackNavigator = createStackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            header: ({ navigation }) => (
                <PageHeader onPress={() => navigation.openDrawer()} />
            )
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerTitle: 'Log In',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            headerTitle: 'Forgot Password',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    },
    Website: {
        screen: Website,
        navigationOptions: {
            headerTitle: 'Website',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    }
}));
