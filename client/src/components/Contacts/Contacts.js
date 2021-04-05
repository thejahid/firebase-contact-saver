import React, { useContext } from "react";

import ContactContext from "context/contact/contactContext";

export const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;
  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact.id}>{contact.name}</div>
      ))}
    </div>
  );
};
