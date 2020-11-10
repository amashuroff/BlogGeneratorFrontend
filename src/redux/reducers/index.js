import { combineReducers } from "redux";
import { articlesReducer } from "./articlesReducer";
import { languagesReducer } from "./languagesReducer";
import { topicsReducer } from "./topicsReducer";

export default combineReducers({
  articles: articlesReducer,
  languages: languagesReducer,
  topics: topicsReducer,
});
