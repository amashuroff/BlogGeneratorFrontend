import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { createUpdateUploadStyles } from "../../styles/styles.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import agent from "../../api/agent";

const ViewArticlePage = (props) => {
  const classes = createUpdateUploadStyles();
  const [article, setArticle] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsFetching(true);
        const article = await agent.Articles.getById(props.match.params.id);
        setArticle({ ...article });
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchArticle();
  }, [props.match.params.id]);

  return (
    <Paper className={classes.paper} elevation={0}>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <Paper className={classes.form}>
          <Box display="flex" flexDirection="column">
            <Box mb={2}>
              <Typography variant="h6" color="primary">
                Title
              </Typography>
              <Box ml={1}>
                {<Typography variant="body1">{article.title}</Typography>}
              </Box>
            </Box>
            <Box mb={2}>
              <Typography variant="h6" color="primary">
                Topic
              </Typography>
              <Box ml={1}>
                <Typography variant="body1">{article.topic}</Typography>
              </Box>
            </Box>
            <Box mb={2}>
              <Typography variant="h6" color="primary">
                Language
              </Typography>
              <Box ml={1}>
                <Typography variant="body1">{article.language}</Typography>
              </Box>
            </Box>
            <Box mb={2}>
              <Typography variant="h6" color="primary">
                Content
              </Typography>
              <Box ml={1}>
                <Typography variant="body1">{article.content}</Typography>
              </Box>
            </Box>
          </Box>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            component={Link}
            to={"/articles"}
          >
            Go back
          </Button>
        </Paper>
      )}
    </Paper>
  );
};

export default ViewArticlePage;
