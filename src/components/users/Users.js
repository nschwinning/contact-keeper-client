import React, { Fragment, useContext, useEffect } from "react";

const Users = (props) => {

  const { users } = props;

  return (
    <Fragment>
      {users && users.length !== 0 && (
        <table>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
          {users.map((user) => (
            <tr>
              <th>{user.firstName}</th>
              <th>user.lastName</th>
              <th>user.email</th>
            </tr>
          ))}
        </table>
      )}
    </Fragment>
  );
};

export default Users;
