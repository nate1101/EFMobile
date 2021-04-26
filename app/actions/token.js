import axios from "axios";
import { URLS } from "../config";

export function fetchToken(dispatch) {
  if (__DEV__) {
    //console.log("Scott");
    console.log("URL_TOKEN: " + URLS.token);
  }

  axios
    .get(`${URLS.token}`)
    .then(function(response) {
      if (__DEV__) {
        console.log(response.data);
      }
      return dispatch(setToken(response.data.token));
    })
    .catch(function(error) {
      //need to show error page or message
      console.log(error);
    });
}

export const setToken = token => ({
  type: "SET_TOKEN",
  token: token
});
