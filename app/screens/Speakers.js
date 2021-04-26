import React from 'react';
import { View, AsyncStorage, StatusBar } from 'react-native';
import {
    Container,
    Header,
    Item,
    Input,
    Icon,
    Button,
    Text
} from 'native-base';
import { URLS } from '../config';

import SpeakerList from '../components/Lists/SpeakerList';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/token';
import { setEventId } from '../actions/events';
import { setAgendaItems, setMyAgendaItems } from '../actions/agenda';
import { setUserLoggedIn, setUserId } from '../actions/user';

class Speakers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            speakerdata: [],
            searchInput: ''
        };

        this.arrayholder = [];
    }

    static navigationOptions = {
        header: null
    };

    onSpeakerPress = async speakerId => {
        const { token, tokenSet, userId, userLoggedIn } = this.props;
        this.props.navigation.navigate('Speaker', { speakerId: speakerId });
    };

    componentWillMount() {
        const { token, tokenSet } = this.props;

        if (tokenSet) {
            console.log('fetching speakers');
            this.fetchSpeakers(token);
        } else {
            //this does not seem the most elegant solution,
            //but I wanted to move the fetchToken method out of here
            console.log('fetching token');
            const { dispatch } = this.props;
            fetchToken(dispatch);
        }
    }

    componentDidUpdate(prevProps) {
        const { token, tokenSet } = this.props;

        if (prevProps.token != token) {
            if (tokenSet) {
                this.fetchSpeakers(token);
            }
        }
    }

    fetchSpeakers = async token => {
        const { eventId } = this.props;
        try {
            console.log(URLS.speakers);
            const api = `${URLS.speakers}/${eventId}`;
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (__DEV__) {
                console.log('RESULT_DATA:  ' + response);
            }
            this.setState({
                speakerdata: response.data
            });

            this.arrayholder = response.data;
        } catch (error) {
            console.error(error);
        }
    };

    searchFilterFunction = text => {
        console.log(text);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.fullName.toUpperCase()}   
      ${item.fullName.toUpperCase()} ${item.fullName.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({ speakerdata: newData, searchInput: text });
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
                    <StatusBar barStyle='light-content' />
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
                <SpeakerList
                    data={this.state.speakerdata}
                    onSpeakerPress={this.onSpeakerPress}
                    title='SPEAKERS'
                />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
    const { userId, userLoggedIn } = state.user;
    const { eventId } = state.event;
    return {
        token,
        tokenSet,
        userId,
        userLoggedIn,
        eventId
    };
};

export default connect(mapStateToProps)(Speakers);
