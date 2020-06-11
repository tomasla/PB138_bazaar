import React from "react";
import "./../styles/App.scss";
import { Grid, Typography, Switch } from "@material-ui/core";

export default function Footer() {
  return (
    <div>
      <footer className="footer-bottom">
        <Grid container>
          <Grid item container xs={12} md={6} justify="center">
            <Typography>&copy;Tomas Lakota, Marek Migas, Milan Slovák</Typography>
          </Grid>
          <Grid item container xs={12} md={6} justify="center">
            <Typography>
              Created as seminar project for class PB138
            </Typography>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}
