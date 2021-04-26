import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Event from "../ListItems/Event";

export default class Events extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { events, onAgendaItemPress } = this.props;
    //console.log("EVENTS");
    //console.log(events);
    return (
      <View style={styles.container}>
        <ScrollView>
          {events &&
            events.map((event, index) => (
              <Event
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
