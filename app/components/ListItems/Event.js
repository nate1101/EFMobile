import React, { Component } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
//import type { EventType } from '../../App';
import moment from "moment";
import { Left, Right, Body, Icon, ListItem } from "native-base";

const formatTime = date => moment(date).format("hh:mm A");

export default class Event extends Component {
  constructor(props) {
    super(props);
  }
  //props: {
  //  event: EventType,
  //};

  render() {
    const { event, onAgendaItemPress } = this.props;
    const { startDate, endDate, title, description, location, id } = event;
    //console.log("EVENTITEM");
    //console.log(event);
    //console.log(id);
    //console.log(event.trackAgendaItems);
    let tracks = event.trackAgendaItems.map((item, i) => {
      return (
        <View
          key={i}
          style={{
            backgroundColor: item.track.hexColor,
            height: 10,
            width: 10,
            borderRadius: 10,
            flexDirection: "column",
            marginRight: 2
          }}
        />
      );
    });
    return (
      <TouchableOpacity onPress={() => onAgendaItemPress(id)}>
        <View style={styles.container}>
          <View style={styles.timeContainer}>
            <View>
              <Text style={styles.text}>{formatTime(startDate)}</Text>
              <Text style={styles.text}>{formatTime(endDate)}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.title]}>{title}</Text>
            <Text style={styles.text}>{location}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>{tracks}</View>
          </View>
          <View style={styles.arrowContainer}>
            <Icon active name="arrow-forward" style={styles.arrowIcon} />
          </View>
        </View>
        {/* </ListItem> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 15
  },
  timeContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 15,
    width: 90
    //height: 90,
  },
  arrowContainer: {
    marginRight: 15,
    width: 30,
    alignItems: "flex-end"
    //height: 90,
  },
  arrowIcon: {
    fontSize: 18,
    color: "#a7a7a7"
  },
  textContainer: {
    flex: 1
  },
  image: {
    width: 89,
    height: 89
  },
  text: {
    color: "#000"
  },
  title: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold"
    //marginBottom: 10,
  }
});
