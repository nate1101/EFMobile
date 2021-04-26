import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Content,
    StatusBar
} from 'react-native';
import { Left, Thumbnail, Body, ListItem } from 'native-base';
import moment from 'moment';

const formatDate = date => moment(date).format('MM/DD/YYYY');

export default class EventHeader extends React.Component {
    render() {
        //console.log("EVENTBANNER");
        //console.log(this.props.eventBanner);
        return (
            <View style={styles.header}>
                <StatusBar barStyle='light-content' />
                <ImageBackground
                    source={{ uri: this.props.eventBanner }}
                    style={{ width: '100%', height: 150 }}
                    resizeMode='cover'
                >
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text
                            style={{
                                color: '#FFF',
                                fontWeight: 'bold',
                                fontSize: 24
                            }}
                        >
                            {this.props.eventName}
                        </Text>
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
                            {formatDate(this.props.eventStartDate)} -{' '}
                            {formatDate(this.props.eventEndDate)}
                        </Text>

                        <Text style={{ color: '#FFF' }}>
                            {this.props.eventCity}, {this.props.eventState}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 150
    }
});
