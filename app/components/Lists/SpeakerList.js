import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import SpeakerListItem from "../ListItems/SpeakerListItem";
//import { NoAvailableItem } from '../listItems'
import { ListItem } from "native-base";
//import Separator from '../listItems/Separator';

export default class SpeakerList extends Component {
  constructor(props) {
    super(props);
  }
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
          <SpeakerListItem
            speakerId={item.id}
            fullName={item.fullName}
            companyName={item.companyName}
            profilePic={item.profilePic}
            onSpeakerPress={this.props.onSpeakerPress}
          />
        )}
      />
    );
  }
}

//export default SpeakerList;
