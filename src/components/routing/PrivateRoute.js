import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    !isAuthenticated && !loading ? <Navigate replace to="/login" /> : <Outlet />
  );
};

export default PrivateRoute;
