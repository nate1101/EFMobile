import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import DrawerNavigator from './DrawerNavigator';
import AgendaItemInfo from '../screens/AgendaItemInfo';
import Login from '../screens/Login';
import Register from '../screens/Register';
import AuthLoading from '../screens/AuthLoading';
import LoginStackNavigator from './LoginStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import AboutStackNavigator from './AboutStackNavigator';
import AuthChoice from '../screens/AuthChoice';
export default (LandingNavigator = createStackNavigator(
    {
        AuthChoice: {
            screen: AuthChoice
        },
        LoginStack: {
            screen: LoginStackNavigator,
            navigationOptions: { header: null }
        }
        //SettingsStack: {
        //    screen: SettingsStackNavigator,
        //    navigationOptions: { header: null }
        //},
        //AboutStack: {
        //    screen: AboutStackNavigator,
        //    navigationOptions: { header: null }
        //},
        //Root: {
        //    screen: DrawerNavigator
        //}
        /* AgendaItemModal: {
            screen: AgendaItemInfo
        },
        LoginModal: {
            screen: Login
        },
        RegisterModal: {
            screen: Register
        } */
    },
    {
        mode: 'modal',
        headerMode: 'none',
        portraitOnlyMode: true
    }
));
