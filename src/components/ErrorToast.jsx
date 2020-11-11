import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";

const ErrorToast = ({ error }) => {
  const [open, setOpen] = useState(true);

  if (!error) return null;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity="warning">
        {`Something went wrong, please refresh the page or contact us! 
        ${error}`}
      </Alert>
    </Snackbar>
  );
};

export default ErrorToast;
