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
import { compose } from "redux";

const formatTime = (time) => {
  return moment(time).format("MMMM Do, YYYY");
};

const Table = (props) => {
  const classes = useTableBodyStyles();
  const { pathname } = window.location;
  const [hovered, setHovered] = useState(null);

  const renderRows = () => {
    if (!props.data.items) return null;

    return props.data.items.map((item, index) => {
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
            <Checkbox key={`checkbox-${index}`}></Checkbox>
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
    return props.headCells.map((cell) => {
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
    return !props.disableView && id === hovered ? (
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
    return !props.disableEdit && id === hovered ? (
      <IconButton
        aria-label="update row"
        component={Link}
        to={`${pathname}/view/${id}`}
      >
        <CreateIcon />
      </IconButton>
    ) : null;
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

        {/* <TablePagination
          component="div"
          count={pager ? pager.total : 0}
          rowsPerPage={
            [5, 25, 50, 100].includes(config.PageSize) ? config.PageSize : ""
          }
          page={pager ? pager.page : 0}
          onChangePage={(event, page) => handleChangePage(page)}
          onChangeRowsPerPage={(event) => handleChangeRowsPerPage(event)}
          rowsPerPageOptions={pager ? [5, 25, 50, 100] : [""]}
        />
        {loading ? (
          <div>
            <LinearProgress />
          </div>
        ) : null} */}
      </Paper>
    </div>
  );
};

export default Table;

{
  /* {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    onMouseLeave={() => setCurrRow(null)}
                    onMouseOver={() => setCurrRow(row.id)}
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                        key={`checkbox-${row.id}`}
                      />
                    </TableCell>
                    
                  </TableRow>
                );
              })} */
}
