import React, { Component } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
//import type { EventType } from '../../App';
import moment from "moment";
import { Left, Right, Body, Icon, ListItem } from "native-base";

const formatTime = date => moment(date).format("hh:mm A");

export default class ReminderEvent extends Component {
  constructor(props) {
    super(props);
  }
  //props: {
  //  event: EventType,
  //};

  render() {
    const { event, onAgendaItemPress } = this.props;
    const { startDate, endDate, title, description, location, id } = event;
    //console.log(event);
    //console.log(id);
    return (
      <TouchableOpacity onPress={() => onAgendaItemPress(id)}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <View>
              <Icon active name="alarm" style={{ color: "orange" }} />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{formatTime(startDate)}</Text>
            <Text style={[styles.text, styles.title]}>{title}</Text>
            <Text style={styles.text}>{location}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon active name="arrow-forward" style={styles.arrowIcon} />
          </View>
        </View>
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
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 0
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 15,
    width: 30
    //height: 90,
  },
  arrowContainer: {
    marginRight: 15,
    width: 25,
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
    color: "#000",
    fontSize: 16
  },
  title: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold"
    //marginBottom: 10,
  }
});
