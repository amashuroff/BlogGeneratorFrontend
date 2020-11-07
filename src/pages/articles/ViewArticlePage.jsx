import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { createUpdateUploadStyles } from "../../styles/styles.js";

const ViewArticle = ({ getRow }) => {
  const classes = createUpdateUploadStyles();

  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const id = search.get("id");

  const [rowContent, setRowContent] = useState({
    id: "",
    title: "",
    content: "",
    topicId: "",
    languageId: "",
  });

  // GET LANGUAGES AND TOPICS ON THE FIRST RENDER
  useEffect(() => {
    const getCurrentRow = async () => {
      let row = await getRow(id);
      setRowContent(row.data);
    };
    getCurrentRow();
  }, [id, getRow]);

  return (
    <Paper className={classes.form}>
      <form className={classes.root}>
        <Box display="flex" flexDirection="column">
          <Box mb={2}>
            <Typography variant="h6" color="primary">
              Title
            </Typography>
            <Box ml={1}>
              <Typography variant="body1">{rowContent.title}</Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography variant="h6" color="primary">
              Topic
            </Typography>
            <Box ml={1}>
              <Typography variant="body1">{rowContent.topic}</Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography variant="h6" color="primary">
              Language
            </Typography>
            <Box ml={1}>
              <Typography variant="body1">{rowContent.language}</Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography variant="h6" color="primary">
              Content
            </Typography>
            <Box ml={1}>
              <Typography variant="body1">{rowContent.content}</Typography>
            </Box>
          </Box>
        </Box>
      </form>

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
  );
};

export default ViewArticle;
