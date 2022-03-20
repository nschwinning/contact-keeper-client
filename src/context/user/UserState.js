import React, { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import axios from "axios";
import { GET_USERS, USERS_ERROR } from "../types";

const UserState = (props) => {
  const initialState = {
    users: null,
    error: null
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get contacts
  const getUsers = async () => {
    try {
        const res = await axios.get("http://localhost:8082/api/users");
  
        dispatch({ type: GET_USERS, payload: res.data });
      } catch (err) {
        dispatch({ type: USERS_ERROR, payload: err.response.msg });
      }
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.users,
        getUsers
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default UserState;
