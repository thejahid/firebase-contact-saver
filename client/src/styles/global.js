import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
  /* ------------------------- box shadow & border, border-radius ------------------------- */
  --borderOne: 1px solid ${({ theme }) => theme.colors.text};
  --borderRadiousOne: 5px;

  /* ------------------------- font size ------------------------- */
  /*  common font size  */
  --smallFont: 14px;
  --mediumFont: 17px;
  --LargeFont: 19px;

  /* ------------------------- font weight ------------------------- */
  --normal: 400;
  --semiBold: 600;
  --bold: 700;
  /* ------------------------- transition ------------------------- */
  --defaultTransition: 0.3s;

  /* ------------------------- Adjust Menu ------------------------- */
  --menuHeight: 60px;

}

/* ------------------------- common css ------------------------- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}
body {
  color: ${({ theme }) => theme.colors.text};
  font-weight: var(--normal);
  line-height: 1;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
}
ol,
ul {
  list-style: none;
}
a {
  text-decoration: none;
  display: inline-block;
  color: ${({ theme }) => theme.colors.text};
}
:focus {
  outline: none;
}
`;

export default GlobalStyle;
