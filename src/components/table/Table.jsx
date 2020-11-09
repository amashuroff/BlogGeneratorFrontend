import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import MaterialTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";

import THead from "./THead";
import TableToolbar from "./TableToolbar";
import { LinearProgress } from "@material-ui/core";
import { useTableBodyStyles } from "../../styles/styles";

const formatTime = (time) => {
  return moment(time).format("MMMM Do, YYYY");
};

const Table = ({ data, headCells, config, disableEdit, disableView }) => {
  const classes = useTableBodyStyles();
  const { pathname } = window.location;
  const [hovered, setHovered] = useState(null);

  const renderRows = () => {
    if (!data.items) return null;

    return data.items.map((item, index) => {
      // const isItemSelected = isSelected(row.id);
      return (
        <TableRow
          key={`row-${index}`}
          tabIndex={-1}
          hover
          role="checkbox"
          onMouseLeave={() => setHovered(null)}
          onMouseOver={() => setHovered(item.id)}
        >
          <TableCell padding="checkbox">
            <Checkbox
              key={`checkbox-${index}`}
              // onClick={(event) => handleClick(event, row.id)}
              // checked={isItemSelected}
            />
          </TableCell>

          {renderRowsFromHeadCells(item)}

          <TableCell align="right">
            {renderView(item.id)}
            {renderEdit(item.id)}
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderRowsFromHeadCells = (item) => {
    return headCells.map((cell) => {
      if (cell.label.endsWith("date")) {
        return (
          <TableCell align="left" key={cell.id}>
            {formatTime(item[cell.id])}
          </TableCell>
        );
      }

      return (
        <TableCell align="left" key={cell.id}>
          {item[cell.id]}
        </TableCell>
      );
    });
  };

  const renderView = (id) => {
    return !disableView && id === hovered ? (
      <IconButton
        aria-label="view row"
        component={Link}
        to={`${pathname}/update/${id}`}
      >
        <SearchIcon />
      </IconButton>
    ) : null;
  };

  const renderEdit = (id) => {
    return !disableEdit && id === hovered ? (
      <IconButton
        aria-label="update row"
        component={Link}
        to={`${pathname}/view/${id}`}
      >
        <CreateIcon />
      </IconButton>
    ) : null;
  };

  const renderPager = () => {
    return (
      <TablePagination
        component="div"
        count={data.pager ? data.pager.total : 0}
        rowsPerPage={
          [5, 25, 50, 100].includes(config.pageSize) ? config.pageSize : ""
        }
        page={data.pager ? data.pager.page : 0}
        // onChangePage={(event, page) => handleChangePage(page)}
        // onChangeRowsPerPage={(event) => handleChangeRowsPerPage(event)}
        rowsPerPageOptions={data.pager ? [5, 25, 50, 100] : [""]}
      />
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <MaterialTable
            className={classes.table}
            aria-labelledby="Table data"
            size={"small"}
            aria-label="table"
          >
            {/* <THead
              numSelected={selectedItems.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              headCells={headCells}
              orderBy={orderBy}
              order={order}
              onRequestSort={handleSortBy}
            /> */}
            <TableBody>
              {/* {filter ? (
                <TableRow>
                  <TableCell />
                  {headCells.map((cell) => {
                    return (
                      <TableCell key={`filter-${cell.id}`}>
                        <FilterInput
                          cell={cell}
                          handleSetFilterState={handleSetFilterState}
                          filterState={filterState}
                        />
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <IconButton
                      aria-label="close-delete"
                      onClick={() => handleToggleFilter()}
                    >
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ) : null} */}
              {renderRows()}
            </TableBody>
          </MaterialTable>
        </TableContainer>
        {renderPager()}
      </Paper>
    </div>
  );
};

export default Table;

// {loading ? (
//   <div>
//     <LinearProgress />
//   </div>
// ) : null}
