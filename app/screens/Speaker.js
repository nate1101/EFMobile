import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar
} from 'react-native';
import { Agenda } from 'react-native-calendars';
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
    Thumbnail
} from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/token';
import { URLS } from '../config';

class Speaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Object
        };
    }

    fetchSpeaker = async token => {
        const { navigation, userId } = this.props;
        const speakerId = navigation.getParam('speakerId', '0');

        try {
            const api = `${URLS.speaker}/${speakerId}`;
            console.log(api);
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

    componentWillMount() {
        const { token, tokenSet } = this.props;
        console.log('DID MOUNT');
        if (tokenSet) {
            this.fetchSpeaker(token);
        } else {
            const { dispatch } = this.props;
            fetchToken(dispatch);
        }
    }

    componentDidUpdate(prevProps) {
        const { token } = this.props;

        if (prevProps.token != token) {
            console.log('DID UPDATE');

            this.fetchSpeaker(token);
        }
    }

    render() {
        const { data } = this.state;
        let pic;
        if (data.profilePic) {
            pic = <Thumbnail round medium source={{ uri: data.profilePic }} />;
        } else {
            pic = (
                <Thumbnail
                    round
                    medium
                    source={require('../../assets/images/empty-profile.png')}
                />
            );
        }

        console.log('FULLNAME');
        console.log(data.fullName);
        return (
            <Container style={styles.container}>
                <View>
                    <StatusBar barStyle='light-content' />
                    <ListItem thumbnail style={styles.speakerContainer}>
                        <Left>{pic}</Left>
                        <Body>
                            <View>
                                <Text style={styles.speakerName}>
                                    {data.fullName}
                                </Text>
                                <Text>{data.companyName}</Text>
                            </View>
                        </Body>
                    </ListItem>
                    <ListItem itemDivider>
                        <Text>BIO</Text>
                    </ListItem>
                    <ListItem>
                        <Text>{data.bio == null ? 'N/A' : data.bio}</Text>
                    </ListItem>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 20,
        paddingBottom: 20
    },
    speakerName: {
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomWidth: 0
    },
    speakerContainer: {
        paddingBottom: 20,
        borderBottomWidth: 0
    }
});

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

export default connect(mapStateToProps)(Speaker);
