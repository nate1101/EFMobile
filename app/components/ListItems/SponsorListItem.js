import React, { Component } from "react";
import {
  Thumbnail,
  Text,
  Left,
  Body,
  ListItem,
  Right,
  Icon
} from "native-base";
import styles from "./styles";

export default class SponsorListItem extends Component {
  render() {
    return (
      <ListItem
        thumbnail
        style={{ paddingTop: 2, paddingBottom: 2 }}
        onPress={() => this.props.onSponsorPress(this.props.sponsorId)}
      >
        <Left>
          <Thumbnail round medium source={{ uri: this.props.profilePic }} />
        </Left>
        <Body>
          <Text numberOfLines={3} style={styles.listItemTitle}>
            {this.props.sponsorName}
          </Text>
        </Body>
        <Right>
          <Icon active name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}
