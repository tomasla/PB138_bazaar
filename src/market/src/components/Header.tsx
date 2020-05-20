import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
} from "@material-ui/core"; 

import { Link } from "react-router-dom";


export default class Header extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-evenly">
              <Grid item><Link to={{pathname: "/"}}>Marketplace</Link></Grid>
              <Grid item><Link to={{pathname: "/addoffer"}}>Add Offer</Link></Grid>
              <Grid item><Link to={{pathname: "/categories"}}>Categories</Link></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
    );
  }
}
