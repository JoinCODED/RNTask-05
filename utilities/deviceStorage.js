import { AsyncStorage } from "react-native";

const deviceStorage = {
  saveToken(value) {
    console.log(value);
    AsyncStorage.setItem("token", value).catch(err => console.log(err));
  },

  getToken() {
    return AsyncStorage.getItem("token").then(value => {
      if (value !== null) {
        return value;
      } else {
        return null;
      }
    });
  },

  deleteJWT() {
    AsyncStorage.removeItem("token");
  }
};

export default deviceStorage;
