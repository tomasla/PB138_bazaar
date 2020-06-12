import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import "./../styles/App.scss";

import { Link } from "react-router-dom";

export default class Header extends Component {
  refreshPage = () => {
    window.location.reload();
  }

  getPathName = () => {
    return window.location.pathname;
  }

  checkPathName = () => {

  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="center">
            <Grid item container xs={12} sm={3} justify="center">
              <Link className="navbar-item" to={{ pathname: "/" }}>
                <Typography style={{ fontSize: '20px' }}>Marketplace</Typography>
              </Link>
            </Grid>
            <Grid item container xs={12} sm={3} justify="center">
              <Link className="navbar-item" to={{ pathname: "/addoffer" }}>
                 <Typography style={{ fontSize: '20px' }}><AddIcon style={{ fontSize: '17' }} /> Add Offer</Typography>
              </Link>
            </Grid>
            <Grid item container xs={12} sm={3} justify="center">
              {() => {
                if (window.location.pathname == "/categories"){
                  return (
                    <Link className="navbar-item" to={{ pathname: "/categories" }} onClick = {() => window.location.reload()}>
                      <Typography style={{ fontSize: '20px' }}>Categories</Typography>
                    </Link>
                  );
                } else {
                  return (
                    <Link className="navbar-item" to={{ pathname: "/categories" }}>
                      <Typography style={{ fontSize: '20px' }}>Categories</Typography>
                    </Link>
                  );
                }
              }}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
