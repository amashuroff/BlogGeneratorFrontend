import React from "react";
import _ from "lodash";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { createUpdateUploadStyles } from "../styles/styles";

const SelectField = ({ name, items, value, handleSetContent, label }) => {
  const classes = createUpdateUploadStyles();

  const renderMenuItems = () => {
    if (_.isEmpty(items)) return "";

    return items.map((item) => (
      <MenuItem key={item.id} value={item.id}>
        {item.name}
      </MenuItem>
    ));
  };

  return (
    <FormControl variant="standard" required className={classes.select}>
      <InputLabel id={`create-${name}-label`}>{label}</InputLabel>
      <Select
        select="true"
        value={value}
        onChange={(e) => {
          handleSetContent(name, e.target.value);
        }}
      >
        {renderMenuItems()}
      </Select>
    </FormControl>
  );
};

export default SelectField;
