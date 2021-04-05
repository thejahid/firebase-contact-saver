import React, { useReducer } from "react";
import uuid from "uuid";

import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DElETE_CONTACT,
  SET_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_CONTACT,
} from "../types";

const ContactState = ({ children }) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Sobuj Khan",
        phone: "2323059595",
        email: "sobuj@gmail.com",
        type: "personal",
      },
      {
        id: 2,
        name: "Pavel Rana",
        phone: "2323d6695",
        email: "pavel@gmail.com",
        type: "personal",
      },
      {
        id: 3,
        name: "Fahim Ahmed",
        phone: "26565595",
        email: "fahim@gmail.com",
        type: "professional",
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //add  contact

  //delete contact

  //set currect contact

  //clear contact

  //cleat current contact

  //update contact

  //filter contact

  //cleat filter

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
