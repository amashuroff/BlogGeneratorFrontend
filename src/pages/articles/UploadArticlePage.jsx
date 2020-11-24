import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  FormHelperText,
} from "@material-ui/core";
import { createUpdateUploadStyles } from "../../styles/styles.js";

import { ValidatorForm } from "react-material-ui-form-validator";
import SelectField from "../../components/SelectField.jsx";
import FormModal from "../../components/FormModal";
import history from "../../api/history";
import {
  getLanguages,
  getTopics,
  createTopic,
  createLanguage,
} from "../../state/actions";
import { connect } from "react-redux";

import { DropzoneArea } from "material-ui-dropzone";

const titles = [
  { name: "Set first line as Title", id: "firstLine" },
  { name: "Set filename as Title", id: "filename" },
];

const UploadArticle = ({
  topics,
  languages,
  getTopics,
  getLanguages,
  createTopic,
  createLanguage,
}) => {
  const classes = createUpdateUploadStyles();
  const [dropzoneError, setDropzoneError] = useState("");

  const [files, setFiles] = useState([]);

  const [fieldContent, setFieldContent] = useState({
    articleLineId: "",
    topicId: "",
    languageId: "",
  });

  const setContent = (type, value) => {
    setFieldContent({ ...fieldContent, [type]: value });
  };

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
      setFieldContent({
        ...fieldContent,
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
      setFieldContent({
        ...fieldContent,
        topicId: topics.newTopic.id,
      });
    }
  }, [topics]);

  // TRANSFORM ROWS/FILES TO FORM DATA
  const formData = new FormData();

  const setFormData = () => {
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    for (let key in fieldContent) {
      formData.append(key, fieldContent[key]);
    }
  };

  const submitContent = async () => {
    if (files.length === 0) {
      setDropzoneError(
        "Please upload at least 1 file of format .txt to continue"
      );
      return;
    }
    try {
      setFormData();
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
            <Typography variant="h5">Upload Article</Typography>
          </Box>

          <Box m={1}>
            <SelectField
              label="Title"
              name="articleLineId"
              items={titles}
              value={fieldContent.articleLineId}
              handleSetContent={setContent}
            />
          </Box>
          <Box display="flex" alignItems="center" m={1}>
            <SelectField
              label="Topic"
              name="topicId"
              items={topics.items}
              value={fieldContent?.topicId || ""}
              handleSetContent={setContent}
            />
            <FormModal name="Topic" handleCreateOption={createTopic} />
          </Box>
          <Box display="flex" alignItems="center" m={1}>
            <SelectField
              label="Language"
              name="languageId"
              items={languages.items}
              value={fieldContent?.languageId || ""}
              handleSetContent={setContent}
            />
            <FormModal name="Language" handleCreateOption={createLanguage} />
          </Box>

          <Box m={1}>
            <DropzoneArea
              acceptedFiles={[".txt"]}
              initialFiles={[]}
              filesLimit={10000}
              onChange={(newFiles) => {
                setFiles(newFiles);
              }}
              onDelete={(deletedFile) => {
                setFiles(files.filter((el) => !(el.name === deletedFile.name)));
              }}
            />
            <FormHelperText style={dropzoneError ? { color: "#ff1744" } : null}>
              {dropzoneError || "Upload .txt files"}
            </FormHelperText>
          </Box>

          <div className={classes.button}>
            <Box m={1}>
              <Button
                disableElevation
                variant="contained"
                color="primary"
                type="submit"
              >
                Upload
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
})(UploadArticle);
