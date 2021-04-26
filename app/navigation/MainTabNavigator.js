import React from 'react';
import { Platform } from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/Icons/TabBarIcon';
//import SettingsScreen from "../screens/SettingsScreen";
import EventHome from '../screens/EventHome';
import EventAgenda from '../screens/EventAgenda';
import Speakers from '../screens/Speakers';
import Exhibitors from '../screens/Exhibitors';
import Sponsors from '../screens/Sponsors';

const HomeStack = createStackNavigator({
    Home: {
        screen: EventHome
    }
});

HomeStack.navigationOptions = {
    header: null,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        />
    )
};

const AgendaStack = createStackNavigator({
    Links: {
        screen: EventAgenda
        //screen: props => <EventAgenda {...props} />
    }
});

AgendaStack.navigationOptions = {
    header: null,
    tabBarLabel: 'Schedule',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
        />
    )
};

const SpeakerStack = createStackNavigator({
    Speakers: {
        screen: Speakers
    }
});

SpeakerStack.navigationOptions = {
    header: null,
    tabBarLabel: 'Speakers',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-people' : 'md-contacts'}
        />
    )
};

const SponsorStack = createStackNavigator({
    Sponsors: {
        screen: Sponsors
    }
});

SponsorStack.navigationOptions = {
    header: null,
    tabBarLabel: 'Sponsors',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-people'}
        />
    )
};

export default createBottomTabNavigator({
    HomeStack,
    AgendaStack,
    SpeakerStack,
    SponsorStack
});
