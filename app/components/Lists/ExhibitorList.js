import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import ExhibitorListItem from '../ListItems/ExhibitorListItem';
//import { NoAvailableItem } from '../listItems'
import { ListItem } from 'native-base';
//import Separator from '../listItems/Separator';

class ExhibitorList extends Component {
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
                    <ExhibitorListItem
                        exhibitorId={item.id}
                        exhibitorName={item.exhibitorName}
                        profilePic={item.profilePic}
                        boothLocation={item.boothLocation}
                        onExhibitorPress={this.props.onExhibitorPress}
                    />
                )}
            />
        );
    }
}

export default ExhibitorList;
