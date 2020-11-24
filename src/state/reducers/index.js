import { combineReducers } from "redux";
import { languagesReducer } from "./languagesReducer";
import { topicsReducer } from "./topicsReducer";
import { articlesReducer } from "./articlesReducer";
import { errorReducer } from "./errorReducer";

export default combineReducers({
  languages: languagesReducer,
  topics: topicsReducer,
  articles: articlesReducer,
  errors: errorReducer,
});
