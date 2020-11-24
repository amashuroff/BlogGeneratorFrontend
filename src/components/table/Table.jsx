import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatTime, asyncForEach, initFilterFromHeadCells } from "../../utils";

import { useTableBodyStyles } from "../../styles/styles";

import MaterialTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";
import { Button } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";

import THead from "./THead";
import TableToolbar from "./TableToolbar";
import FilterInput from "../FilterInput";

const Table = ({
  tableData,
  headCells,
  agent,
  config,
  setConfig,
  setRefresh,
  disableEdit,
  disableView,
  disableFilter,
  justCreatedRow,
}) => {
  const classes = useTableBodyStyles();
  const { pathname } = window.location;

  // Deletion
  const [selectedItems, setSelectedItems] = useState([]);

  // Actions
  const [hovered, setHovered] = useState(null);

  // Sorting
  const [orderBy, setOrderBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [prevHeadCell, setPrevHeadCell] = useState("createdAt");

  // Filter
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState(
    initFilterFromHeadCells(headCells)
  );

  const renderRows = () => {
    if (!tableData.items) return null;

    return tableData.items.map((item, index) => {
      const isItemSelected = isSelected(item.id);
      const isItemJustCreated = item.id === justCreatedRow?.id;

      return (
        <TableRow
          key={`row-${index}`}
          hover
          onMouseLeave={() => setHovered(null)}
          onMouseOver={() => setHovered(item.id)}
          className={isItemJustCreated ? classes.justCreatedRow : null}
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
              to={`${pathname}/update/${item.id}`}
              className={
                !disableEdit && hovered === item.id
                  ? classes.iconShow
                  : classes.iconHide
              }
            >
              <CreateIcon />
            </IconButton>
            <IconButton
              component={Link}
              to={`${pathname}/view/${item.id}`}
              className={
                !disableView && hovered === item.id
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
        count={tableData?.pager ? tableData.pager.total : 0}
        rowsPerPage={tableData?.pager ? tableData.pager.pageSize : 5}
        page={tableData?.pager ? tableData.pager.page : 0}
        onChangePage={(event, page) => handleChangePage(page)}
        onChangeRowsPerPage={(event) => handleChangeRowsPerPage(event)}
        rowsPerPageOptions={tableData?.pager ? [5, 25, 50, 100] : [""]}
      />
    );
  };

  const renderFilter = () => {
    if (!openFilter) return null;

    return (
      <TableRow>
        <TableCell />
        {headCells.map((cell) => {
          return (
            <TableCell key={`filter-${cell.id}`}>
              <FilterInput
                cell={cell}
                setFilterState={handleSetFilterState}
                filterState={filterState}
              />
            </TableCell>
          );
        })}
        <TableCell>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={clearFields}
          >
            Clear fields
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  // Selection of items/item
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableData.items.map((n) => n.id);
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

  // Deletion
  const handleDeleteRows = async () => {
    try {
      await asyncForEach(selectedItems, agent.deleteById);
      setRefresh(true);
    } catch (error) {
      console.log(error);
    } finally {
      cleanUpSelected();
      setRefresh(false);
    }
  };

  // handle out of range page after deletion
  useEffect(() => {
    if (tableData.items?.length === 0 && tableData.pager?.page > 0) {
      const checkPageRange = () => {
        if (tableData.items?.length === 0) {
          setConfig({ ...config, page: tableData.pager.page - 1 });
        }
      };
      checkPageRange();
    }
  });

  const cleanUpSelected = () => {
    setSelectedItems([]);
  };

  // Pagination
  const handleChangePage = (newPage) => {
    setConfig({ ...config, page: newPage });
  };
  const handleChangeRowsPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setConfig({ ...config, pageSize: newPageSize });
  };

  // Sorting
  const handleSortBy = (headCell) => {
    let sortDir = 2;
    if (prevHeadCell !== headCell.id) {
      setPrevHeadCell(headCell.id);
      setOrder("desc");
      setOrderBy(headCell.id);
    } else {
      setOrder(order === "desc" ? "asc" : "desc");
      sortDir = order === "desc" ? 1 : 2;
    }
    setConfig(newConfigWithSort(headCell.sortBy, sortDir));
  };

  const newConfigWithSort = (sortType, sortDir) => {
    const newConfig = {};
    for (const key in config) {
      if (key.startsWith("sort")) {
        newConfig[key] = 0;
      } else {
        newConfig[key] = config[key];
      }
    }
    newConfig[sortType] = sortDir;
    return newConfig;
  };

  // Filter
  const handleSetFilterState = (input, filter) => {
    setFilterState({ ...filterState, [filter]: input });
  };
  const clearFields = () => {
    setFilterState(initFilterFromHeadCells(headCells));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setConfig((config) => {
        return { ...config, ...filterState };
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filterState, setConfig]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <TableToolbar
            numSelected={selectedItems.length}
            disableFilter={disableFilter}
            deleteRows={handleDeleteRows}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
          <MaterialTable
            className={classes.table}
            aria-labelledby="Table data"
            size="small"
          >
            <THead
              numSelected={selectedItems.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={tableData.items ? tableData.items.length : 0}
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onSort={handleSortBy}
            />
            <TableBody>
              {renderFilter()}
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
