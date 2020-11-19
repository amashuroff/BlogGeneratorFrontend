import { CREATE_TOPIC, GET_TOPICS } from "../actions/types";

const INITIAL_STATE = {
  items: [],
  pager: {},
  newTopic: null,
};

export const topicsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TOPIC:
      return { ...state, newTopic: action.payload };
    case GET_TOPICS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
