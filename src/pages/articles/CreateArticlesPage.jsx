import React, { useEffect, useState } from "react";
import agent from "../../api/agent";
import { connect } from "react-redux";
import {
  getLanguages,
  getTopics,
  createTopic,
  createLanguage,
} from "../../state/actions";
import history from "../../api/history";
import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import { createUpdateUploadStyles } from "../../styles/styles.js";
import SelectField from "../../components/SelectField";
import FormModal from "../../components/FormModal";
import ErrorToast from "../../components/ErrorToast";

const validationMessages = {
  title: "Please provide a Title",
  topicId: "Please, provide a Topic",
  languageId: "Please, provide a Language",
  content: "Please, provide Content",
};

const CreateArticlePage = (props) => {
  const classes = createUpdateUploadStyles();
  const [errors, setErrors] = useState({});

  const [fieldContent, setFieldContent] = useState({
    title: "",
    content: "",
    topicId: "",
    languageId: "",
  });

  useEffect(() => {
    props.getLanguages();
    if (props.languages.newLanguage) {
      setFieldContent({
        ...fieldContent,
        languageId: props.languages.newLanguage.id,
      });
    }
  }, [props.languages.newLanguage]);

  useEffect(() => {
    props.getTopics();
  }, [props.topics.newTopic]);

  useEffect(() => {
    // решение проблемы/разобрать эту требедень
    if (
      props.topics.newTopic &&
      props.topics.items.filter(
        (topic) => topic.id === props.topics.newTopic.id
      ).length > 0
    ) {
      setFieldContent({
        ...fieldContent,
        topicId: props.topics.newTopic.id,
      });
    }
  }, [props.topics]);

  const setContent = (type, value) => {
    setFieldContent({ ...fieldContent, [type]: value });
  };

  // Validation
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    topicId: "",
    languageId: "",
    content: "",
  });

  // validation
  const areThereErrors = () => {
    for (let key in validationErrors) {
      if (validationErrors[key] !== "") return true;
    }
    for (let key in fieldContent) {
      if (fieldContent[key] === "") return true;
    }
    return false;
  };

  // validate без стейта
  const submitContent = async () => {
    validateOnSubmit();
    if (areThereErrors) return;

    try {
      await agent.Articles.create(fieldContent);
    } catch (error) {
      setErrors({ error });
    } finally {
      console.log("done, push to articles");
    }
  };

  const validate = (type, message) => {
    if (fieldContent[type] === "") {
      setValidationErrors({
        ...validationErrors,
        [type]: message,
      });
    } else {
      setValidationErrors({
        ...validationErrors,
        [type]: "",
      });
    }
  };

  const validateOnSubmit = () => {
    let validationErrors = {};
    for (let key in fieldContent) {
      if (fieldContent[key] === "") {
        validationErrors[key] = validationMessages[key];
      } else {
        validationErrors[key] = "";
      }
    }
    setValidationErrors({ ...validationErrors });
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Paper className={classes.form}>
        <ErrorToast error={errors.error?.message} />
        <form className={classes.root}>
          <Box m={1}>
            <Typography variant="h5">Create article</Typography>
          </Box>
          <TextField
            error={validationErrors.title !== ""}
            required
            label="Title"
            value={fieldContent.title}
            onChange={(e) => setContent("title", e.target.value)}
            helperText={validationErrors.title}
          />
          <Box display="flex" alignItems="center" m={1}>
            <SelectField
              validationMessage={validationMessages.topicId}
              error={validationErrors.topicId !== ""}
              name="Topic"
              items={props.topics.items}
              value={fieldContent.topicId}
              handleSetContent={setContent}
            />
            <FormModal name="Topic" handleCreateOption={props.createTopic} />
          </Box>
          <Box display="flex" alignItems="center" m={1}>
            {/* <SelectField
              validationMessage={validationMessages.languageId}
              error={validationErrors.languageId !== ""}
              name="Language"
              items={languages}
              value={fieldContent.languageId}
              handleSetContent={setContent}
            />
            <FormModal name="Language" handleCreateOption={createNewLanguage} /> */}
          </Box>

          <TextField
            error={validationErrors.content !== ""}
            helperText={validationErrors.content}
            label="Content"
            multiline
            required
            rows={5}
            value={fieldContent.content}
            onChange={(e) => setContent("content", e.target.value)}
          />
          <div className={classes.button}>
            <Box m={1}>
              <Button
                disableElevation
                variant="contained"
                color="primary"
                onClick={submitContent}
              >
                Create
              </Button>
            </Box>
          </div>
        </form>
      </Paper>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    languages: state.languages,
    topics: state.topics,
  };
};

export default connect(mapStateToProps, {
  getLanguages,
  getTopics,
  createTopic,
  createLanguage,
})(CreateArticlePage);
