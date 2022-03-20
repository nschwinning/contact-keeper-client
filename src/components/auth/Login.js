import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { addAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to main page
      navigate("/");
    }

    if (error) {
      addAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      addAlert("Please enter email and password", "danger");
    }
    else {
      login({ email, password });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Login"
        />
        <p style={{ textAlign: "center" }}>
          No account yet? Click <Link to="/register">here</Link> to register
        </p>
      </form>
    </div>
  );
};

export default Login;
