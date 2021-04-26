// @flow

import React, { PureComponent } from "react";
import { Text, TouchableOpacity } from "react-native";
import Moment from "moment";

export default class Date extends PureComponent {
  // Style helper functions that merge active date styles with the default ones
  // when rendering a date that was selected by user or was set active by default

  getContainerStyle = () => ({
    ...styles.container,
    ...(this.props.isActive ? styles.containerActive : {})
  });

  getDayStyle = () => ({
    ...styles.text,
    ...styles.day,
    ...(this.props.isActive ? styles.textActive : {})
  });

  getDateStyle = () => ({
    ...styles.text,
    ...styles.date,
    ...(this.props.isActive ? styles.textActive : {})
  });

  // Call `onRender` and pass component's with when rendered
  //onLayout = (event: { nativeEvent: { layout: { x: number, y: number, width: number, height: number } } }) => {
  onLayout = event => {
    const { index, onRender } = this.props;
    const {
      nativeEvent: {
        layout: { width }
      }
    } = event;
    onRender(index, width);
  };

  // Call `onPress` passed from the parent component when date is pressed
  onPress = () => {
    const { index, onPress } = this.props;
    onPress(index);
  };

  render() {
    const { date } = this.props;
    return (
      <TouchableOpacity
        style={this.getContainerStyle()}
        onLayout={this.onLayout}
        onPress={this.onPress}
      >
        <Text style={this.getDayStyle()}>
          {date.format("ddd").toUpperCase()}
        </Text>
        <Text style={this.getDateStyle()}>{date.format("DD")}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    borderBottomColor: "#d2d2d2",
    borderBottomWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  containerActive: {
    borderBottomColor: "#000"
  },
  day: {
    fontSize: 12
  },
  date: {
    fontSize: 16
  },
  text: {
    color: "#8e8e8e",
    textAlign: "center"
  },
  textActive: {
    color: "#000",
    fontWeight: "bold"
  }
};
