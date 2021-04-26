import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PageHeader from '../components/Headers/PageHeader';
import EventSearch from '../screens/EventSearch';
import MainTabNavigator from '../navigation/MainTabNavigator';
import MyAgenda from '../screens/MyAgenda';
import Speaker from '../screens/Speaker';
import AgendaItemInfo from '../screens/AgendaItemInfo';
import VenueMap from '../screens/Map';
import Exhibitor from '../screens/Exhibitor';
import Exhibitors from '../screens/Exhibitors';
import Login from '../screens/Login';
import Sponsor from '../screens/Sponsor';
import EventLocation from '../screens/EventLocation';
import ForgotPassword from '../screens/ForgotPassword';

export default (EventSearchStackNavigator = createStackNavigator({
    EventSearch: {
        screen: EventSearch,
        navigationOptions: {
            header: ({ navigation }) => (
                <PageHeader onPress={() => navigation.openDrawer()} />
            )
        }
    },
    MainTabNavigator: {
        screen: MainTabNavigator,
        navigationOptions: {
            header: ({ navigation }) => (
                <PageHeader
                    onPress={() => {
                        //console.log('Press');
                        navigation.openDrawer();
                    }}
                />
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
    MyAgenda: {
        screen: MyAgenda,
        navigationOptions: {
            headerTitle: 'My Agenda',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    },
    AgendaItemInfo: {
        screen: AgendaItemInfo,
        navigationOptions: {
            headerTitle: 'Event Info',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    },
    EventLocation: {
        screen: EventLocation,
        navigationOptions: {
            headerTitle: 'Location',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    },
    Speaker: {
        screen: Speaker,
        navigationOptions: {
            headerTitle: 'Speaker',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    },
    Exhibitors: {
        screen: Exhibitors,
        navigationOptions: {
            headerTitle: 'Exhibitors',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    },
    Exhibitor: {
        screen: Exhibitor,
        navigationOptions: {
            headerTitle: 'Exhibitor',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    },
    Sponsor: {
        screen: Sponsor,
        navigationOptions: {
            headerTitle: 'Sponsor',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    },
    VenueMap: {
        screen: VenueMap,
        navigationOptions: {
            headerTitle: 'Map',
            headerForceInset: true,
            headerStyle: {
                backgroundColor: '#1b859d'
            },
            headerTintColor: '#FFF'
        }
    }
}));
