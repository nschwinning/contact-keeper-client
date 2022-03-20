import { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const MyAccount = () => {
  const authContext = useContext(AuthContext);
  const { user, updateUser } = authContext;

  const alertContext = useContext(AlertContext);
  const { addAlert } = alertContext;

  const [editedUser, setEditedUser] = useState({
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      email: user ? user.email : ''
  });

  const { firstName, lastName, email } = editedUser;

  const onChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    updateUser(editedUser);
    addAlert("Successfully updated user", "success");
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <h1>My Account</h1>
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
        <div>
          <input
            type="submit"
            value={"Update"}
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
};

export default MyAccount;
