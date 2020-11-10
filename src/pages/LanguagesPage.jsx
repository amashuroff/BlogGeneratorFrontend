import React, { useEffect } from "react";
import { Box, Grid, Typography, Paper } from "@material-ui/core";
import { useArticleStyles } from "../styles/styles";
import headcells from "../config/headcells";
import { requestLanguages } from "../redux/actions/languagesActions";
import { connect } from "react-redux";

import Table from "../components/table/Table";

const Languages = (props) => {
  const classes = useArticleStyles();

  useEffect(() => {
    props.requestLanguages();
  }, []);

  return (
    <Paper elevation={0} className={classes.paper}>
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
            data={props.languages}
            headCells={headcells.Languages}
            config={props.languages.config}
            disableEdit
            disableView
            disableFilter
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

export default connect(mapStateToProps, { requestLanguages })(Languages);
