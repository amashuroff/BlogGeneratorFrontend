import { ADD_NEW_ARTICLE_TO_STORE } from "../actions/types";

const INITIAL_STATE = {
  newArticle: null,
};

export const articlesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_ARTICLE_TO_STORE:
      return { ...state, newArticle: action.payload };
    default:
      return state;
  }
};
