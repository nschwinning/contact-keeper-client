import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { addAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to main page
      navigate("/");
    }

    if (error === "User already exists") {
      addAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (firstName === "" || lastName === "" || email === "" || password === "" || password2 === "") {
      addAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      addAlert("Passwords do not match", "danger");
    } else {
      register({ firstName, lastName, email, password });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Vorname</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Nachname</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Register"
        />
        <p style={{ textAlign: "center" }}>
          Already have an account? Click <Link to="/login">here</Link> to login
        </p>
      </form>
    </div>
  );
};

export default Register;
