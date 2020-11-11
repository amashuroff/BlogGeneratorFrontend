import React from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const FilterInput = ({ cell, handleSetFilterState, filterState }) => {
  const handleFormatTime = (date) => {
    if (date !== null) {
      const formatted = moment(date._d).format("YYYY/MM/DD");
      if (formatted !== "Invalid date") {
        handleSetFilterState(formatted, cell.filterBy);
      } else {
        handleSetFilterState(null, cell.filterBy);
      }
    }
  };
  return (
    <>
      {cell.label.endsWith("date") ? (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="YYYY/MM/DD"
            margin="dense"
            id={`date-picker-inline-${cell.id}`}
            label={`Filter by ${cell.label}`}
            value={filterState[cell.filterBy]}
            onChange={(date) => handleFormatTime(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      ) : (
        <TextField
          id={`filter-input-${cell.id}`}
          label={`Filter by ${cell.label}`}
          variant="standard"
          margin="dense"
          value={filterState[cell.filterBy]}
          onChange={(e) => handleSetFilterState(e.target.value, cell.filterBy)}
        />
      )}
    </>
  );
};

export default FilterInput;
