import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

const LinearLoader = ({ isFetching }) => {
  return <>{isFetching ? <LinearProgress /> : null}</>;
};

export default LinearLoader;
