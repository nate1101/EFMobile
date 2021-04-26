export const setUserRoles = roles => ({
  type: "SET_USER_ROLES",
  roles: roles
});

export const setUserLoggedIn = userLoggedIn => ({
  type: "SET_USER_LOGGED_IN",
  userLoggedIn: userLoggedIn
});

export const setUserAdmin = userIsAdmin => ({
  type: "SET_USER_IS_ADMIN",
  userIsAdmin: userIsAdmin
});

export const setUserId = userId => ({
  type: "SET_USER_ID",
  userId: userId
});

export const setUserToken = (userToken, userTokenExpirationDate) => ({
  type: "SET_USER_TOKEN",
  userToken: userToken,
  userTokenExpirationDate: userTokenExpirationDate
});

export const setUserEmailPassword = (userEmail, userPassword) => ({
  type: "SET_USER_EMAIL_PASSWORD",
  userEmail: userEmail,
  userPassword: userPassword
});
