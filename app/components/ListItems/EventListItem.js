import React, { Component } from "react";
import { Thumbnail, Text, Left, Body, ListItem } from "native-base";
import moment from "moment";

const formatDate = date => moment(date).format("MM/DD/YYYY");

export default class EventListItem extends Component {
  render() {
    return (
      <ListItem
        thumbnail
        style={{ paddingTop: 2, paddingBottom: 2 }}
        onPress={() => this.props.onEventPress(this.props.eventId)}
      >
        <Left>
          <Thumbnail square large source={{ uri: this.props.eventThumb }} />
        </Left>
        <Body>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold"
            }}
          >
            {formatDate(this.props.eventStartDate)}
          </Text>
          <Text
            numberOfLines={3}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {this.props.eventName}
          </Text>
          <Text
            numberOfLines={1}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {this.props.eventCity}, {this.props.eventState}
          </Text>
        </Body>
      </ListItem>
    );
  }
}
