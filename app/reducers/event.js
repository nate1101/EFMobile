const initialState = {
  eventId: "0",
  eventIdSet: false
};

export default (state = initialState, action) => {
  if (__DEV__) {
    if (typeof console.dir === "function") {
      console.dir(action);
    }
  }

  switch (action.type) {
    case "SET_EVENT":
      return {
        ...state
      };
    case "SET_EVENT_EVENTID":
      return {
        ...state,
        eventId: action.eventId,
        eventIdSet: true
      };
    default:
      return state;
  }
};
