import moment from "moment";

export const formatTime = (time) => {
  return moment(time).format("MMMM Do, YYYY");
};

export const initFilterFromHeadCells = (headCells) => {
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

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
};
