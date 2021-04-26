import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import EventListItem from "../ListItems/EventListItem";
//import { NoAvailableItem } from '../listItems'
import { ListItem } from "native-base";
//import Separator from '../listItems/Separator';

class EventList extends Component {
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={(x, i) => `${x.id}`}
        ListHeaderComponent={() => (
          <ListItem itemDivider>
            <Text>{this.props.title}</Text>
          </ListItem>
        )}
        renderItem={({ item }) => (
          <EventListItem
            eventId={item.id}
            eventThumb={item.eventThumb}
            eventName={item.eventName}
            eventCity={item.city}
            eventState={item.state}
            eventStartDate={item.startDate}
            onEventPress={this.props.onEventPress}
          />
        )}
      />
    );
  }
}

export default EventList;
