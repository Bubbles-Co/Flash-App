import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";
import { Box, ResponsiveContext, Grommet } from "grommet";

import Dashboard from "./page/dashboard";
import Home from "./page/home";
import Login from "./page/login";
import DateSessions from "./page/dateSessions";
import AppBar from "./components/appBar";

function PrivateRoute({ component: Component, size, ...rest }) {
  const [cookies] = useCookies(["jwtToken"]);
  return (
    <Route
      {...rest}
      render={props =>
        cookies.jwtToken ? (
          <AppBar {...props} size={size}>
            <Component {...props} size={size} />
          </AppBar>
        ) : (
          <Redirect
            push
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <CookiesProvider>
              <Router>
                <Route exact path="/" component={Home} />
                <Route
                  path="/login"
                  render={props => <Login size={size} {...props} />}
                />
                <PrivateRoute
                  path="/dashboard"
                  component={Dashboard}
                  size={size}
                />
                <PrivateRoute
                  path="/sessions/:startDate/:endDate"
                  component={DateSessions}
                  size={size}
                />
              </Router>
            </CookiesProvider>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

export default App;
