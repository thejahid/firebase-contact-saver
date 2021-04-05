import React, { Fragment } from "react";

import { Navbar } from "./Navbar";
import { MainWrapper } from "./styles";

export const Layout = ({ children, toggleTheme }) => {
  return (
    <Fragment>
      <Navbar toggleTheme={toggleTheme} />
      <MainWrapper>{children}</MainWrapper>
    </Fragment>
  );
};
