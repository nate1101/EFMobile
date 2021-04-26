import React from 'react';
import { Text } from 'react-native';
import { MapView } from 'expo';
import { URLS } from '../config';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchToken } from '../actions/token';

class EventLocation extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        //const { navigation } = this.props;
        //this.setState({
        //    longitude: navigation.getParam('longitude', 0),
        //    latitude: navigation.getParam('latitude', 0)
        //});
    }
    render() {
        const { navigation } = this.props;
        console.log(navigation.getParam('longitude', 0));
        console.log(navigation.getParam('latitude', 0));
        let longitude = navigation.getParam('longitude', 0);
        let latitude = navigation.getParam('latitude', 0);
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: navigation.getParam('latitude', 0),
                    longitude: navigation.getParam('longitude', 0),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                showsUserLocation
                showsMyLocationButton
            >
                <MapView.Marker
                    coordinate={{
                        latitude: navigation.getParam('latitude', 0),
                        longitude: navigation.getParam('longitude', 0)
                    }}
                    title='Event Location'
                />
            </MapView>
        );
    }
}

const mapStateToProps = state => {
    const { token, tokenSet } = state.token;
    const { eventId, longitude, latitude } = state.event;
    return {
        token,
        tokenSet,
        eventId,
        longitude,
        latitude
    };
};

export default connect(mapStateToProps)(EventLocation);
