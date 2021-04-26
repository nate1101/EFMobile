import React from 'react';
import {
    View,
    Text,
    ListItem,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    Image
} from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventSearchStackNavigator from './EventSearchStackNavigator';
import LogoutStackNavigator from './LogoutStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import AboutStackNavigator from './AboutStackNavigator';
import LandingNavigator from './LandingNavigator';

import {
    setUserId,
    setUserLoggedIn,
    setUserEmailPassword,
    setUserToken
} from '../actions/user';

//navigates to the drawer item (root if stack) and closes drawer
//default behavior was not to close the drawer if we were in same route
navigateToRootItem = (item, props) => {
    const { navigation } = props;
    navigation.closeDrawer();
    navigation.navigate(item.route.routes[0].routeName);
};

logout = () => {
    console.log('LOGGING OUT');
    const { dispatch } = this.props;
    dispatch(setUserId(null));
    dispatch(setUserEmailPassword(null, null));
    dispatch(setUserToken(null, null));
    dispatch(setUserLoggedIn(false));
    //AsyncStorage.removeItem('userId');
    //AsyncStorage.removeItem('idToken');
    //AsyncStorage.removeItem('tokenExpiration');
};

goTologOutMessage = props => {
    const { dispatch } = props;
    Alert.alert(
        'Log Out?',
        'Are you sure you want to log out?',
        [
            {
                text: 'Yes',
                onPress: props => {
                    console.log('LOGGING OUT');
                    dispatch(setUserId(null));
                }
            },
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }
        ],
        { cancelable: false }
    );
};
const DrawerContent = props => (
    <View>
        <View
            style={{
                height: 140,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image
                source={require('../../assets/images/menuheader.png')}
                resizeMode='contain'
                style={{
                    height: 100,
                    marginTop: 5,
                    alignSelf: 'center'
                }}
            />
        </View>

        <DrawerItems
            {...props}
            onItemPress={item => navigateToRootItem(item, props)}
        />
    </View>
);

export default (DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: LandingNavigator,
            navigationOptions: {
                drawerLabel: 'Home',
                drawerIcon: ({ tintColor }) => (
                    <Icon name='home' size={24} color={tintColor} />
                )
            }
        },
        Search: {
            screen: EventSearchStackNavigator,
            navigationOptions: {
                drawerLabel: 'Event Search',
                drawerIcon: ({ tintColor }) => (
                    <Icon name='search' size={24} color={tintColor} />
                )
            }
        },
        Settings: {
            screen: SettingsStackNavigator,
            navigationOptions: {
                drawerLabel: 'Settings',
                drawerIcon: ({ tintColor }) => (
                    <Icon name='gear' size={24} color={tintColor} />
                )
            }
        },
        About: {
            screen: AboutStackNavigator,
            navigationOptions: {
                drawerLabel: 'About',
                drawerIcon: ({ tintColor }) => (
                    <Icon name='info' size={24} color={tintColor} />
                )
            }
        }
    },
    {
        contentComponent: DrawerContent,
        /* contentComponent: props => (
      <View>
        <Text>Custom Header</Text>
        <DrawerItems {...props} />
        <View>
          <TouchableOpacity
            {...props}
            onPress={props => this.goTologOutMessage(props)}
          >
            <Text>Custom Footer</Text>
          </TouchableOpacity>
        </View>
      </View>
    ), */
        drawerType: 'front'
    }
));
