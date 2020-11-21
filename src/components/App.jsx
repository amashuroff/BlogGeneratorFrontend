import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "../api/history";
import { CssBaseline } from "@material-ui/core";

import AppWrapper from "./AppWrapper.jsx";
import Home from "../pages/HomePage";
import ArticlesPage from "../pages/articles/ArticlesPage";
import CreateArticlesPage from "../pages/articles/CreateArticlesPage";
import LanguagesPage from "../pages/LanguagesPage";
import TopicsPage from "../pages/TopicsPage";
import NotFoundPage from "../pages/NotFoundPage";

function App() {
  return (
    <>
      <CssBaseline />

      <Router history={history}>
        <AppWrapper>
          <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/articles" exact component={ArticlesPage} />
            <Route path="/articles/new" component={CreateArticlesPage} />
            <Route path="/articles/show/:id" />
            <Route path="/articles/edit/:id" />
            <Route path="/articles/upload" />

            <Route path="/topics" exact component={TopicsPage} />
            <Route path="/topics/new" />

            <Route path="/languages" exact component={LanguagesPage} />
            <Route path="/languages/new" />

            <Route path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
        </AppWrapper>
      </Router>
    </>
  );
}

export default App;
