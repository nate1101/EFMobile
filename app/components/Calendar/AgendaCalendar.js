import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Content
} from 'react-native';
import { Left, Thumbnail, Body, ListItem } from 'native-base';
import Calendar from './Calendar';
import Events from '../Lists/Events';

export default class AgendaCalendar extends React.Component {
    render() {
        //console.log("AgendaCalendar");
        //console.log(this.props.events);
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
