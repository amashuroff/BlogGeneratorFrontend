import React from "react";
import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import { Box, Button, Grid, Typography, Paper } from "@material-ui/core";
import { useArticleStyles } from "../styles/styles";

import headcells from "../config/headcells";
import agent from "../api/agent";
import config from "../api/config";

const LanguagesPage = () => {
  const classes = useArticleStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container spacing={2} className={classes.grid}>
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
              <Button
                variant="contained"
                color="primary"
                disableElevation
                component={Link}
                to="/languages/new"
              >
                Create
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table
            config={config.Languages}
            headCells={headcells.Languages}
            agent={agent.Languages}
            disableEdit
            disableFilter
            disableView
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LanguagesPage;
