import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@material-ui/core";
import FormDialogAdd from "../buttons-forms/FormDialogAdd";
import { createUpdateUploadStyles } from "../../styles/styles.js";
import RequestHandler from "../helpers/RequestHandler";
import { articlesResponse } from "./articlesResponse";
import SelectRow from "../buttons-forms/SelectRow";

const CreateArticle = ({ createRow, crudLanguages, crudTopics }) => {
  const classes = createUpdateUploadStyles();

  const history = useHistory();

  const [rowContent, setRowContent] = useState({
    title: "",
    content: "",
    TopicId: "",
    LanguageId: "",
  });

  const [topics, setTopics] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [newSelected, setNewSelected] = useState("");

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);

  const getLangsTopics = async () => {
    let tops = await crudTopics.getAllRows();
    let langs = await crudLanguages.getAllRows();
    setTopics(tops.data.items);
    setLanguages(langs.data.items);
  };

  // GET LANGUAGES AND TOPICS ON THE FIRST RENDER
  useEffect(() => {
    getLangsTopics();
  }, []);

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

  // CREATE NEW ROW AND HANDLE ERRORS
  const createNewRow = (e) => {
    e.preventDefault();
    createRow(rowContent)
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
        getLangsTopics();
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
        getLangsTopics();
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
          <Typography variant="h5">Create article</Typography>
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
          <SelectRow
            name="topic"
            handleSetRowContent={setRowContent}
            rowContent={rowContent}
            items={topics}
            errors={errors}
            id={"TopicId"}
          />
          <FormDialogAdd name="Topic" handleAddNewOption={handleAddNewTopic} />
        </Box>
        <Box display="flex" alignItems="center" m={1}>
          <SelectRow
            name="language"
            handleSetRowContent={setRowContent}
            rowContent={rowContent}
            items={languages}
            errors={errors}
            id={"LanguageId"}
          />
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
              onClick={(e) => createNewRow(e)}
              component={Link}
              to={"/articles"}
            >
              Create
            </Button>
          </Box>
        </div>
      </form>
    </Paper>
  );
};

export default CreateArticle;
