import { FETCH_ARTICLES, SHOW_LOADER, HIDE_LOADER } from "../actions/types";

const INITIAL_STATE = {
  loading: false,
};

export const articlesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return { ...action.payload };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};
