import React, { useState, useEffect } from "react";
import agent from "../../api/agent";
import { connect } from "react-redux";
import history from "../../api/history";
import {
  getLanguages,
  getTopics,
  createTopic,
  createLanguage,
  addNewArticleToStore,
} from "../../state/actions";
import { Box, Button, Typography, Paper } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { createUpdateUploadStyles } from "../../styles/styles.js";
import SelectField from "../../components/SelectField";
import FormModal from "../../components/FormModal";
import ErrorToast from "../../components/ErrorToast";

const UpdateArticlePage = ({
  topics,
  languages,
  getTopics,
  getLanguages,
  createTopic,
  createLanguage,
  addNewArticleToStore,
  match,
}) => {
  const classes = createUpdateUploadStyles();
  const [article, setArticle] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsFetching(true);
        const article = await agent.Articles.getById(match.params.id);
        setArticle({ ...article });
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchArticle();
  }, []);

  // When new topic/language is created, refresh the list of topics
  useEffect(() => {
    getLanguages();
  }, [languages.newLanguage]);

  // When list of topics/languages is fetched, if a new topic has been just created, set it as selected
  useEffect(() => {
    if (
      languages.newLanguage &&
      languages.items.filter(
        (language) => language.id === languages.newLanguage.id
      ).length > 0
    ) {
      setArticle({
        ...article,
        languageId: languages.newLanguage.id,
      });
    }
  }, [languages]);

  useEffect(() => {
    getTopics();
  }, [topics.newTopic]);

  useEffect(() => {
    if (
      topics.newTopic &&
      topics.items.filter((topic) => topic.id === topics.newTopic.id).length > 0
    ) {
      setArticle({
        ...article,
        topicId: topics.newTopic.id,
      });
    }
  }, [topics]);

  const setContent = (type, value) => {
    setArticle({ ...article, [type]: value });
  };

  const submitContent = async () => {
    try {
      const newArticle = await agent.Articles.update(article);
      addNewArticleToStore(newArticle);
      history.push("/articles");
    } catch (error) {
      setErrors({ error });
    }
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Paper className={classes.form}>
        <ErrorToast error={errors.error?.message} />
        <ValidatorForm
          className={classes.root}
          onSubmit={submitContent}
          onError={(errors) => console.log(errors)}
        >
          <Box m={1}>
            <Typography variant="h5">Update article</Typography>
          </Box>
          <TextValidator
            required
            label="Title"
            name="title"
            value={article?.title || ""}
            onChange={(e) => setContent("title", e.target.value)}
          />
          <Box display="flex" alignItems="center" m={1}>
            <SelectField
              label="Topic"
              name="topicId"
              items={topics.items}
              value={article?.topicId || ""}
              handleSetContent={setContent}
            />
            <FormModal name="Topic" handleCreateOption={createTopic} />
          </Box>
          <Box display="flex" alignItems="center" m={1}>
            <SelectField
              label="Language"
              name="languageId"
              items={languages.items}
              value={article?.languageId || ""}
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
            value={article?.content || ""}
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
})(UpdateArticlePage);
