import { call, put } from "redux-saga/effects";
import { FETCH_ARTICLES } from "../actions/types";
import { showLoader, hideLoader } from "../actions";
import agent from "../../api/agent";
import config from "../../api/config";

export function* fetchArticles() {
  try {
    yield put(showLoader());
    const payload = yield call(agent.Articles.list, config.Articles);
    yield put({ type: FETCH_ARTICLES, payload });
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
  }
}
