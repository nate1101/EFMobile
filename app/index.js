import React from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import { Root } from 'native-base';
import { AppLoading, Asset, Font, Icon } from 'expo';
import RootNavigator from './navigation/RootNavigator';
//import store from './config/store';
import { store, persistor } from './config/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
const APP_IS_LAUNCHED = 'appislaunched';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        isLoadingComplete: false
    };

    async componentWillMount() {
        //Native Base need these fonts on Android
        if (Platform.OS === 'android') {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
            });
        }
    }

    render() {
        if (!this.state.isLoadingComplete) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <Root>
                    <SafeAreaView style={styles.container}>
                        <StatusBar barStyle='light-content' />
                        <RootNavigator />
                    </SafeAreaView>
                </Root>
            );
        }
    }

    _loadResourcesAsync = async () => {
        const { dispatch } = this.props;
        let token = await AsyncStorage.getItem('notificationtoken');
        if (token) {
            dispatch(setNotificationToken(token));
        }
        return Promise.all([
            Asset.loadAsync([require('../assets/images/logo.png')]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                //    ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel frees
                // to remove this if you are not using it in your app
                'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf')
            })
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = async () => {
        this.setState({ isLoadingComplete: true });
        console.log('HANDLE FINISH LOADING');
        await AsyncStorage.setItem(APP_IS_LAUNCHED, 'yes');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1b859d',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    }
});

const RootApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

export default RootApp;
