import { SET_USER_INFO } from "../constants";

const initialState = {
  data: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO:
      return { ...state, data: payload };

    default:
      return state;
  }
};
