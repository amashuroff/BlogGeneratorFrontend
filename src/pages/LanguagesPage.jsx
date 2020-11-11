import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import { Box, Button, Grid, Typography, Paper } from "@material-ui/core";
import { useArticleStyles } from "../styles/styles";

import headcells from "../config/headcells";
import agent from "../api/agent";
import config from "../api/config";
import ErrorToast from "../components/ErrorToast";
import LinearLoader from "../components/LinearLoader";

const LanguagesPage = () => {
  const classes = useArticleStyles();
  const [tableData, setTableData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      setIsFetching(true);
      const data = await agent.Languages.list(config.Languages);
      setTableData({ ...data, ...tableData });
    } catch (error) {
      setErrors({ ...errors, error });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      <ErrorToast error={errors.error?.message} />
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
          <LinearLoader isFetching={isFetching} />
          <Table
            data={tableData}
            headCells={headcells.Languages}
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
