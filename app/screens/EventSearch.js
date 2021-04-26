import React from 'react';
import { View, AsyncStorage, Alert, StatusBar } from 'react-native';
import { URLS } from '../config';
import EventList from '../components/Lists/EventList';
import {
    Container,
    Header,
    Item,
    Input,
    Icon,
    Button,
    Text
} from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/token';
import { setEventId } from '../actions/events';
import {
    setAgendaItems,
    setMyAgendaItems,
    getTracksSuccess,
    getAgendaItemsSuccess,
    getMyAgendaItemsSuccess
} from '../actions/agenda';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { setUserLoggedIn, setUserId } from '../actions/user';
import styles from './styles';

class EventSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventdata: [],
            eventsLoaded: false,
            searchInput: ''
        };

        this.arrayholder = [];
    }

    onEventPress = async eventId => {
        const { token, tokenSet, userId, userLoggedIn } = this.props;
        if (__DEV__) {
            console.log('onEventPress: ' + eventId);
        }
        console.log('SET EVENT ID');
        this.props.dispatch(setEventId(eventId));
        console.log('SET TRACKS');

        // get and set tracks for event
        try {
            const api = `${URLS.tracks}/${eventId}`;
            console.log(api);

            var response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.props.dispatch(getTracksSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
        //console.log('SET AGENDA ITEMS');
        // set agenda items
        try {
            console.log('SET AGENDA ITEMS');
            const api = `${URLS.agendaItems}/${eventId}/${userId}`;
            console.log(api);
            var response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });
            //console.log(response.data);
            this.props.dispatch(getAgendaItemsSuccess(response.data));
        } catch (error) {
            console.log(error);
        }

        // set my agenda items if logged in
        if (userLoggedIn) {
            console.log('SET MY AGENDA ITEMS');
            try {
                const api = `${URLS.myAgendaItems}/${eventId}/${userId}`;
                console.log(api);
                var response = await axios.get(api, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.props.dispatch(getMyAgendaItemsSuccess(response.data));
            } catch (error) {
                console.log(error);
            }
        }

        this.props.navigation.navigate('MainTabNavigator');
    };

    /* setUserData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const idToken = await AsyncStorage.getItem('idToken');
            const tokenExpiration = await AsyncStorage.getItem(
                'tokenExpiration'
            );
            if (idToken) {
                console.log('SEARCH: IDTOKEN');
                console.log(idToken);
                this.props.dispatch(setUserLoggedIn(true));
                if (userId) {
                    this.props.dispatch(setUserId(userId));
                }
            } else {
                this.props.dispatch(setUserLoggedIn(false));
            }
        } catch (error) {
            
        }
    }; */

    componentWillMount() {
        const { token, tokenSet } = this.props;

        if (tokenSet) {
            console.log('fetching events');
            this.fetchEvents(token);
        } else {
            //this does not seem the most elegant solution,
            //but I wanted to move the fetchToken method out of here
            console.log('fetching token');
            const { dispatch } = this.props;
            fetchToken(dispatch);
        }

        //this.setUserData();
    }

    componentDidUpdate(prevProps) {
        const { token, tokenSet } = this.props;

        if (prevProps.token != token) {
            if (tokenSet) {
                this.fetchEvents(token);
            }
        }
    }

    fetchEvents = async token => {
        try {
            console.log(URLS.currentEvents);
            const api = URLS.currentEvents;
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (__DEV__) {
                //console.log(response.data);
            }
            this.setState({
                eventdata: response.data,
                eventsLoaded: true
            });

            this.arrayholder = response.data;
        } catch (error) {
            this.setState({
                eventsLoaded: true
            });
            console.error(error);
        }
    };

    searchFilterFunction = text => {
        console.log(text);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.eventName.toUpperCase()}   
      ${item.eventName.toUpperCase()} ${item.eventName.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({ eventdata: newData, searchInput: text });
    };

    clearSearchFilter = () => {
        this.searchFilterFunction('');
        this.setState({ searchInput: '' });
    };
    render() {
        return (
            <Container>
                <Header
                    searchBar
                    rounded
                    style={{
                        height: 35,
                        paddingTop: 0,
                        paddingBottom: 0,
                        backgroundColor: '#FFF'
                    }}
                >
                    <Item style={{}}>
                        <Icon name='ios-search' />
                        <Input
                            value={this.state.searchInput}
                            placeholder='Search'
                            onChangeText={text =>
                                this.searchFilterFunction(text)
                            }
                        />
                    </Item>
                    <Button transparent onPress={this.clearSearchFilter}>
                        <Text>Clear</Text>
                    </Button>
                </Header>
                <EventList
                    data={this.state.eventdata}
                    title='EVENTS'
                    onEventPress={this.onEventPress}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
    const { userId, userLoggedIn } = state.user;
    return {
        token,
        tokenSet,
        userId,
        userLoggedIn
    };
};

export default connect(mapStateToProps)(EventSearch);
