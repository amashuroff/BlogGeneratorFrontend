import React from "react";
import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import { Box, Button, Grid, Typography, Paper } from "@material-ui/core";
import { useArticleStyles } from "../styles/styles";

import headcells from "../config/headcells";
import agent from "../api/agent";
import config from "../api/config";

const TopicsPage = () => {
  const classes = useArticleStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container spacing={2} className={classes.grid}>
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
              <Button
                variant="contained"
                color="primary"
                disableElevation
                component={Link}
                to="/topics/new"
              >
                Create
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table
            agent={agent.Topics}
            tableConfig={config.Topics}
            headCells={headcells.Topics}
            disableEdit
            disableFilter
            disableView
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TopicsPage;
