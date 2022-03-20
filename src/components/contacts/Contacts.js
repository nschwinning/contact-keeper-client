import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {contacts && !loading ? (
        <TransitionGroup>
          {filtered
            ? filtered.map((contact) => (
                <CSSTransition key={contact.id} timeout={500} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition key={contact.id} timeout={500} classNames="item">
                  <ContactItem key={contact.id} contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
