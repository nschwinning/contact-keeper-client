/* eslint-disable import/no-anonymous-default-export */
import { GET_USERS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
        return {
            ...state,
            users: action.payload
        }
    default:
      return state;
  }
};
