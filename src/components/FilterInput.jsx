import React from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";

import { TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const FilterInput = ({ cell, setFilterState, filterState }) => {
  return (
    <>
      {cell.label.endsWith("date") ? (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            format="YYYY/MM/DD"
            id={`date-picker-inline-${cell.id}`}
            label={`Filter by ${cell.label}`}
            value={filterState[cell.filterBy]}
            onChange={(date) =>
              setFilterState(
                moment(date._d).format("YYYY/MM/DD"),
                cell.filterBy
              )
            }
            animateYearScrolling
          />
        </MuiPickersUtilsProvider>
      ) : (
        <TextField
          id={`filter-input-${cell.id}`}
          label={`Filter by ${cell.label}`}
          value={filterState[cell.filterBy]}
          onChange={(e) => setFilterState(e.target.value, cell.filterBy)}
        />
      )}
    </>
  );
};

export default FilterInput;
