import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PageHeader from '../components/Headers/PageHeader';
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import About from '../screens/About';
import Website from '../screens/Website';
import Terms from '../screens/Terms';
import Privacy from '../screens/Privacy';

export default (AboutStackNavigator = createStackNavigator({
    About: {
        screen: About,
        navigationOptions: {
            header: ({ navigation }) => (
                <PageHeader onPress={() => navigation.openDrawer()} />
            )
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
    },
    Terms: {
        screen: Terms,
        navigationOptions: {
            headerTitle: 'Terms of Service',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    },
    Privacy: {
        screen: Privacy,
        navigationOptions: {
            headerTitle: 'Privacy Policy',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    }
}));
