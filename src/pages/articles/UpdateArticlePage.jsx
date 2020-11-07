import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import FormDialogAdd from "../buttons-forms/FormDialogAdd";
import { createUpdateUploadStyles } from "../../styles/styles.js";

import RequestHandler from "../helpers/RequestHandler";
import { articlesResponse } from "./articlesResponse";

const UpdateArticle = ({ crudLanguages, crudTopics, crudArticles }) => {
  const classes = createUpdateUploadStyles();

  const location = useLocation();
  const history = useHistory();
  const search = new URLSearchParams(location.search);
  const id = search.get("id");

  const [rowContent, setRowContent] = useState({
    id: "",
    title: "",
    content: "",
    topicId: "",
    languageId: "",
  });

  const [topics, setTopics] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const [newSelected, setNewSelected] = useState("");

  useEffect(() => {
    const newLanguage = languages.find(
      (el) => el.name === newSelected.toUpperCase()
    );
    if (newLanguage) {
      setRowContent({ ...rowContent, LanguageId: newLanguage.id });
    }
  }, [languages]);

  useEffect(() => {
    const newTopic = topics.find((el) => el.name === newSelected);
    if (newTopic) {
      setRowContent({ ...rowContent, TopicId: newTopic.id });
    }
  }, [topics]);

  // GET LANGUAGES AND TOPICS ON THE FIRST RENDER
  useEffect(() => {
    const getLangsTopics = async () => {
      let tops = await crudTopics.getAllRows();
      let langs = await crudLanguages.getAllRows();
      setTopics(tops.data.items);
      setLanguages(langs.data.items);
    };
    const getCurrentRow = async () => {
      let row = await crudArticles.getRow(id);
      setRowContent(row.data);
    };
    getCurrentRow();
    getLangsTopics();
  }, [crudTopics, crudLanguages, crudArticles, id]);

  // UPDATE ROW AND HANDLE ERRORS
  const updateCurrentRow = (e) => {
    e.preventDefault();
    crudArticles
      .updateRow(rowContent)
      .then((res) => {
        setResponse(res);
        setTimeout(() => {
          history.push("/articles");
        }, 1600);
      })
      .catch((err) => {
        setResponse(err.response);
        setErrors(err.response.data.errors);
      });
  };

  // ADD NEW LANGUAGE AND TOPIC
  const handleAddNewTopic = (option) => {
    crudTopics
      .createRow(option)
      .then((res) => {
        setResponse(res);
        setTimeout(() => {
          setResponse(null);
        }, 1000);
      })
      .catch((err) => {
        setResponse(err.response);
      });
    setNewSelected(option);
  };

  const handleAddNewLanguage = (option) => {
    crudLanguages
      .createRow(option)
      .then((res) => {
        setResponse(res);
        setTimeout(() => {
          setResponse(null);
        }, 1000);
      })
      .catch((err) => {
        setResponse(err.response);
      });
    setNewSelected(option);
  };

  return (
    <Paper className={classes.form}>
      <Box m={1}>
        <RequestHandler response={response} messages={articlesResponse} />
      </Box>

      <form className={classes.root}>
        <Box m={1}>
          <Typography variant="h5">Update article</Typography>
        </Box>

        <TextField
          error={errors.Title && rowContent.title === "" ? true : false}
          required
          id="title-create"
          label="Article Title"
          variant="standard"
          value={rowContent.title}
          helperText={errors.Title}
          onChange={(e) =>
            setRowContent({ ...rowContent, title: e.target.value })
          }
        ></TextField>
        <Box display="flex" alignItems="center" m={1}>
          <FormControl
            variant="standard"
            error={errors.TopicId && rowContent.topic === "" ? true : false}
            required
            className={classes.select}
          >
            <InputLabel id="topic-create-label">Topic</InputLabel>
            <Select
              required
              labelId={"topic-create-label"}
              id="topic-create"
              select="true"
              label="Select topic or create new"
              value={rowContent.topicId}
              onChange={(e) =>
                setRowContent({ ...rowContent, topicId: e.target.value })
              }
            >
              {topics.map((topic) => (
                <MenuItem key={topic.id} value={topic.id}>
                  {topic.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.TopicId}</FormHelperText>
          </FormControl>
          <FormDialogAdd name="Topic" handleAddNewOption={handleAddNewTopic} />
        </Box>

        <Box display="flex" alignItems="center" m={1}>
          <FormControl
            variant="standard"
            error={
              errors.LanguageId && rowContent.language === "" ? true : false
            }
            required
            className={classes.select}
          >
            <InputLabel id="language-create-label">Language</InputLabel>
            <Select
              required
              id="language-create"
              labelId={"language-create-label"}
              select="true"
              label="Select Language or create new"
              value={rowContent.languageId}
              onChange={(e) =>
                setRowContent({ ...rowContent, languageId: e.target.value })
              }
            >
              {languages.map((lang) => (
                <MenuItem key={lang.id} value={lang.id}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.LanguageId}</FormHelperText>
          </FormControl>
          <FormDialogAdd
            name="Language"
            handleAddNewOption={handleAddNewLanguage}
          />
        </Box>
        <TextField
          error={errors.Content && rowContent.content === "" ? true : false}
          required
          id="content-create"
          label="Some content inside..."
          variant="standard"
          multiline
          rows={5}
          value={rowContent.content}
          helperText={errors.Content}
          onChange={(e) =>
            setRowContent({ ...rowContent, content: e.target.value })
          }
        ></TextField>
        <div className={classes.button}>
          <Box m={1}>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              onClick={(e) => updateCurrentRow(e)}
              component={Link}
              to={"/articles"}
            >
              Update
            </Button>
          </Box>
        </div>
      </form>
    </Paper>
  );
};

export default UpdateArticle;
