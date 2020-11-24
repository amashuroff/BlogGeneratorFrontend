import { CLOSE_ERROR_TOAST, OPEN_ERROR_TOAST } from "../actions/types";

const INITIAL_STATE = {
  message: "",
  open: false,
};

export const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_ERROR_TOAST:
      return { message: action.payload, open: true };
    case CLOSE_ERROR_TOAST:
      return { message: "", open: false };
    default:
      return state;
  }
};
