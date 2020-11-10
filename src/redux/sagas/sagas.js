import { all, call, put, select, takeEvery, fork } from "redux-saga/effects";
import {
  FETCH_ARTICLES,
  REQUEST_ARTICLES,
  FETCH_LANGUAGES,
  REQUEST_LANGUAGES,
  FETCH_TOPICS,
  REQUEST_TOPICS,
} from "../actions/types";
import agent from "../../api/agent";

function* fetchArticles() {
  const getConfig = (state) => state.articles.config;
  try {
    const config = yield select(getConfig);
    const payload = yield call(agent.Articles.list, config);
    yield put({ type: FETCH_ARTICLES, payload });
  } catch (error) {
    console.log(error);
  }
}

function* articlesSaga() {
  yield takeEvery(REQUEST_ARTICLES, fetchArticles);
}

function* fetchLanguages() {
  const getConfig = (state) => state.languages.config;
  try {
    const config = yield select(getConfig);
    const payload = yield call(agent.Languages.list, config);
    yield put({ type: FETCH_LANGUAGES, payload });
  } catch (error) {
    console.log(error);
  }
}

function* languagesSaga() {
  yield takeEvery(REQUEST_LANGUAGES, fetchLanguages);
}

function* fetchTopics() {
  const getConfig = (state) => state.topics.config;
  try {
    const config = yield select(getConfig);
    const payload = yield call(agent.Topics.list, config);
    yield put({ type: FETCH_TOPICS, payload });
  } catch (error) {
    console.log(error);
  }
}

function* topicsSaga() {
  yield takeEvery(REQUEST_TOPICS, fetchTopics);
}

function* rootSaga() {
  yield all([fork(articlesSaga), fork(languagesSaga), fork(topicsSaga)]);
}

export default rootSaga;
