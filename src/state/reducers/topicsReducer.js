import {
  CREATE_TOPIC,
  DELETE_NEW_TOPIC_FROM_STORE,
  GET_TOPICS,
} from "../actions/types";

const INITIAL_STATE = {
  newTopic: null,
};

export const topicsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TOPIC:
      return { ...state, newTopic: action.payload };
    case DELETE_NEW_TOPIC_FROM_STORE:
      return { ...state, newTopic: null };
    case GET_TOPICS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
