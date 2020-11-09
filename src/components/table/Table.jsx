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

  const [selectedItems, setSelectedItems] = useState([]);

  const renderRows = () => {
    if (!data.items) return null;

    return data.items.map((item, index) => {
      const isItemSelected = isSelected(item.id);
      return (
        <TableRow
          key={`row-${index}`}
          hover
          onMouseLeave={() => setHovered(null)}
          onMouseOver={() => setHovered(item.id)}
        >
          <TableCell padding="checkbox">
            <Checkbox
              key={`checkbox-${index}`}
              onClick={(event) => handleSelect(event, item.id)}
              checked={isItemSelected}
            />
          </TableCell>

          {renderRowsFromHeadCells(item)}

          <TableCell align="right" className={classes.cellWithIcons}>
            <IconButton
              component={Link}
              to={`${pathname}/view/${item.id}`}
              className={
                !disableView && hovered === item.id
                  ? classes.iconShow
                  : classes.iconHide
              }
            >
              <CreateIcon />
            </IconButton>
            <IconButton
              component={Link}
              to={`${pathname}/update/${item.id}`}
              className={
                !disableEdit && hovered === item.id
                  ? classes.iconShow
                  : classes.iconHide
              }
            >
              <SearchIcon />
            </IconButton>
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

  const renderLoader = () => {
    if (!data.loading) return null;

    return (
      <div>
        <LinearProgress />
      </div>
    );
  };

  // SELECTING ALL ITEMS/ITEM
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.items.map((n) => n.id);
      setSelectedItems(newSelected);
      return;
    }
    setSelectedItems([]);
  };

  const handleSelect = (event, id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelected = newSelected.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelected);
  };
  const isSelected = (id) => selectedItems.indexOf(id) !== -1;
  // SELECTING ALL ITEMS/ITEM

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {renderLoader()}
        <TableContainer>
          <TableToolbar numSelected={selectedItems.length} />
          <MaterialTable
            className={classes.table}
            aria-labelledby="Table data"
            size="small"
          >
            <THead
              numSelected={selectedItems.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.items ? data.items.length : 0}
              headCells={headCells}
            />
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
