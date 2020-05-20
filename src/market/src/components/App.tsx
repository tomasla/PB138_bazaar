import React from "react";
import { Grid, ThemeProvider, Paper, createMuiTheme } from "@material-ui/core";
import Header from "./Header";
import { CardView } from "./CardView";


//optional dark mode = tbd = type: "dark"
function App() {
  const theme = createMuiTheme({
    palette: {
      type: "light"
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Paper>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid container justify="space-around">
          <Grid item sm={2} xs={false}></Grid>
          <Grid item xs={10} sm={8}>
            <CardView />
          </Grid>
          <Grid item sm={2} xs={false}></Grid>
        </Grid>
        <Grid>FOOTER</Grid>
      </Grid>
      </Paper>

    </ThemeProvider>
  );
}

export default App;
