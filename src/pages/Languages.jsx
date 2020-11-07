import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Box, Grid, Typography, Paper } from "@material-ui/core";
import { useArticleStyles } from "../styles/styles";

import Table from "../components/table/Table";
// import FormDialogAdd from "./buttons-forms/FormDialogAdd";

import headCells from "../config/headcells";
import agent from "../api/agent";
import config from "../api/config";

const Languages = () => {
  let { url } = useRouteMatch();
  const classes = useArticleStyles();

  // const addRow = (name) => {
  //   languagesCrudRepository
  //     .createRow(name)
  //     .then((res) => {
  //       handleSetResponse(res);
  //     })
  //     .catch((err) => {
  //       handleSetResponse(err.status);
  //     });

  //   setConfig({ ...config });
  // };

  return (
    <Paper elevation={0} className={classes.paper}>
      <Switch>
        <Route exact path={url}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h5">Languages</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Box mr={1}>
                  {/* <FormDialogAdd
                    name={"Language"}
                    handleAddNewOption={addRow}
                  /> */}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Table
                headCells={headCells.Languages}
                initConfig={config.Languages}
                pageURL={url}
                crudRepository={agent.Languages}
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

export default Languages;
