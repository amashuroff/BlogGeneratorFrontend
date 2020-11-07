import * as React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DescriptionIcon from "@material-ui/icons/Description";
import { ListSubheader } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";

export const MainListItems = () => {
  return (
    <div>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem button component={Link} to="/articles">
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Articles" />
      </ListItem>
    </div>
  );
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Lists</ListSubheader>

    <ListItem button component={Link} to="/languages">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Languages" />
    </ListItem>

    <ListItem button component={Link} to="/topics">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Topics" />
    </ListItem>
  </div>
);
