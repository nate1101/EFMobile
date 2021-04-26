import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ReminderEvent from "../ListItems/ReminderEvent";
//import type { EventType } from '../../App';

export default class ReminderEvents extends Component {
  constructor(props) {
    super(props);
  }
  //props: {
  //  events: [],
  //};

  render() {
    const { events, onAgendaItemPress } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {events &&
            events.map((event, index) => (
              <ReminderEvent
                event={event}
                key={index}
                onAgendaItemPress={onAgendaItemPress}
              />
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
