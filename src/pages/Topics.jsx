import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Table from "../components/table/Table";
import { Box, Grid, Typography, Paper } from "@material-ui/core";

import { useArticleStyles } from "../styles/styles"; // change

import { topicsHeadCells } from "./topics/topicsHeadCells";
import { topicsCrudRepository } from "../api/crudRepository";
import FormDialogAdd from "./buttons-forms/FormDialogAdd";
import RequestHandler from "./helpers/RequestHandler";
import { topicsResponse } from "./topics/topicsResponse";

import { config as initConfig } from "./topics/config.js";

const Topics = () => {
  let { url } = useRouteMatch();
  const classes = useArticleStyles();

  const [response, setResponse] = useState(null);
  const [config, setConfig] = useState(initConfig);

  const handleSetResponse = (response) => {
    setResponse(response);
    setTimeout(() => {
      setResponse(null);
    }, 1500);
  };

  const addRow = (name) => {
    topicsCrudRepository
      .createRow(name)
      .then((res) => {
        handleSetResponse(res);
      })
      .catch((err) => {
        handleSetResponse(err.status);
      });

    setConfig({ ...config });
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <Switch>
        <Route exact path={url}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h5">Topics</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Box mr={1}>
                  <FormDialogAdd name={"Topic"} handleAddNewOption={addRow} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <RequestHandler response={response} messages={topicsResponse} />
              <Table
                headCells={topicsHeadCells}
                initConfig={config}
                pageURL={url}
                crudRepository={topicsCrudRepository}
                disableFilter={true}
                disableView={true}
                disableEdit={true}
              />
            </Grid>
          </Grid>
        </Route>
      </Switch>
    </Paper>
  );
};

export default Topics;
