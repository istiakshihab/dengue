/**
 * Created by Rajesh on 11/26/18.
 */

import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import "../sass/app.scss";
import store from "./store";
import Landing from "./pages/landing";
import Area from "./pages/areaSelector";
import About from "./pages/about";
import NotFound from "./pages/notfound";

const theme = createMuiTheme({});

const styles = makeStyles({
  verticalCenter: {
    alignSelf: "center",
  },
});

function Navbar(props) {
  const classes = styles();
  return (
    <AppBar position="fixed" style={{ backgroundColor: "#232323" }}>
      <Toolbar>
        <Grid
          container
          spacing={4}
          className="logo-container"
          style={{ paddingBottom: "1rem" }}
        >
          <Grid item xs={12} sm={6}>
            <a href="https://pipilika.com/">
              <img src="/img/logo.png" className="logo" />
            </a>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.verticalCenter}>
            <Typography
              variant="h6"
              align="right"
              style={{ paddingTop: "1rem" }}
            >
              বাংলাদেশের ডেঙ্গু পরিস্থিতি
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

let Root = ({ store }) => (
  <React.Fragment>
    <Navbar />
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/landing" component={Landing} />
          <Route path="/search" component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/area" component={Area} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  </React.Fragment>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

render(
  <MuiThemeProvider theme={theme}>
    <Root store={store} />
  </MuiThemeProvider>,
  document.getElementById("app")
);
