import React, { useEffect, useState } from "react";
import agent from "../../api/agent";
import history from "../../api/history";
import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import { createUpdateUploadStyles } from "../../styles/styles.js";
import SelectField from "../../components/SelectField";
import FormModal from "../../components/FormModal";
import ErrorToast from "../../components/ErrorToast";

const CreateArticlePage = () => {
  const classes = createUpdateUploadStyles();

  const [fieldContent, setFieldContent] = useState({
    title: "",
    content: "",
    topicId: "",
    languageId: "",
  });
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchLanguages();
    fetchTopics();
  }, [refresh]);

  const fetchLanguages = async () => {
    try {
      const { items } = await agent.Languages.list();
      setLanguages([...items]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopics = async () => {
    try {
      const { items } = await agent.Topics.list();
      setTopics([...items]);
    } catch (error) {
      console.log(error);
    }
  };

  const setContent = (type, value) => {
    setFieldContent({ ...fieldContent, [type]: value });
  };

  const createNewTopic = async (name) => {
    try {
      const response = await agent.Topics.create({ name: name }).then(() =>
        setRefresh(true)
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const createNewLanguage = async (name) => {
    try {
      const response = await agent.Languages.create({ name: name });
      setRefresh(true);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const addNewLanguageAsSelected = ({ id }) => {
    setFieldContent({ ...fieldContent, languageId: id });
  };

  const addNewTopicAsSelected = ({ id }) => {
    setFieldContent({ ...fieldContent, languageId: id });
  };

  const submitContent = async () => {
    try {
      await agent.Articles.create(fieldContent);
    } catch (error) {
      console.log(error.response);
    } finally {
      console.log("done");
    }
  };

  return (
    <Paper className={classes.form}>
      <ErrorToast error={errors.error?.message} />
      <form className={classes.root}>
        <Box m={1}>
          <Typography variant="h5">Create article</Typography>
        </Box>
        <TextField
          error
          required
          label="Title"
          value={fieldContent.title}
          onChange={(e) => setContent("title", e.target.value)}
        />
        <Box display="flex" alignItems="center" m={1}>
          <SelectField
            name="Topic"
            items={topics}
            value={fieldContent.topicId}
            handleSetContent={setContent}
          />
          <FormModal name="Topic" handleCreateOption={createNewTopic} />
        </Box>
        <Box display="flex" alignItems="center" m={1}>
          <SelectField
            name="Language"
            items={languages}
            value={fieldContent.languageId}
            handleSetContent={setContent}
          />
          <FormModal name="Language" handleCreateOption={createNewLanguage} />
        </Box>

        <TextField
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
  );
};

export default CreateArticlePage;

{
  /* <Box m={1}>
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
        </div> */
}
