import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "../api/history";
import { CssBaseline } from "@material-ui/core";

import AppWrapper from "./AppWrapper.jsx";
import Home from "../pages/HomePage";
import ArticlesPage from "../pages/articles/ArticlesPage";
import CreateArticlePage from "../pages/articles/CreateArticlePage";
import LanguagesPage from "../pages/LanguagesPage";
import TopicsPage from "../pages/TopicsPage";
import NotFoundPage from "../pages/NotFoundPage";
import ViewArticlePage from "../pages/articles/ViewArticlePage";
import UpdateArticlePage from "../pages/articles/UpdateArticlePage";
import UploadArticlePage from "../pages/articles/UploadArticlePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ErrorToast from "./ErrorToast";

function App() {
  return (
    <>
      <CssBaseline />

      <Router history={history}>
        <Switch>
          <Route path="/account/sign-in" exact component={SignInPage} />
          <Route path="/account/sign-up" component={SignUpPage} />

          <AppWrapper>
            <Route path="/" exact component={Home} />

            <Route path="/articles" exact component={ArticlesPage} />
            <Route path="/articles/new" component={CreateArticlePage} />
            <Route path="/articles/view/:id" component={ViewArticlePage} />
            <Route path="/articles/update/:id" component={UpdateArticlePage} />
            <Route path="/articles/upload" component={UploadArticlePage} />

            <Route path="/topics" exact component={TopicsPage} />

            <Route path="/languages" exact component={LanguagesPage} />

            <Route path="/404" component={NotFoundPage} />
            <Redirect to="/404" />

            <ErrorToast />
          </AppWrapper>
        </Switch>
      </Router>
    </>
  );
}

export default App;
