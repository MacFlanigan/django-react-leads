import {combineReducers} from "redux";
import leads from "./leads"
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  leadsReducer: leads,
  authReducer: auth,
  errors,
  messages
});