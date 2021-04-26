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

export default class ExhibitorListItem extends Component {
    render() {
        return (
            <ListItem
                thumbnail
                style={{ paddingTop: 2, paddingBottom: 2 }}
                onPress={() =>
                    this.props.onExhibitorPress(this.props.exhibitorId)
                }
            >
                <Left>
                    <Thumbnail
                        round
                        large
                        source={{ uri: this.props.profilePic }}
                    />
                </Left>
                <Body>
                    <Text numberOfLines={3} style={styles.listItemTitle}>
                        {this.props.exhibitorName}
                    </Text>
                    <Text numberOfLines={1} style={styles.listItemSubTitle}>
                        {this.props.boothLocation}
                    </Text>
                </Body>
                <Right>
                    <Icon active name='arrow-forward' />
                </Right>
            </ListItem>
        );
    }
}
