const initialState = {
  roles: [],
  userLoggedIn: false,
  userIsAdmin: false,
  userId: null,
  userToken: null,
  userTokenExpirationDate: null,
  userEmail: null,
  userPassword: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ROLES":
      return {
        ...state,
        roles: action.roles
      };
    case "SET_USER_LOGGED_IN":
      return {
        ...state,
        userLoggedIn: action.userLoggedIn,
        teamIdSet: true
      };
    case "SET_USER_IS_ADMIN":
      return {
        ...state,
        userIsAdmin: action.userIsAdmin
      };
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.userId
      };
    case "SET_USER_TOKEN":
      return {
        ...state,
        userToken: action.userToken,
        userTokenExpirationDate: action.userTokenExpirationDate
      };
    case "SET_USER_EMAIL_PASSWORD":
      return {
        ...state,
        userEmail: action.userEmail,
        userPassword: action.userPassword
      };
    default:
      return state;
  }
};
