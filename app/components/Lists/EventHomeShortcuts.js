import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Header, Content, Right, Button, Icon, ListItem, Container, Switch, Left, Thumbnail, Body, StyleProvider } from 'native-base';
import theme from '../../native-base-theme/components/ListItem';
export default class EventHomeShortcuts extends React.Component {
    render() {
        return (
            <View>
                <ListItem icon style={{ height: 80 }}>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}>
                            <Icon active name="alarm" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Today's Schedule</Text>
                    </Body>
                    <Right>
                        <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem icon style={{ height: 80 }}>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}>
                            <Icon active name="alarm" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>My Schedule</Text>
                    </Body>
                    <Right>
                        <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        //flex: 1,
        flexDirection: 'row',
        height: 100,
        backgroundColor: '#2daf33',
        padding: 20,
        alignItems: 'stretch'
        //marginTop: 12
    },
})