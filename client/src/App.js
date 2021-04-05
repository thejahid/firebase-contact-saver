import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "styles/global";
import light from "styles/themes/light";
import dark from "styles/themes/dark";
import usePersistedState from "utils/usePersistedState";
import { Layout, Home, Register, RegisterComplete } from "components";
import ContactState from "context/contact/ContactState";

const App = () => {
  //changing theme
  const [theme, setTheme] = usePersistedState("theme", light);

  //toggling theme
  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ContactState>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ToastContainer />
          <Layout toggleTheme={toggleTheme}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/register/complete"
                component={RegisterComplete}
              />
            </Switch>
          </Layout>
        </ThemeProvider>
      </Router>
    </ContactState>
  );
};

export default App;
