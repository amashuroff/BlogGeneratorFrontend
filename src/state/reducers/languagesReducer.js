import {
  CREATE_LANGUAGE,
  DELETE_NEW_LANGUAGE_FROM_STORE,
  GET_LANGUAGES,
} from "../actions/types";

const INITIAL_STATE = {
  newLanguage: null,
};

export const languagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_LANGUAGE:
      return { ...state, newLanguage: action.payload };
    case DELETE_NEW_LANGUAGE_FROM_STORE: {
      return { ...state, newLanguage: null };
    }
    case GET_LANGUAGES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
