import React from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import Header from "./Header";
import CardView from "./CardView";

function App() {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Header/>
      </Grid>
      <Grid container justify="space-around">
        <Grid item sm={2} xs={false}></Grid>
        <Grid item xs={10} sm={8}>
          <CardView/>

        </Grid>
        <Grid item sm={2} xs={false}></Grid>
      </Grid>
      <Grid>FOOTER</Grid>
    </Grid>
  );
}

export default App;
