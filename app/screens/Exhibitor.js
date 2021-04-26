import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Linking
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

class Exhibitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Object
        };
    }

    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    fetchExhibitor = async token => {
        const { navigation, userId } = this.props;
        const exhibitorId = navigation.getParam('exhibitorId', '0');

        try {
            const api = `${URLS.exhibitor}/${exhibitorId}`;

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
        //console.log("DID MOUNT");
        if (tokenSet) {
            this.fetchExhibitor(token);
        } else {
            const { dispatch } = this.props;
            fetchToken(dispatch);
        }
    }

    componentDidUpdate(prevProps) {
        const { token } = this.props;

        if (prevProps.token != token) {
            //console.log("DID UPDATE");

            this.fetchExhibitor(token);
        }
    }

    render() {
        const { data } = this.state;

        return (
            <Container style={styles.container}>
                <View>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail
                                round
                                large
                                source={{ uri: data.profilePic }}
                            />
                        </Left>
                        <Body>
                            <View>
                                <Text style={styles.exhibitorName}>
                                    {data.exhibitorName}
                                </Text>
                                <Text style={styles.exhibitorNameSubTitle}>
                                    {data.boothLocation}
                                </Text>
                            </View>
                        </Body>
                    </ListItem>
                    <ListItem itemDivider>
                        <Text>ABOUT US</Text>
                    </ListItem>
                    <ListItem>
                        {data.description ? (
                            <Text>{data.description}</Text>
                        ) : (
                            <Text>No Description</Text>
                        )}
                    </ListItem>
                    <ListItem itemDivider>
                        <Text>ADDRESS</Text>
                    </ListItem>
                    <ListItem>
                        <View>
                            <Text>{data.address1}</Text>
                            {data.address2 ? (
                                <Text>{data.address2}</Text>
                            ) : (
                                <View />
                            )}
                            <Text>
                                {data.city}, {data.state}
                            </Text>
                        </View>
                    </ListItem>
                    <ListItem itemDivider>
                        <Text>CONTACT</Text>
                    </ListItem>
                    <ListItem>
                        <View>
                            <Button transparent>
                                <Icon name='ios-contact' />
                                <Text>{data.contactName}</Text>
                            </Button>
                        </View>
                    </ListItem>
                    <ListItem>
                        <View>
                            {/* <Text>{data.contactEmail}</Text> */}
                            <Button
                                transparent
                                onPress={() =>
                                    Linking.openURL(
                                        `mailto:${data.contactEmail}`
                                    )
                                }
                                title='Exhibitor Contact'
                                style={{ color: 'blue' }}
                            >
                                <Icon name='ios-mail' />
                                <Text>{data.contactEmail}</Text>
                            </Button>
                        </View>
                    </ListItem>
                    <ListItem>
                        <View>
                            <Button
                                transparent
                                onPress={() =>
                                    Linking.openURL(`tel:${data.contactPhone}`)
                                }
                            >
                                <Icon name='ios-phone-portrait' />
                                <Text>
                                    {this.formatPhoneNumber(data.contactPhone)}
                                </Text>
                            </Button>
                        </View>
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
    exhibitorName: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    exhibitorNameSubTitle: {
        fontSize: 18,
        color: '#717171'
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

export default connect(mapStateToProps)(Exhibitor);
