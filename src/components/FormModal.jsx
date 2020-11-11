import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Box } from "@material-ui/core";
import OutlinedButton from "./OutlinedButton";

const FormModal = ({ name, handleAddNewOption }) => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOption("");
  };

  const setMaxLength = () => {
    return name === "Language" ? 2 : 255;
  };

  const setOptionCasing = (text) => {
    return name === "Language" ? text.toUpperCase() : text;
  };

  return (
    <>
      <Box m={1}>
        <OutlinedButton
          handleClickOpen={handleClickOpen}
          title={`+ Add ${name}`}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{`Add ${name}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="normal"
            id="name"
            type="text"
            inputProps={{ maxLength: setMaxLength() }}
            label={name}
            color={option ? "primary" : "secondary"}
            fullWidth
            value={option}
            onChange={(e) => {
              let text = setOptionCasing(e.target.value);
              setOption(text);
            }}
            helperText={`${option.length}/${setMaxLength()}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAddNewOption(option.toLowerCase());
              handleClose();
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormModal;
