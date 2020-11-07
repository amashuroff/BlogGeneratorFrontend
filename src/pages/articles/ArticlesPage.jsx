import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { requestArticles } from "../../redux/actions";
import Table from "../../components/table/Table";
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Link as MaterialLink,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { useArticleStyles } from "../../styles/styles";

const Articles = (props) => {
  const classes = useArticleStyles();

  useEffect(() => {
    props.requestArticles();
  }, []);

  console.log(props.articles);

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container spacing={2}>
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
          <Table />
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  };
};

export default connect(mapStateToProps, { requestArticles })(Articles);
