import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { Fragment, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ icon, title }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;
  const location = useLocation();

  const onLogout = () => {
    logout();
    clearContacts();
  }

  const authLinks = (
    <Fragment>
      <li className="user-label">Hello { user && user.firstName }</li>
      {location.pathname !== "/account" && <li><Link to='/account'><i className="fas fa-user"></i></Link></li>}
      {location.pathname !== "/" && <li><Link to='/'><i className="fa fa-address-book" aria-hidden="true"></i></Link></li>}
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      {location.pathname !== "/login" && <li><Link to="/login"><i className="fa fa-sign-in"></i></Link></li>}
      {location.pathname !== "/about" && <li><Link to="/about"><i className="fas fa-info-circle"></i></Link></li>}
    </Fragment>
  );

  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} /> <Link to="/">{title}</Link>
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-address-card",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
