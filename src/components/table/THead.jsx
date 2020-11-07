import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Box } from "@material-ui/core";

const THead = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  headCells,
  orderBy,
  order,
  onRequestSort,
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all cells" }}
          />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            <Box display="flex">
              <Box mr={1}></Box>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={() => onRequestSort(headCell)}
              >
                {headCell.label}
              </TableSortLabel>
            </Box>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

// props type check
THead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default THead;
