import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";
import UserContext from "../../context/user/userContext";
import Users from "../users/Users";


const Home = () => {
  const authContext = useContext(AuthContext);

  const contactContext = useContext(ContactContext);

  const { contacts, loading } = contactContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="grid-2">
        <div>
          <ContactForm />
        </div>
        {contacts && contacts.length === 0 && !loading ? (
          <div>
            <h3>Please add a contact</h3>
          </div>
        ) : (
          <div>
            <ContactFilter />
            <Contacts />
          </div>
        )}
      </div>
      <div>
          <Users />
      </div>
    </div>
  );
};

export default Home;
