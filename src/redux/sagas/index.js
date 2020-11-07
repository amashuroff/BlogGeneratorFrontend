import { takeEvery } from "redux-saga/effects";
import { REQUEST_ARTICLES } from "../actions/types";
import { fetchArticles } from "./articles";

function* sagaWatcher() {
  yield takeEvery(REQUEST_ARTICLES, fetchArticles);
}

export default sagaWatcher;
