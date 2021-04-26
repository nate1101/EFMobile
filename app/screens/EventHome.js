import React from 'react';
import {
    View,
    Alert,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Linking,
    Platform
} from 'react-native';
//import styles from './styles'
import {
    StyleProvider,
    Container,
    Content,
    Text,
    Icon,
    ListItem,
    Left,
    Body,
    Right
} from 'native-base';
import EventHeader from '../components/Headers/EventHeader';
import ReminderEvents from '../components/Lists/ReminderEvents';
import { URLS } from '../config';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/token';
import { setIsMyAgenda } from '../actions/agenda';

class EventHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            reminderEvents: []
        };
    }

    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        const { token, tokenSet, eventIdSet, eventId } = this.props;

        if (tokenSet) {
            this.fetchEvent(token, eventId);
            this.fetchReminderEvents();
        } else {
            //this does not seem the most elegant solution,
            //but I wanted to move the fetchToken method out of here
            const { dispatch } = this.props;
            fetchToken(dispatch);
        }
        this.props.dispatch(setIsMyAgenda(false));
    }

    //fetch data when token changes
    componentDidUpdate(prevProps) {
        const { token, eventIdSet, eventId, myAgendaItems } = this.props;

        if (prevProps.token != token || prevProps.eventId != eventId) {
            this.fetchEvent(token, eventId);
        }

        if (
            prevProps.token != token ||
            prevProps.myAgendaItems != myAgendaItems
        ) {
            this.fetchReminderEvents();
        }
    }

    fetchReminderEvents = async () => {
        const { token, eventId, userId, userLoggedIn } = this.props;
        console.log('FETCHREMINDEREVENTS');
        console.log(userId);
        try {
            const api = `${URLS.myAgendaReminders}/${eventId}/${userId}`;
            if (__DEV__) {
                console.log('URL_Event: ' + api);
            }

            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });

            this.setState({
                reminderEvents: response.data
            });
        } catch (error) {
            console.error(error);
        }
    };

    fetchEvent = async (token, eventId) => {
        try {
            const id = eventId;

            const api = `${URLS.event}/${id}`;
            if (__DEV__) {
                console.log('URL_Event: ' + api);
            }

            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });
            //console.log(response.data);
            this.setState({
                data: response.data
            });
        } catch (error) {
            console.error(error);
        }
    };

    goToTodaysAgenda = async () => {
        this.props.navigation.navigate('TodaysAgendaModal');
    };

    goToMyAgenda = async () => {
        const { userLoggedIn } = this.props;
        console.log('LOGGED IN?');
        console.log(userLoggedIn);
        this.props.dispatch(setIsMyAgenda(true));
        if (userLoggedIn) {
            this.props.navigation.navigate('AgendaStack');
        } else {
            this.props.dispatch(setIsMyAgenda(true));
            this.props.navigation.navigate('Login', {
                redirectTo: 'AgendaStack'
            });
        }
    };

    goToAgendaItem = async itemId => {
        //console.log(itemId);
        this.props.navigation.navigate('AgendaItemInfo', {
            agendaItemId: itemId
        });
    };

    goToExhibitors = async () => {
        this.props.navigation.navigate('Exhibitors');
    };

    goToMap = async () => {
        //console.log(this.state.data.longitude);
        //this.props.navigation.navigate('EventLocation', {
        //    longitude: this.state.data.longitude,
        //    latitude: this.state.data.latitude
        //});
        let daddr = encodeURIComponent(`${this.state.data.addressLabel}`);

        if (Platform.OS === 'ios') {
            Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
        } else {
            Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
        }
    };

    render() {
        //console.log(this.state.data.eventThumb);
        const { reminderEvents } = this.state;
        return (
            <Container>
                <Content keyboardShouldPersistTaps='true'>
                    <EventHeader
                        eventThumb={this.state.data.eventThumb}
                        eventBanner={this.state.data.eventBanner}
                        eventStartDate={this.state.data.startDate}
                        eventEndDate={this.state.data.endDate}
                        eventName={this.state.data.eventName}
                        eventCity={this.state.data.city}
                        eventState={this.state.data.state}
                    />
                    <View keyboardShouldPersistTaps='true'>
                        <ListItem noIndent header style={styles.sectionHeader}>
                            <Text>REMINDERS</Text>
                        </ListItem>
                        {reminderEvents.length > 0 ? (
                            <ReminderEvents
                                events={reminderEvents}
                                onAgendaItemPress={this.goToAgendaItem}
                            />
                        ) : (
                            <ListItem>
                                <Text>No Reminders</Text>
                            </ListItem>
                        )}
                        <ListItem noIndent header style={styles.sectionHeader}>
                            <Text>SCHEDULE</Text>
                        </ListItem>
                        <ListItem icon onPress={() => this.goToMyAgenda()}>
                            <Left>
                                <Icon
                                    active
                                    name='calendar'
                                    style={{ color: 'green' }}
                                />
                            </Left>
                            <Body>
                                <Text>My Agenda</Text>
                            </Body>
                            <Right>
                                <Icon active name='arrow-forward' />
                            </Right>
                        </ListItem>
                        <ListItem noIndent header style={styles.sectionHeader}>
                            <Text>RESOURCES</Text>
                        </ListItem>
                        <ListItem icon onPress={() => this.goToMap()}>
                            <Left>
                                <Icon
                                    active
                                    name='pin'
                                    style={{ color: 'red' }}
                                />
                            </Left>
                            <Body>
                                <Text>Event Location</Text>
                            </Body>
                            <Right>
                                <Icon active name='arrow-forward' />
                            </Right>
                        </ListItem>
                        <ListItem icon onPress={() => this.goToExhibitors()}>
                            <Left>
                                <Icon
                                    active
                                    name='briefcase'
                                    style={{ color: 'brown' }}
                                />
                            </Left>
                            <Body>
                                <Text>Exhibitors</Text>
                            </Body>
                            <Right>
                                <Icon active name='arrow-forward' />
                            </Right>
                        </ListItem>
                        {/* <ListItem icon>
              <Left>
                <Icon active name="document" style={{ color: "orange" }} />
              </Left>
              <Body>
                <Text>Documents</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem> */}
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        backgroundColor: '#d6d6d6'
    },
    listItem: {
        paddingTop: 20,
        paddingBottom: 20,
        height: 80
    }
});

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
    const { eventId, eventBanner } = state.event;
    const { userLoggedIn, userId } = state.user;
    const { myAgendaItems } = state.agenda;
    return {
        token,
        tokenSet,
        eventId,
        eventBanner,
        userLoggedIn,
        userId,
        myAgendaItems
    };
};

export default connect(mapStateToProps)(EventHome);
