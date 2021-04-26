import React from 'react';
import { View, AsyncStorage, Alert } from 'react-native';
import { URLS } from '../config';
import ExhibitorList from '../components/Lists/ExhibitorList';
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

class Exhibitors extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            exhibitordata: [],
            searchInput: ''
        };

        this.arrayholder = [];
    }
    //static navigationOptions = {
    //  header: null
    //};

    onExhibitorPress = async exhibitorId => {
        const { token, tokenSet, userId, userLoggedIn } = this.props;
        if (__DEV__) {
            console.log('onExhibitorPress: ' + exhibitorId);
        }
        this.props.navigation.navigate('Exhibitor', {
            exhibitorId: exhibitorId
        });
    };

    componentDidMount() {
        const { token, tokenSet, eventId } = this.props;

        if (tokenSet) {
            console.log('fetching exhibitors');
            this.fetchExhibitors(token);
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
                this.fetchExhibitors(token);
            }
        }
    }

    fetchExhibitors = async token => {
        const { eventId } = this.props;
        try {
            console.log(URLS.exhibitors);
            console.log(eventId);
            const api = `${URLS.exhibitors}/${eventId}`;
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (__DEV__) {
                console.log(response.data);
            }
            this.setState({
                exhibitordata: response.data
            });

            this.arrayholder = response.data;
        } catch (error) {
            console.error(error);
        }
    };

    searchFilterFunction = text => {
        console.log(text);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.exhibitorName.toUpperCase()}   
      ${item.exhibitorName.toUpperCase()} ${item.exhibitorName.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({ exhibitordata: newData, searchInput: text });
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
                <ExhibitorList
                    data={this.state.exhibitordata}
                    title='EXHIBITORS'
                    onExhibitorPress={this.onExhibitorPress}
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

export default connect(mapStateToProps)(Exhibitors);
