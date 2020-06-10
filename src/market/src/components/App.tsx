import React from "react";
import {Grid, ThemeProvider, Paper, createMuiTheme} from "@material-ui/core";
import Header from "./Header";
import {CardView} from "./CardView";
import {AddAd} from "./AddAd";
import {Categories} from "./Categories";
import {AdDetails} from "./AdDetails";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from "mobx-react";
import {createStores} from "../stores/CreateStores";


//optional dark mode = tbd = type: "dark"
function App() {
    const theme = createMuiTheme({
        palette: {
            type: "light"
        }
    })

    const stores = createStores();

    return (
        <Provider {...stores}>
            <ThemeProvider theme={theme}>
                <Paper>
                    <Grid container direction="column">
                        <Grid item xs={12}>
                            <BrowserRouter>
                                <Header/>
                                <Switch>
                                    <Route path="/addoffer" component={AddAd}/>
                                    <Route path="/categories" component={Categories}/>
                                    <Route path="/:id" component={AdDetails}/>
                                    <Route path="/" component={CardView}/>
                                </Switch>
                            </BrowserRouter>
                        </Grid>
                        <Grid container justify="space-around">
                            {/*
          <Grid item sm={2} xs={false}></Grid>
          <Grid item xs={10} sm={8}>
            <CardView />
          </Grid>
          <Grid item sm={2} xs={false}></Grid>*/}
                        </Grid>
                        <Grid>FOOTER</Grid>
                    </Grid>
                </Paper>

            </ThemeProvider>
        </Provider>
    );
}

export default App;
