import React from "react";
import Button from "@material-ui/core/Button";

const OutlinedButton = ({ handleClickOpen, title }) => {
  return (
    <Button
      style={{ whiteSpace: "nowrap" }}
      variant="outlined"
      color="primary"
      onClick={handleClickOpen}
    >
      {title}
    </Button>
  );
};
export default OutlinedButton;
