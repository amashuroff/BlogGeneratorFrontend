import React from "react";
import _ from "lodash";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { createUpdateUploadStyles } from "../styles/styles";

const SelectField = ({ name, items, value, handleSetContent }) => {
  const classes = createUpdateUploadStyles();

  const renderMenuItems = () => {
    if (_.isEmpty(items)) return "";

    return items.map((item) => (
      <MenuItem key={item.id} value={item.id}>
        {item.name}
      </MenuItem>
    ));
  };

  const correctFieldName = `${name.charAt(0).toLowerCase() + name.slice(1)}Id`;

  return (
    <FormControl variant="standard" required className={classes.select}>
      <InputLabel id={`create-${name}-label`}>{name}</InputLabel>
      <Select
        select="true"
        value={value}
        onChange={(e) => {
          handleSetContent(correctFieldName, e.target.value);
        }}
      >
        {renderMenuItems()}
      </Select>
    </FormControl>
  );
};

export default SelectField;
