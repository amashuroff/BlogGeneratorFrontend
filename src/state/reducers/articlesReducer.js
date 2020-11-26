import {
  ADD_NEW_ARTICLE_TO_STORE,
  DELETE_NEW_ARTICLE_FROM_STORE,
} from "../actions/types";

const INITIAL_STATE = {
  newArticle: null,
};

export const articlesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_ARTICLE_TO_STORE:
      return { ...state, newArticle: action.payload };
    case DELETE_NEW_ARTICLE_FROM_STORE:
      return { ...state, newArticle: null };
    default:
      return state;
  }
};
