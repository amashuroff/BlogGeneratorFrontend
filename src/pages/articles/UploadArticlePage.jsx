import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  FormHelperText,
} from "@material-ui/core";
import FormDialogAdd from "../buttons-forms/FormDialogAdd";
import { createUpdateUploadStyles } from "../../styles/styles.js";
import RequestHandler from "../helpers/RequestHandler";
import { articlesResponse } from "./articlesResponse";
import SelectRow from "../buttons-forms/SelectRow";
import { DropzoneArea } from "material-ui-dropzone";

const titles = [
  { name: "Set first line as Title", id: "firstLine" },
  { name: "Set filename as Title", id: "filename" },
];

const UploadArticle = ({ createRow, crudLanguages, crudTopics }) => {
  const classes = createUpdateUploadStyles();

  const history = useHistory();

  const [rowContent, setRowContent] = useState({
    ArticleLine: "",
    TopicId: "",
    LanguageId: "",
  });

  const [files, setFiles] = useState([]);
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
    getLangsTopics();
  }, []);

  // CREATE NEW ARTICLE AND HANDLE ERRORS
  const createNewRow = (e) => {
    e.preventDefault();
    setFormData();
    createRow(formData)
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
        getLangsTopics();
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
        getLangsTopics();
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

  // TRANSFORM ROWS/FILES TO FORM DATA
  const formData = new FormData();

  const setFormData = () => {
    for (let key in rowContent) {
      formData.append(key, rowContent[key]);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  };

  return (
    <Paper className={classes.form}>
      <Box m={1}>
        <RequestHandler response={response} messages={articlesResponse} />
      </Box>

      <form className={classes.root}>
        <Box m={1}>
          <Typography variant="h5">Upload Article</Typography>
        </Box>

        <Box m={1}>
          <SelectRow
            name="Title"
            handleSetRowContent={setRowContent}
            rowContent={rowContent}
            items={titles}
            errors={errors}
            id={"ArticleLine"}
          />
        </Box>
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

        <Box m={1}>
          <DropzoneArea
            initialFiles={[]}
            filesLimit={10000}
            onChange={(newFiles) => {
              setFiles(newFiles);
            }}
            onDelete={(deletedFile) => {
              setFiles(files.filter((el) => !(el.name === deletedFile.name)));
            }}
          />
          <FormHelperText>{errors.Files}</FormHelperText>
        </Box>
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
              Upload
            </Button>
          </Box>
        </div>
      </form>
    </Paper>
  );
};

export default UploadArticle;
