import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_USER
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("http://localhost:8082/api/auth");

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const updateUser = async (formData) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put("http://localhost:8082/api/auth", formData, config);

      dispatch({ type: UPDATE_USER, payload: res.data });
    } catch (err) {
      //TODO: Error handling
    }
  }

  // Register user
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("http://localhost:8082/public/register", formData, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // Login user
  const login = async (formData) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const res = await axios.post("http://localhost:8082/public/authenticate", formData, config);
  
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  
        loadUser();
      } catch (err) {
        if (err.response && err.response.data) {
          console.log(err)
          dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
        }
        else dispatch({ type: LOGIN_FAIL, payload: 'Could not reach server. Please try againin a few minutes!'});
      }
  };

  // Logout
  const logout = () => {
      dispatch({ type: LOGOUT });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        loadUser,
        updateUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
