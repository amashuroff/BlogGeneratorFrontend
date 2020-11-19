import { CREATE_LANGUAGE, GET_LANGUAGES } from "../actions/types";

const INITIAL_STATE = {
  items: [],
  pager: {},
  newLanguage: null,
};

export const languagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_LANGUAGE:
      return { ...state, newLanguage: action.payload };
    case GET_LANGUAGES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
