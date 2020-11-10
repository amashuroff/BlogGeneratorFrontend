import { FETCH_LANGUAGES } from "../actions/types";

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

export const languagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LANGUAGES:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
