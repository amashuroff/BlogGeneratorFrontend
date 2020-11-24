import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { closeErrorToast } from "../state/actions";

const ErrorToast = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.errors.open);
  }, [props.errors.open]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={props.closeErrorToast}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={props.closeErrorToast} severity="warning">
        {props.errors.message}
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { closeErrorToast })(ErrorToast);
