import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Link as MaterialLink,
  Snackbar,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import Table from "../../components/table/Table";
import LinearLoader from "../../components/LinearLoader";
import { useArticleStyles } from "../../styles/styles";

import headcells from "../../config/headcells";
import agent from "../../api/agent";
import config from "../../api/config";
import { Alert } from "@material-ui/lab";
import ErrorToast from "../../components/ErrorToast";

const Articles = () => {
  const classes = useArticleStyles();
  const [tableData, setTableData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setIsFetching(true);
      const data = await agent.Articles.list(config.Articles);
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
              <Typography variant="h5">Articles</Typography>
              <Typography variant="body2">
                Articles available for publishing on generated websites
              </Typography>
            </Box>
            <Box alignSelf="center">
              <MaterialLink href="#">Read More about Articles</MaterialLink>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Box mr={1}>
              <Button variant="contained" color="primary" disableElevation>
                Purchase
              </Button>
            </Box>
            <Box mr={1}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                component={Link}
                to="/articles/create"
              >
                Create
              </Button>
            </Box>
            <Button
              disableElevation
              variant="contained"
              color="default"
              startIcon={<CloudUpload />}
              component={Link}
              to="/articles/upload"
            >
              Upload
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <LinearLoader isFetching={isFetching} />
          <Table data={tableData} headCells={headcells.Articles} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Articles;
