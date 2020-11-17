import { combineReducers } from "redux";
import { languagesReducer } from "./languagesReducer";
import { topicsReducer } from "./topicsReducer";

export default combineReducers({
  languages: languagesReducer,
  topics: topicsReducer,
});
