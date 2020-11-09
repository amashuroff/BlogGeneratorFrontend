import { call, put, select } from "redux-saga/effects";
import { FETCH_ARTICLES } from "../actions/types";
import { showLoader, hideLoader } from "../actions/articlesActions";
import agent from "../../api/agent";

export function* fetchArticles() {
  const getConfig = (state) => state.articles.config;
  try {
    yield put(showLoader());
    const config = yield select(getConfig);
    const payload = yield call(agent.Articles.list, config);
    yield put({ type: FETCH_ARTICLES, payload });
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
  }
}

export function* deleteArticles() {}
