import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PageHeader from '../components/Headers/PageHeader';
import Login from '../screens/Login';
//import Logout from "../screens/Logout";
import AuthChoice from '../screens/AuthChoice';
import ForgotPassword from '../screens/ForgotPassword';

export default (LoginStackNavigator = createStackNavigator(
    {
        AuthChoice: {
            screen: AuthChoice,
            navigationOptions: {
                header: null,
                headerTitle: 'Back'
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
        }
    },
    { headerMode: 'screen' }
));
