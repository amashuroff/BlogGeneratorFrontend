import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import headcells from "../config/headcells";
import agent from "../api/agent";
import config from "../api/config";
import { createTopic, getTopics } from "../state/actions";

import { useArticleStyles } from "../styles/styles";

import { Box, Grid, Typography, Paper } from "@material-ui/core";
import FormModal from "../components/FormModal";
import Table from "../components/table/Table";
import LinearLoader from "../components/LinearLoader";

const TopicsPage = ({ createTopic, topics, getTopics }) => {
  const classes = useArticleStyles();

  const [isFetching, setIsFetching] = useState(false);
  const [refresh, setRefresh] = useState(null);
  const [tableConfig, setTableConfig] = useState(config.Articles);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setIsFetching(true);
        await getTopics(tableConfig);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchTableData();
  }, [refresh, tableConfig, topics.newTopic, getTopics]);

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
              <FormModal name="Topic" handleCreateOption={createTopic} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <LinearLoader isFetching={isFetching} />
          <Table
            justCreatedRow={topics.newTopic}
            headCells={headcells.Topics}
            agent={agent.Topics}
            tableData={topics}
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
    topics: state.topics,
  };
};

export default connect(mapStateToProps, { createTopic, getTopics })(TopicsPage);
