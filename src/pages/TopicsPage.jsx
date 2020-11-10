import React, { useEffect } from "react";
import { Box, Grid, Typography, Paper } from "@material-ui/core";
import { useArticleStyles } from "../styles/styles";
import headcells from "../config/headcells";
import { requestTopics } from "../redux/actions/topicsActions";
import { connect } from "react-redux";

import Table from "../components/table/Table";

const Topics = (props) => {
  const classes = useArticleStyles();

  useEffect(() => {
    props.requestTopics();
  }, []);

  return (
    <Paper elevation={0} className={classes.paper}>
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
              {/* <FormDialogAdd
                    name={"Language"}
                    handleAddNewOption={addRow}
                  /> */}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table
            data={props.topics}
            headCells={headcells.Topics}
            config={props.topics.config}
            disableEdit
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

export default connect(mapStateToProps, { requestTopics })(Topics);
