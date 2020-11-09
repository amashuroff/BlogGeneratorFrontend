import {
  FETCH_ARTICLES,
  SHOW_ARTICLES_LOADER,
  HIDE_ARTICLES_LOADER,
} from "../actions/types";

// /*
// Sort:
//   0: no sort
//   1: asc
//   2: desc
// */

const INITIAL_STATE = {
  loading: false,
  config: {
    page: 0,
    pageSize: 5,
    sortByCreatedAt: 2,
  },
};

export const articlesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return { ...state, ...action.payload };
    case SHOW_ARTICLES_LOADER:
      return { ...state, loading: true };
    case HIDE_ARTICLES_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};
