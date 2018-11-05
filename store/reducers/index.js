import { combineReducers } from "redux";

// Reducers
import coffeeReducer from "./coffeeReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  coffee: coffeeReducer,
  auth: authReducer,
  cart: cartReducer
});
