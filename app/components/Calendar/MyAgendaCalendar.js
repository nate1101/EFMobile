import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Content
} from "react-native";
import { Left, Thumbnail, Body, ListItem } from "native-base";
import Calendar from "./Calendar";
import Events from "../Lists/Events";

export default class MyAgendaCalendar extends React.Component {
  render() {
    //console.log(this.props.eventThumb);
    return (
      <View>
        <Calendar
          onSelectDate={this.props.onSelectDate}
          currentDate={this.props.agendaStartDate}
        />
        <Events
          events={this.props.events}
          onAgendaItemPress={this.props.onAgendaItemPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 150
  }
});
