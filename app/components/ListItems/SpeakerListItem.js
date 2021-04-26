import React, { Component } from 'react';
import {
    Thumbnail,
    Text,
    Left,
    Body,
    ListItem,
    Right,
    Icon
} from 'native-base';
import styles from './styles';

export default class SpeakerListItem extends Component {
    render() {
        let pic;
        if (this.props.profilePic) {
            pic = (
                <Thumbnail
                    round
                    medium
                    source={{ uri: this.props.profilePic }}
                />
            );
        } else {
            pic = (
                <Thumbnail
                    round
                    medium
                    source={require('../../../assets/images/empty-profile.png')}
                />
            );
        }
        return (
            <ListItem
                keyExtractor={(x, i) => `${x}`}
                thumbnail
                style={{ paddingTop: 2, paddingBottom: 2, height: 75 }}
                onPress={() => this.props.onSpeakerPress(this.props.speakerId)}
            >
                <Left>{pic}</Left>
                <Body>
                    <Text numberOfLines={1} style={styles.listItemTitle}>
                        {this.props.fullName}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {this.props.companyName}
                    </Text>
                </Body>
                <Right>
                    <Icon active name='arrow-forward' />
                </Right>
            </ListItem>
        );
    }
}
