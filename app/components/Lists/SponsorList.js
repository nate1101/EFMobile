import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import SponsorListItem from "../ListItems/SponsorListItem";
//import { NoAvailableItem } from '../listItems'
import { ListItem } from "native-base";
//import Separator from '../listItems/Separator';

class SponsorList extends Component {
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
          <SponsorListItem
            sponsorId={item.id}
            sponsorName={item.sponsorName}
            profilePic={item.profilePic}
            onSponsorPress={this.props.onSponsorPress}
          />
        )}
      />
    );
  }
}

export default SponsorList;
