import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { createUpdateUploadStyles } from "../../styles/styles.js";

const SelectRow = ({
  name,
  handleSetRowContent,
  items,
  errors,
  rowContent,
  id,
}) => {
  const classes = createUpdateUploadStyles();
  return (
    <FormControl
      variant="standard"
      error={errors[id] && rowContent[id] === "" ? true : false}
      required
      className={classes.select}
    >
      <InputLabel id={`create-${name}-label`}>
        {name[0].toUpperCase() + name.slice(1)}
      </InputLabel>
      <Select
        required
        id={`create-${name}`}
        labelId={`create-${name}-label`}
        select="true"
        label={`Select ${name}`}
        value={rowContent[id]}
        onChange={(e) =>
          handleSetRowContent({ ...rowContent, [id]: e.target.value })
        }
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors[id]}</FormHelperText>
    </FormControl>
  );
};

export default SelectRow;
