import React from 'react';
import { View, AsyncStorage, Alert, StatusBar } from 'react-native';
import { URLS } from '../config';
import SponsorList from '../components/Lists/SponsorList';
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
import { setAgendaItems, setMyAgendaItems, setTracks } from '../actions/agenda';
import { setUserLoggedIn, setUserId } from '../actions/user';

class Sponsors extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sponsordata: [],
            searchInput: ''
        };

        this.arrayholder = [];
    }
    static navigationOptions = {
        header: null
    };

    onSponsorPress = async sponsorId => {
        const { token, tokenSet, userId, userLoggedIn } = this.props;

        this.props.navigation.navigate('Sponsor', { sponsorId: sponsorId });
    };

    componentDidMount() {
        const { token, tokenSet, eventId } = this.props;

        if (tokenSet) {
            console.log('fetching sponsors');
            this.fetchSponsors(token);
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
                this.fetchSponsors(token);
            }
        }
    }

    fetchSponsors = async token => {
        const { eventId } = this.props;
        try {
            console.log(URLS.sponsors);
            console.log(eventId);
            const api = `${URLS.sponsors}/${eventId}`;
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (__DEV__) {
                console.log(response.data);
            }
            this.setState({
                sponsordata: response.data
            });

            this.arrayholder = response.data;
        } catch (error) {
            console.error(error);
        }
    };

    searchFilterFunction = text => {
        console.log(text);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.sponsorName.toUpperCase()}   
      ${item.sponsorName.toUpperCase()} ${item.sponsorName.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({ sponsordata: newData, searchInput: text });
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
                    <Item>
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
                <SponsorList
                    data={this.state.sponsordata}
                    title='SPONSORS'
                    onSponsorPress={this.onSponsorPress}
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

export default connect(mapStateToProps)(Sponsors);
