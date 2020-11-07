import React from "react";
import { IconButton } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

const FilterButton = ({filter, toggleFilter}) => {

  return (
    <IconButton
      aria-label="filter list"
      color={filter ? "secondary" : "default"}
      onClick={toggleFilter}
    >
      <FilterListIcon />
    </IconButton>
  );
};

export default FilterButton;
