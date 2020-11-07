import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Table from "@material-ui/core/Table";
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
import FilterInput from "../buttons-forms/FilterInput";

import { LinearProgress } from "@material-ui/core";
import { useTableBodyStyles } from "../../styles/styles";

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
};

const formatTime = (time) => {
  return moment(time).format("MMMM Do, YYYY");
};

const DataTable = ({
  headCells,
  config,
  pageURL,
  agent,
  disableFilter,
  disableView,
  disableEdit,
}) => {
  const initHeadCellsFilters = () => {
    const initConfig = {};
    headCells.forEach((el) => {
      if (el.filterBy && el.filterBy.endsWith("Date")) {
        initConfig[el.filterBy] = null;
      } else if (el.filterBy) {
        initConfig[el.filterBy] = "";
      }
    });
    return initConfig;
  };
  const classes = useTableBodyStyles();

  const [config, setConfig] = useState(config);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const [pager, setPager] = useState(0);

  const [selectedItems, setSelectedItems] = useState([]);

  const [orderBy, setOrderBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [prevHeadCell, setPrevHeadCell] = useState("createdAt");

  const [filter, setFilter] = useState(false);
  const [filterState, setFilterState] = useState(initHeadCellsFilters());
  const [currRow, setCurrRow] = useState(null);

  // Get data using config and userURL
  useEffect(() => {
    const getRowsData = async () => {
      setLoading(true);
      const { data } = await agent.getRows(config);
      setRows(data.items);
      setPager(data.pager);
      setLoading(false);
    };
    getRowsData();
  }, [config, agent]);

  // Deletion + update
  const handleDeleteRows = (config) => {
    asyncForEach(selectedItems, agent.deleteRows)
      .then(() => {
        setSelectedItems([]);
        return agent.getRows(config);
      })
      .then(({ data }) => {
        setRows(data.items);
        setPager(data.pager);
      });
  };

  //Selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelectedItems(newSelected);
      return;
    }
    setSelectedItems([]);
  };
  const handleClick = (event, id) => {
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

  // Pagination
  const handleChangePage = (newPage) => {
    setConfig({ ...config, Page: newPage });
  };
  const handleChangeRowsPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setConfig({ ...config, PageSize: newPageSize });
  };

  // Sorting
  const handleSortBy = (headCell) => {
    if (prevHeadCell !== headCell.id) {
      setPrevHeadCell(headCell.id);
      setOrder("desc");
      setOrderBy(headCell.id);
      const sortDir = 2;
      setConfig(newConfigWithSort(headCell.sortBy, sortDir));
    } else {
      setOrder(order === "desc" ? "asc" : "desc");
      const sortDir = order === "desc" ? 1 : 2;
      setConfig(newConfigWithSort(headCell.sortBy, sortDir));
    }
  };
  const newConfigWithSort = (sortType, sortDir) => {
    const newConfig = {};
    for (const key in config) {
      if (key.startsWith("Sort")) {
        newConfig[key] = 0;
      } else {
        newConfig[key] = config[key];
      }
    }
    newConfig[sortType] = sortDir;
    return newConfig;
  };

  //Filter
  const handleToggleFilter = () => {
    if (disableFilter) {
      setFilter(false);
    } else {
      if (filter) {
        setFilter(false);
        setFilterState(initHeadCellsFilters());
      } else {
        setFilter(true);
      }
    }
  };
  const handleSetFilterState = (input, filter) => {
    setFilterState({ ...filterState, [filter]: input });
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setConfig({ ...config, ...filterState });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filterState]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <TableToolbar
            numSelected={selectedItems.length}
            deleteRows={handleDeleteRows}
            config={config}
            filter={filter}
            toggleFilter={handleToggleFilter}
            disableFilter={disableFilter}
          />
          <Table
            className={classes.table}
            aria-labelledby="Table data"
            size={"small"}
            aria-label="table"
          >
            <THead
              numSelected={selectedItems.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              headCells={headCells}
              orderBy={orderBy}
              order={order}
              onRequestSort={handleSortBy}
            />
            <TableBody>
              {filter ? (
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
              ) : null}

              {rows.map((row, index) => {
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
                    {headCells.map((cell) => {
                      if (cell.label.endsWith("date")) {
                        return (
                          <TableCell align="left" key={cell.id}>
                            {formatTime(row[cell.id])}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell align="left" key={cell.id}>
                          {row[cell.id]}
                        </TableCell>
                      );
                    })}

                    <TableCell align="right">
                      {currRow === row.id && (
                        <>
                          {!disableView ? (
                            <IconButton
                              aria-label="view row"
                              component={Link}
                              to={`${pageURL}/view/?id=${row.id}`}
                            >
                              <SearchIcon />
                            </IconButton>
                          ) : null}
                          {!disableEdit ? (
                            <IconButton
                              aria-label="update row"
                              component={Link}
                              to={`${pageURL}/update/?id=${row.id}`}
                            >
                              <CreateIcon />
                            </IconButton>
                          ) : null}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
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
        ) : null}
      </Paper>
    </div>
  );
};

export default DataTable;
