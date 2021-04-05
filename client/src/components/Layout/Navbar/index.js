import React, { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "styled-components";
import { Link } from "react-router-dom";

import { NavbarWrapper, NavbarContent } from "./styles";

export const Navbar = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);

  return (
    <NavbarWrapper>
      <NavbarContent>
        <Link to="/">Contact Saver</Link>
        <Link to="/login"> Login</Link>
        <Link to="/register">Register</Link>
        <Switch
          onChange={toggleTheme}
          checked={title === "dark"}
          checkedIcon={false}
          uncheckedIcon={false}
          height={14}
          width={30}
          handleDiameter={20}
          offColor={colors.text}
          onColor={colors.text}
        />
      </NavbarContent>
    </NavbarWrapper>
  );
};
