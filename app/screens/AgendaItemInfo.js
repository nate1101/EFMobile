import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import {
    Card,
    Container,
    CardItem,
    Left,
    Button,
    Body,
    Right,
    Icon,
    ListItem,
    Thumbnail,
    ActionSheet
} from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/token';
import { URLS } from '../config';
import moment from 'moment';
import {
    setAgendaItems,
    setMyAgendaItems,
    getMyAgendaItemsSuccess,
    getAgendaItemsSuccess
} from '../actions/agenda';
import SpeakerListItem from '../components/ListItems/SpeakerListItem';
import ReminderEvents from '../components/Lists/ReminderEvents';

const formatDate = date => moment(date).format('MM/DD/YYYY');
const formatTime = date => moment(date).format('hh:mm A');

var ADDBUTTONS = [
    { text: 'Notify Me 15 Mins Before' },
    { text: 'Notify Me 30 Mins Before' },
    { text: 'Notify Me 45 Mins Before' },
    { text: 'Notify Me 60 Mins Before' },
    { text: 'No Notification' },
    { text: 'Cancel', icon: 'close', iconColor: '#25de5b' }
];

var REMOVEBUTTONS = [
    { text: 'Remove?' },
    { text: 'Cancel', icon: 'close', iconColor: '#25de5b' }
];

var REMOVE_CANCEL_INDEX = 1;
var ADD_CANCEL_INDEX = 5;

class AgendaItemInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Object,
            clicked: -1
        };
    }

    fetchAgendaItem = async token => {
        const { navigation, userId } = this.props;
        const agendaItemId = navigation.getParam('agendaItemId', '0');

        try {
            const api = `${URLS.agendaItem}/${agendaItemId}/${userId}`;
            //console.log(api);
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });

            this.setState({
                data: response.data
            });
        } catch (error) {
            console.error(error);
        }
    };

    fetchAgendaItems = async () => {
        const { eventId, userId, token, userLoggedIn } = this.props;
        //this.props.dispatch(setAgendaItems(eventId, userId, token));
        try {
            const api = `${URLS.agendaItems}/${eventId}/${userId}`;
            //console.log(api);
            var response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });
            //console.log('FETCHING AGENDA ITEMS AFTER ADD/REMOVE');
            //console.log(response.data);
            this.props.dispatch(getAgendaItemsSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
        if (userLoggedIn) {
            //this.props.dispatch(setMyAgendaItems(eventId, userId, token));
            console.log('LOGGED IN AND FETCHING MY AGENDA ITEMS');
            try {
                const api = `${URLS.myAgendaItems}/${eventId}/${userId}`;
                console.log(api);
                var response = await axios.get(api, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.props.dispatch(getMyAgendaItemsSuccess(response.data));
                console.log('FETCHAGENDAITEMS-ITEM INFO');
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    addUserAgendaItem = async buttonIndex => {
        const { navigation, userId, token, notificationToken } = this.props;
        const agendaItemId = navigation.getParam('agendaItemId', '0');
        const api = `${URLS.addUserAgendaItem}`;
        console.log(api);
        var reminderMinutes = 0;
        switch (buttonIndex) {
            case 0:
                reminderMinutes = 15;
                break;
            case 1:
                reminderMinutes = 30;
                break;
            case 2:
                reminderMinutes = 45;
                break;
            case 3:
                reminderMinutes = 60;
                break;
            case ADD_CANCEL_INDEX:
                return;
        }
        try {
            console.log(agendaItemId);
            console.log(userId);
            console.log(reminderMinutes);
            console.log(notificationToken);
            const response = await axios.post(
                api,
                {
                    id: 0,
                    agendaItemId: agendaItemId,
                    userId: userId,
                    reminderMinutes: reminderMinutes,
                    token: notificationToken
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            Alert.alert('Success', 'The event has been added to your agenda.');
            this.setState({
                data: response.data
            });
            this.fetchAgendaItems();
        } catch (error) {
            console.log(error);
            console.error(error);
        }
    };

    removeUserAgendaItem = async buttonIndex => {
        if (buttonIndex == REMOVE_CANCEL_INDEX) {
            return;
        }
        //const { dispatch } = this.props;
        const { navigation, userId, token } = this.props;
        const agendaItemId = navigation.getParam('agendaItemId', '0');
        const api = `${URLS.removeUserAgendaItem}/${agendaItemId}/${userId}`;

        try {
            console.log(api);
            const response = await axios.post(api, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert(
                'Removed',
                'The event has been removed from your agenda.'
            );
            this.setState({
                data: response.data
            });
            this.fetchAgendaItems();
        } catch (error) {
            console.error(error);
        }
    };

    goToSpeaker = async id => {
        this.props.navigation.navigate('Speaker', { speakerId: id });
    };

    goToLogin = async () => {
        this.props.navigation.navigate('LoginModal');
    };

    componentDidMount() {
        const { token, tokenSet } = this.props;
        //console.log("DID MOUNT");
        if (tokenSet) {
            this.fetchAgendaItem(token);
        } else {
            const { dispatch } = this.props;
            fetchToken(dispatch);
        }
    }

    //fetch data when token changes
    componentDidUpdate(prevProps) {
        const { token, userLoggedIn } = this.props;

        if (
            prevProps.token != token ||
            prevProps.userLoggedIn != userLoggedIn
        ) {
            //console.log("DID UPDATE");

            this.fetchAgendaItem(token);
        }
    }

    render() {
        const { data } = this.state;
        const { userLoggedIn } = this.props;

        let speakers = <Text>No Speaker</Text>;
        if (data.agendaItemSpeakers) {
            speakers = data.agendaItemSpeakers.map((item, i) => {
                return (
                    <SpeakerListItem
                        key={i}
                        speakerId={item.speaker.id}
                        fullName={item.speaker.fullName}
                        companyName={item.speaker.companyName}
                        profilePic={item.speaker.profilePic}
                        onSpeakerPress={this.goToSpeaker}
                    />
                );
            });
        }

        let agendaItemButton = (
            <Button>
                <Text>No Button</Text>
            </Button>
        );
        if (!userLoggedIn) {
            agendaItemButton = (
                <Button
                    style={styles.button}
                    rounded
                    light
                    onPress={this.goToLogin}
                >
                    <Text>Login to Add/Remove Event</Text>
                </Button>
            );
        } else if (data.isUserAgendaItem) {
            agendaItemButton = (
                <Button
                    style={styles.button}
                    rounded
                    light
                    onPress={() =>
                        ActionSheet.show(
                            {
                                options: REMOVEBUTTONS,
                                cancelButtonIndex: REMOVE_CANCEL_INDEX,
                                //destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                title: 'Remove Agenda Item?'
                            },
                            buttonIndex => {
                                this.removeUserAgendaItem(buttonIndex);
                            }
                        )
                    }
                >
                    <Text>Remove From Agenda</Text>
                </Button>
            );
        } else {
            agendaItemButton = (
                <Button
                    style={styles.button}
                    rounded
                    light
                    onPress={() =>
                        ActionSheet.show(
                            {
                                options: ADDBUTTONS,
                                cancelButtonIndex: ADD_CANCEL_INDEX,
                                //destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                title: 'Add Reminder Notification?'
                            },
                            buttonIndex => {
                                this.addUserAgendaItem(buttonIndex);
                            }
                        )
                    }
                >
                    <Text>Add to Agenda</Text>
                </Button>
            );
        }
        return (
            <Container style={styles.container}>
                <Card style={{ flex: 0 }}>
                    <CardItem header>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemHeaderName}>
                                {data.title}
                            </Text>
                            <Text>{formatDate(data.startDate)}</Text>
                            <Text>
                                {formatTime(data.startDate)} -{' '}
                                {formatTime(data.endDate)}
                            </Text>
                            {agendaItemButton}
                        </View>
                        <View />
                    </CardItem>
                </Card>
                <View>
                    <ListItem itemDivider>
                        <Text>LOCATION</Text>
                    </ListItem>
                    <ListItem>
                        <Text>
                            {data && data.location && (
                                <Text style={{ padding: 20 }}>
                                    {data.location}
                                </Text>
                            )}
                        </Text>
                    </ListItem>
                    <ListItem itemDivider>
                        <Text>SPEAKER</Text>
                    </ListItem>
                    {speakers}
                    <ListItem itemDivider>
                        <Text>DESCRIPTION</Text>
                    </ListItem>
                    <ListItem>
                        <Text>{data.description}</Text>
                    </ListItem>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch'
    },
    itemHeader: {
        alignItems: 'center',
        width: '100%'
    },
    itemHeaderName: {
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center'
    },
    headerBody: {
        //justifyContent: 'center',
        alignSelf: 'center'
        //alignContent: 'center',
    },
    newsHeader: {
        fontSize: 12,
        fontWeight: '500',
        alignSelf: 'center'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    button: {
        width: '94%',
        margin: 10,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
});

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
    const { userId, userLoggedIn } = state.user;
    const { eventId } = state.event;
    const { notificationToken } = state.notifications;
    return {
        token,
        tokenSet,
        userId,
        userLoggedIn,
        eventId,
        notificationToken
    };
};

export default connect(mapStateToProps)(AgendaItemInfo);
