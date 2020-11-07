import { call, put } from "redux-saga/effects";
import { FETCH_ARTICLES } from "../actions/types";
import agent from "../../api/agent";
import config from "../../api/config";

export function* fetchArticles() {
  try {
    // yield loader
    const payload = yield call(agent.Articles.list, config.Articles);
    yield put({ type: FETCH_ARTICLES, payload });
    // hide loader
  } catch (error) {
    console.log(error);
  }
}
