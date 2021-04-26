import React from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import moment from "moment";
import { Calendar } from "../components/Calendar";
import Events from "../components/Lists/Events";
import { connect } from "react-redux";
import { fetchToken } from "../actions/token";

class MyAgenda extends React.Component {
  state = {
    events: []
  };

  filterEvents(date) {
    const { myAgendaItems } = this.props;
    console.log(myAgendaItems);
    filteredEvents = [];
    filteredEvents = myAgendaItems.filter(event =>
      moment(event.startDate).isSame(date, "day")
    );
    return filteredEvents;
  }
  onSelectDate = date => {
    this.setState({ events: this.filterEvents(date) });
  };

  goToAgendaItem = async itemId => {
    console.log(itemId);
    this.props.navigation.navigate("AgendaItemInfo", { agendaItemId: itemId });
  };

  componentWillMount() {
    const { token, tokenSet, myAgendaStartDate } = this.props;

    if (tokenSet && myAgendaStartDate != undefined) {
      let filteredEvents = this.filterEvents(moment(myAgendaStartDate));
      this.setState({ events: filteredEvents });
    } else {
      //this does not seem the most elegant solution,
      //but I wanted to move the fetchToken method out of here
      console.log("fetching token");
      const { dispatch } = this.props;
      fetchToken(dispatch);
    }
  }

  componentDidUpdate(prevProps) {
    console.log("MYAGENDA UPDATE");
    console.log(prevProps.myAgendaStartDate);
    console.log(this.props.myAgendaStartDate);
    if (prevProps.myAgendaItems != this.props.myAgendaItems) {
      let filteredEvents = this.filterEvents(
        moment(this.props.myAgendaStartDate)
      );
      this.setState({ events: filteredEvents });
    }
  }

  render() {
    const { events } = this.state;
    return (
      <View style={styles.container}>
        <Calendar
          onSelectDate={this.onSelectDate}
          currentDate={this.props.myAgendaStartDate}
        />
        <Events events={events} onAgendaItemPress={this.goToAgendaItem} />
      </View>
    );
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
  const { eventId } = state.event;
  const { myAgendaItems, myAgendaStartDate } = state.agenda;
  const { userLoggedIn } = state.user;
  //console.log('AGENDA START DATE');
  //console.log(agendaStartDate);
  return {
    token,
    tokenSet,
    eventId,
    myAgendaItems,
    myAgendaStartDate,
    userLoggedIn
  };
};

export default connect(mapStateToProps)(MyAgenda);
