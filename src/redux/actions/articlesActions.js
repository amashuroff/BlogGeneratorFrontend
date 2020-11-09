import {
  REQUEST_ARTICLES,
  SHOW_ARTICLES_LOADER,
  HIDE_ARTICLES_LOADER,
} from "./types";

export const requestArticles = () => {
  return {
    type: REQUEST_ARTICLES,
  };
};

export const showLoader = () => {
  return {
    type: SHOW_ARTICLES_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_ARTICLES_LOADER,
  };
};
