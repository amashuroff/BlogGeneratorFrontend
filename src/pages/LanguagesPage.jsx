import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import headcells from "../config/headcells";
import agent from "../api/agent";
import config from "../api/config";
import { createLanguage, getLanguages } from "../state/actions";

import { useArticleStyles } from "../styles/styles";

import { Box, Grid, Typography, Paper } from "@material-ui/core";
import FormModal from "../components/FormModal";
import Table from "../components/table/Table";
import LinearLoader from "../components/LinearLoader";

const LanguagesPage = ({ createLanguage, languages, getLanguages }) => {
  const classes = useArticleStyles();

  const [isFetching, setIsFetching] = useState(false);
  const [refresh, setRefresh] = useState(null);
  const [tableConfig, setTableConfig] = useState(config.Articles);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setIsFetching(true);
        await getLanguages(tableConfig);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchTableData();
  }, [refresh, tableConfig, languages.newLanguage, getLanguages]);

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
              <FormModal name="Language" handleCreateOption={createLanguage} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <LinearLoader isFetching={isFetching} />
          <Table
            justCreatedRow={languages.newLanguage}
            headCells={headcells.Languages}
            agent={agent.Languages}
            tableData={languages}
            config={tableConfig}
            setConfig={setTableConfig}
            setRefresh={setRefresh}
            disableEdit
            disableFilter
            disableView
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    languages: state.languages,
  };
};

export default connect(mapStateToProps, { createLanguage, getLanguages })(
  LanguagesPage
);
