import React from "react";
import {Grid, ThemeProvider, Paper, createMuiTheme, Switch as DarkSwitch} from "@material-ui/core";
import Header from "./Header";
import {CardView} from "./CardView";
import {AddAd} from "./AddAd";
import {Categories} from "./Categories";
import {AdDetails} from "./AdDetails";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from "mobx-react";
import {createStores} from "../stores/CreateStores";
import Footer from "./Footer";
import "./../styles/App.scss";
import { light } from "@material-ui/core/styles/createPalette";


//darkmode - clashes with mobX provider
function App() {
    const [darkMode, setDarkMode] = React.useState(false);

    const theme = createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
        }
    })

    const stores = createStores();

    return (
        <Provider {...stores}>
          {/* <DarkSwitch checked={darkMode} onChange={()=> setDarkMode(!darkMode)}></DarkSwitch> */}
          <ThemeProvider theme={theme}>
            <Paper>
            
              <div className="page-container">
              <div className="content-wrap">

              <BrowserRouter>
                <Header />
                <Switch>
                  <Route path="/addoffer" component={AddAd} />
                  <Route path="/categories" component={Categories} />
                  <Route path="/:id" component={AdDetails} />
                  <Route path="/" component={() => <CardView categoryP= "" shouldRender= {true}/>} />
                </Switch>
              </BrowserRouter>
              
              </div>
              <Footer />
              </div>
        </Paper>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
