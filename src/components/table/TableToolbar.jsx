import React from "react";
import clsx from "clsx";

import { useToolbarStyles } from "../../styles/styles";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Box, Icon } from "@material-ui/core";

const TableToolbar = ({
  numSelected,
  disableFilter,
  deleteRows,
  openFilter,
  setOpenFilter,
}) => {
  const classes = useToolbarStyles();

  const renderToolbar = () => {
    if (numSelected <= 0 && disableFilter) return null;

    if (numSelected > 0) {
      return (
        <>
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
          <Box display="flex">
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={deleteRows}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      );
    } else {
      return (
        <Box display="flex" ml={"96%"}>
          {renderFilter()}
        </Box>
      );
    }
  };

  const renderFilter = () => {
    if (!openFilter) {
      return (
        <IconButton onClick={() => setOpenFilter((currFilter) => !currFilter)}>
          <Icon>
            <img src="./img/openFilterIcon.svg" alt="open filter icon" />
          </Icon>
        </IconButton>
      );
    }
    return (
      <IconButton onClick={() => setOpenFilter((currFilter) => !currFilter)}>
        <Icon>
          <img src="./img/closeFilterIcon.svg" alt="open filter icon" />
        </Icon>
      </IconButton>
    );
  };

  return (
    <div>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {renderToolbar()}
      </Toolbar>
    </div>
  );
};

export default TableToolbar;
