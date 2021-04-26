import React from "react";
import { StyleSheet, StatusBar, View, ActivityIndicator } from "react-native";
import moment from "moment";
import { Calendar } from "../components/Calendar";
import Events from "../components/Lists/Events";
import { connect } from "react-redux";
import { Segment, Button, Text, Picker, Icon } from "native-base";
import { fetchToken } from "../actions/token";
import { setIsMyAgenda } from "../actions/agenda";
import { URLS } from "../config";
import axios from "axios";

class EventAgenda extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.isMyAgenda ? 2 : 1,
      agendaActive: this.props.isMyAgenda ? false : true,
      myAgendaActive: this.props.isMyAgenda ? true : false,
      agendaEvents: [],
      myAgendaEvents: [],
      myAgendaItems: [],
      currentDate: this.props.isMyAgenda
        ? this.props.myAgendaStartDate
        : this.props.agendaStartDate,
      filterTrackId: null,
      loading: false
    };
  }
  static navigationOptions = {
    header: null
  };

  goToAgenda = () => {
    const { currentDate } = this.state;
    //console.log("GOTOAGENDA");
    //console.log(this.state.currentDate);
    this.setState({
      page: 1,
      agendaActive: true,
      myAgendaActive: false,
      agendaEvents: this.filterAgendaEvents(moment(currentDate))
    });
    this.props.dispatch(setIsMyAgenda(false));
  };

  goToMyAgenda = () => {
    const { currentDate } = this.state;
    //console.log("GOTOMYAGENDA");
    //console.log(currentDate);
    //console.log(this.props.myAgendaStartDate);
    this.setState({
      page: 2,
      agendaActive: false,
      myAgendaActive: true,
      myAgendaEvents: this.filterMyAgendaEvents(moment(currentDate))
    });
  };

  getFilteredEvents = async () => {
    const {
      token,
      tokenSet,
      myAgendaStartDate,
      agendaStartDate,
      navigation,
      isMyAgenda,
      userId,
      eventId
    } = this.props;
    const { currentDate } = this.state;

    console.log("ISMYAGENDA");
    console.log(isMyAgenda);

    const api = `${URLS.myAgendaItems}/${eventId}/${userId}`;
    const response = await axios.get(api, {
      headers: { Authorization: `Bearer ${token}` }
    });

    let myCurrentDate = moment();
    console.log("MY AGENDA RESPONSE");
    console.log(response.data);
    if (Array.isArray(response.data) && response.data.length > 0) {
      console.log("MADE IT");
      myCurrentDate = response.data[0].startDate;
      this.setState({
        myAgendaItems: response.data
      });
    }

    if (!isMyAgenda) {
      if (!currentDate && agendaStartDate) {
        this.setState({ currentDate: agendaStartDate });
      } else if (!currentDate && !agendaStartDate) {
        this.setState({ currentDate: moment() });
      }

      this.setState({
        page: 1,
        agendaActive: true,
        myAgendaActive: false
      });
    } else {
      if (!currentDate && myCurrentDate) {
        this.setState({ currentDate: myCurrentDate });
      } else if (!currentDate && !myCurrentDate) {
        this.setState({ currentDate: moment() });
      }

      this.setState({
        page: 2,
        agendaActive: false,
        myAgendaActive: true
      });
    }
    if (tokenSet) {
      let filteredEvents = this.filterAgendaEvents(moment(currentDate));
      this.setState({
        agendaEvents: filteredEvents,
        loading: false
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        filteredEvents = this.filterMyAgendaEvents(
          moment(response.data[0].startDate)
        );

        this.setState({
          myAgendaEvents: filteredEvents,
          loading: false
        });
      }
    } else {
      console.log("fetching token");
      const { dispatch } = this.props;
      fetchToken(dispatch);
    }
  };
  //};

  componentDidMount() {
    console.log("DIDMOUNT");
    console.log(this.props.agendaStartDate);
    console.log(this.props.myAgendaStartDate);
    this.setState({ loading: true });
    this.getFilteredEvents();
  }

  componentDidUpdate(prevProps) {
    const { currentDate } = this.state;
    const { isMyAgenda, myAgendaItems, myAgendaItemsLoaded } = this.props;
    console.log("DIDUPDATE");
    console.log(prevProps.myAgendaItemsLoaded);
    console.log(myAgendaItemsLoaded);
    console.log(currentDate);
    //if (prevProps.myAgendaItemsLoaded != myAgendaItemsLoaded) {
    //  this.setState({ loading: false });
    //  this.getFilteredEvents();
    //}
    //if (prevProps.myAgendaItems != myAgendaItems) {
    //this.getFilteredEvents();
    //}
  }

  filterAgendaEvents(date) {
    const { agendaItems } = this.props;
    const { page, filterTrackId } = this.state;

    let filteredEvents = [];
    filteredEvents = agendaItems.filter(event =>
      moment(event.startDate).isSame(date, "day")
    );
    if (filterTrackId) {
      console.log("FILTER");
      console.log(filteredEvents);
      filteredEvents = filteredEvents.filter(event =>
        event.trackAgendaItems.some(a => a.trackId == filterTrackId)
      );
    }
    return filteredEvents;
  }

  filterMyAgendaEvents(date) {
    //const { myAgendaItems } = this.props;
    const { page, filterTrackId, myAgendaItems } = this.state;
    console.log("MYAGENDAITEMS");
    console.log(myAgendaItems);
    let filteredEvents = [];
    try {
      if (myAgendaItems != undefined) {
        filteredEvents = myAgendaItems.filter(event =>
          moment(event.startDate).isSame(date, "day")
        );
        if (filterTrackId) {
          console.log("FILTERING");
          filteredEvents = filteredEvents.filter(event =>
            event.trackAgendaItems.some(a => a.trackId == filterTrackId)
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
    return filteredEvents;
  }

  onSelectAgendaDate = date => {
    this.setState({
      agendaEvents: this.filterAgendaEvents(date),
      currentDate: date
    });
  };

  onSelectMyAgendaDate = date => {
    this.setState({
      myAgendaEvents: this.filterMyAgendaEvents(date),
      currentDate: date
    });
  };

  goToAgendaItem = async itemId => {
    this.props.navigation.navigate("AgendaItemInfo", { agendaItemId: itemId });
  };

  onValueChange(value) {
    console.log("VALUE");
    console.log(value);
    this.setState(
      {
        filterTrackId: value
      },
      () =>
        this.setState({
          agendaEvents: this.filterAgendaEvents(this.state.currentDate),
          myAgendaEvents: this.filterMyAgendaEvents(this.state.currentDate)
        })
    );
  }

  render() {
    const { agendaEvents, myAgendaEvents, page, currentDate } = this.state;
    const {
      tracks,
      isMyAgenda,
      myAgendaItemsLoaded,
      myAgendaStartDate
    } = this.props;

    console.log("RENDERING SCHEDULE");
    console.log(isMyAgenda);
    console.log(myAgendaItemsLoaded);
    console.log(currentDate);

    let trackList = tracks.map((s, i) => {
      return <Picker.Item key={i} value={s.id} label={s.trackName} />;
    });

    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#eee" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down" />}
            placeholder="All Events"
            style={{ alignSelf: "center" }}
            selectedValue={this.state.filterTrackId}
            onValueChange={this.onValueChange.bind(this)}
          >
            {trackList}
          </Picker>
          <Segment>
            <Button
              first
              active={this.state.agendaActive}
              onPress={this.goToAgenda}
            >
              <Text>Schedule</Text>
            </Button>
            <Button
              last
              active={this.state.myAgendaActive}
              onPress={this.goToMyAgenda}
            >
              <Text>My Schedule</Text>
            </Button>
          </Segment>

          <Calendar
            onSelectDate={
              page == 1 ? this.onSelectAgendaDate : this.onSelectMyAgendaDate
            }
            currentDate={currentDate}
          />
          <Events
            events={page == 1 ? agendaEvents : myAgendaEvents}
            onAgendaItemPress={this.goToAgendaItem}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 10
  }
});

const mapStateToProps = state => {
  const { token, tokenSet } = state.token;
  const { userId } = state.user;
  const { eventId } = state.event;
  const { agendaItems, agendaStartDate, isMyAgenda, tracks } = state.agenda;
  return {
    token,
    tokenSet,
    eventId,
    agendaItems,
    agendaStartDate,
    isMyAgenda,
    tracks,
    userId
  };
};

export default connect(mapStateToProps)(EventAgenda);
