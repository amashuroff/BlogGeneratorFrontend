import agent from "../../api/agent";
import {
  GET_TOPICS,
  GET_LANGUAGES,
  CREATE_TOPIC,
  CREATE_LANGUAGE,
  ADD_NEW_ARTICLE_TO_STORE,
  DELETE_NEW_ARTICLE_FROM_STORE,
  DELETE_NEW_LANGUAGE_FROM_STORE,
  DELETE_NEW_TOPIC_FROM_STORE,
  CLOSE_ERROR_TOAST,
} from "../actions/types";

export const getTopics = (config) => async (dispatch) => {
  const { items, pager } = await agent.Topics.list(config);

  dispatch({
    type: GET_TOPICS,
    payload: { items, pager },
  });
};

export const getLanguages = (config) => async (dispatch) => {
  const { items, pager } = await agent.Languages.list(config);

  dispatch({
    type: GET_LANGUAGES,
    payload: { items, pager },
  });
};

export const createTopic = (name) => async (dispatch) => {
  const newTopic = await agent.Topics.create({ name: name });

  dispatch({
    type: CREATE_TOPIC,
    payload: newTopic,
  });

  setTimeout(() => {
    dispatch({
      type: DELETE_NEW_TOPIC_FROM_STORE,
    });
  }, 2000);
};

export const createLanguage = (name) => async (dispatch) => {
  const newLanguage = await agent.Languages.create({ name: name });

  dispatch({
    type: CREATE_LANGUAGE,
    payload: newLanguage,
  });

  setTimeout(() => {
    dispatch({
      type: DELETE_NEW_LANGUAGE_FROM_STORE,
    });
  }, 2000);
};

export const addNewArticleToStore = (article) => async (dispatch) => {
  await dispatch({
    type: ADD_NEW_ARTICLE_TO_STORE,
    payload: article,
  });

  setTimeout(() => {
    dispatch({
      type: DELETE_NEW_ARTICLE_FROM_STORE,
    });
  }, 2000);
};

export const closeErrorToast = () => {
  return {
    type: CLOSE_ERROR_TOAST,
  };
};
