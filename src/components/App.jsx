import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import AppWrapper from "./AppWrapper.jsx";
import Home from "../pages/HomePage";
import ArticlesPage from "../pages/articles/ArticlesPage";
import LanguagesPage from "../pages/LanguagesPage";
import TopicsPage from "../pages/TopicsPage";

function App() {
  return (
    <>
      <CssBaseline />

      <BrowserRouter>
        <AppWrapper>
          <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/articles" exact component={ArticlesPage} />
            <Route path="/articles/new" />
            <Route path="/articles/show/:id" />
            <Route path="/articles/edit/:id" />
            <Route path="/articles/upload" />

            <Route path="/topics" exact component={TopicsPage} />
            <Route path="/topics/new" />

            <Route path="/languages" exact component={LanguagesPage} />
            <Route path="/languages/new" />
          </Switch>
        </AppWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
