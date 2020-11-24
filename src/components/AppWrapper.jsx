import React from "react";

import { useDashboardStyles } from "../styles/styles";

import AppBarPanel from "./appbar-panel/AppBarPanel";

const AppWrapper = ({ children }) => {
  const classes = useDashboardStyles();
  return (
    <div className={classes.root}>
      <AppBarPanel />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
};

export default AppWrapper;
