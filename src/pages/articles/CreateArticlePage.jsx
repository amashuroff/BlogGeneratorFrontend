import React, { useEffect, useState } from "react";
import agent from "../../api/agent";
import { connect } from "react-redux";
import history from "../../api/history";

import { createUpdateUploadStyles } from "../../styles/styles.js";

import {
  getLanguages,
  getTopics,
  createTopic,
  createLanguage,
  addNewArticleToStore,
} from "../../state/actions";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import SelectField from "../../components/SelectField";
import FormModal from "../../components/FormModal";

const CreateArticlePage = ({
  topics,
  languages,
  getTopics,
  getLanguages,
  createTopic,
  createLanguage,
  addNewArticleToStore,
}) => {
  const classes = createUpdateUploadStyles();

  const [fieldContent, setFieldContent] = useState({
    title: "",
    content: "",
    topicId: "",
    languageId: "",
  });

  // When new topic/language is created, refresh the list of topics
  useEffect(() => {
    getLanguages();
  }, [languages.newLanguage, getLanguages]);

  // When list of topics/languages is fetched, if a new topic has been just created, set it as selected
  useEffect(() => {
    if (
      languages.newLanguage &&
      languages.items.filter(
        (language) => language.id === languages.newLanguage.id
      ).length > 0
    ) {
      setFieldContent((fieldContent) => {
        return {
          ...fieldContent,
          languageId: languages.newLanguage.id,
        };
      });
    }
  }, [languages]);

  useEffect(() => {
    getTopics();
  }, [topics.newTopic, getTopics]);

  useEffect(() => {
    if (
      topics.newTopic &&
      topics.items.filter((topic) => topic.id === topics.newTopic.id).length > 0
    ) {
      setFieldContent((fieldContent) => {
        return {
          ...fieldContent,
          topicId: topics.newTopic.id,
        };
      });
    }
  }, [topics]);

  const setContent = (type, value) => {
    setFieldContent({ ...fieldContent, [type]: value });
  };

  const submitContent = async () => {
    try {
      const newArticle = await agent.Articles.create(fieldContent);
      addNewArticleToStore(newArticle);
      history.push("/articles");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Paper className={classes.form}>
        <ValidatorForm
          className={classes.root}
          onSubmit={submitContent}
          onError={(errors) => console.log(errors)}
        >
          <Box m={1}>
            <Typography variant="h5">Create article</Typography>
          </Box>
          <TextValidator
            required
            label="Title"
            name="title"
            value={fieldContent.title}
            onChange={(e) => setContent("title", e.target.value)}
          />
          <Box display="flex" alignItems="center" m={1}>
            <SelectField
              label="Topic"
              name="topicId"
              items={topics.items}
              value={fieldContent.topicId}
              handleSetContent={setContent}
            />
            <FormModal name="Topic" handleCreateOption={createTopic} />
          </Box>
          <Box display="flex" alignItems="center" m={1}>
            <SelectField
              label="Language"
              name="languageId"
              items={languages.items}
              value={fieldContent.languageId}
              handleSetContent={setContent}
            />
            <FormModal name="Language" handleCreateOption={createLanguage} />
          </Box>

          <TextValidator
            multiline
            required
            rows={5}
            label="Content"
            name="content"
            value={fieldContent.content}
            onChange={(e) => setContent("content", e.target.value)}
          />
          <div className={classes.button}>
            <Box m={1}>
              <Button
                disableElevation
                variant="contained"
                color="primary"
                type="submit"
              >
                Create
              </Button>
            </Box>
          </div>
        </ValidatorForm>
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
  addNewArticleToStore,
})(CreateArticlePage);
