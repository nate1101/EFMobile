const initialState = {
  token: "",
  tokenSet: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
        tokenSet: true
      };
    default:
      return state;
  }
};
