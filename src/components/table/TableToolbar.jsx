import React from "react";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Box, Icon } from "@material-ui/core";
import { useToolbarStyles } from "../../styles/styles";

const TableToolbar = ({ numSelected }) => {
  const classes = useToolbarStyles();

  const showToolbar = () => {
    if (numSelected > 0) {
      return (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      );
    } else {
      return null;
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {showToolbar()}

      {numSelected > 0 ? (
        <Box display="flex">
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box ml={"96%"}>
          {/* {disableFilter ? null : (
            <IconButton onClick={toggleFilter}>
              {filter ? (
                <Icon>
                  <img
                    src="../../img/closeFilterIcon.svg"
                    alt="close filter icon"
                  />
                </Icon>
              ) : (
                <Icon>
                  <img
                    src="../../img/openFilterIcon.svg"
                    alt="open filter icon"
                  />
                </Icon>
              )}
            </IconButton>
          )} */}
        </Box>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
