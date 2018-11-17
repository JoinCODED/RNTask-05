import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, SET_ERROR, LOGOUT_USER } from "./types";
import deviceStorage from "../../utilities/deviceStorage";

// Register User

export const registerUser = (userData, navigation) => dispatch => {
  // Clear all Error's
  dispatch(setError());
  axios
    .post("http://coffee.q8fawazo.me/api/register/", userData)
    .then(res => res.data)
    .then(user => {
      const { token } = user;
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // Navigate to Main page
      navigation.navigate("CoffeeList");
    })
    .catch(err => {
      dispatch(setError("Something went wrong!"));
      console.log(err);
    });
};

// Login User - get user token
export const loginUser = (userData, navigation) => dispatch => {
  // Clear all Error's
  dispatch(setError());
  axios
    .post("http://coffee.q8fawazo.me/api/login/", userData)
    .then(res => res.data)
    .then(user => {
      const { token } = user;
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      deviceStorage.saveToken(token);
      // Navigate to Main page
      navigation.navigate("CoffeeList");
    })
    .catch(err => {
      dispatch(setError("Something went wrong!"));
      console.log(err);
    });
};

// Set logged in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// Set Error information
export const setError = text => ({
  type: SET_ERROR,
  payload: text
});

// Logout User
export const logoutUser = navigation => dispatch => {
  dispatch({
    type: LOGOUT_USER
  });
  deviceStorage.deleteJWT();
  navigation.navigate("CoffeeList");
  alert("Logged out successfully");
};
