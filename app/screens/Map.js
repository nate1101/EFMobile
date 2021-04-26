import React, { Component } from 'react';
import {
    ScrollView,
    Image,
    TouchableHighlight,
    Dimensions,
    Text,
    Button
} from 'react-native';
const { deviceWidth, deviceHeight } = Dimensions.get('window');
const points = [
    { top: 290, left: 280, icon: require('../../assets/images/icon.png') }, //icon demo
    { top: 320, left: 290, icon: require('../../assets/images/icon.png') }, //icon demo
    { top: 480, left: 590, icon: require('../../assets/images/icon.png') }, //icon demo
    { top: 740, left: 780, icon: require('../../assets/images/icon.png') } //icon demo
];
import ImageZoom from 'react-native-image-pan-zoom';

export default class Map extends Component {
    static defaultProps = {
        doAnimateZoomReset: false,
        maximumZoomScale: 30,
        minimumZoomScale: 0.1,
        zoomHeight: deviceHeight,
        zoomWidth: deviceWidth
    };
    handleResetZoomScale = event => {
        this.scrollResponderRef.scrollResponderZoomTo({
            x: 0,
            y: 0,
            width: this.props.zoomWidth,
            height: this.props.zoomHeight,
            animated: true
        });
    };
    setZoomRef = node => {
        //the ScrollView has a scrollResponder which allows us to access more methods to control the ScrollView component
        if (node) {
            this.zoomRef = node;
            this.scrollResponderRef = this.zoomRef.getScrollResponder();
        }
    };
    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }} //flexbox styles
                centerContent //centers content when zoom is less than scroll view bounds
                //zoomScale={10}
                maximumZoomScale={this.props.maximumZoomScale}
                minimumZoomScale={this.props.minimumZoomScale}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ref={this.setZoomRef} //helps us get a reference to this ScrollView instance
                style={{ overflow: 'hidden' }} //, position: "relative" }}
            >
                <Image
                    source={require('../../assets/images/Rey_BHCC-2.jpg')}
                    //style={{ height: 1431, width: 995 }}
                />
                {points.map((p, i) => (
                    <TouchableHighlight
                        key={i}
                        style={{
                            position: 'absolute',
                            zIndex: 10,
                            top: p.top,
                            start: p.left
                            //fontWeight: "bold",
                            //color: "#10ee00"
                        }}
                        onPress={() => {}}
                    >
                        <Image source={p.icon} />
                    </TouchableHighlight>
                ))}
            </ScrollView>
        );
    }
}

/* import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions
} from "react-native";
import { Agenda } from "react-native-calendars";
import {
  Card,
  Container,
  CardItem,
  Left,
  Button,
  Body,
  Right,
  Icon,
  ListItem,
  Thumbnail
} from "native-base";
import axios from "axios";
import { connect } from "react-redux";
import { fetchToken } from "../actions/token";
import { URLS } from "../config";
import ZoomableImage from "../components/Interactive/ZoomableImage";
//const { deviceWidth, deviceHeight } = Dimensions.get("window");
const annotations = [
  {
    x1: 25,
    x2: 35,
    y1: 20,
    y2: 30,
    description:
      "A pair of black running sports shoes, has lace-up detail. Textile and mesh upper"
  },
  {
    x1: 60,
    x2: 70,
    y1: 15,
    y2: 25,
    description: "Shoe sole tip!"
  },
  {
    x1: 20,
    x2: 30,
    y1: 50,
    y2: 60,
    description: "Textured and patterned outsole"
  },
  {
    x1: 65,
    x2: 75,
    y1: 65,
    y2: 75,
    description: "Textured outsole with a stacked heel"
  }
];

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Object
    };
  }

  componentWillMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;
    return (
      <View>
        <ZoomableImage
          source={require("../assets/images/Rey_BHCC-2.jpg")}
          imageHeight={1431}
          imageWidth={995}
          annotations={annotations}
          popOverStyles={{ backgroundColor: "white" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  const { token, tokenSet } = state.token;
  const { userId, userLoggedIn } = state.user;
  const { eventId } = state.event;
  return {
    token,
    tokenSet,
    userId,
    userLoggedIn,
    eventId
  };
};

export default connect(mapStateToProps)(Map);
 */
