import React from "react";
import { useState, createContext } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Test from "./Components/Pages/Test"
import MenuBar from "./Components/MenuBar";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login.jsx";
import LandingPage from "./Components/Pages/Landing";
import CreateEntry from "./Components/Pages/CreateEntry";
import { Route, Switch } from "react-router";
import {Box }from "@mui/material"
export const TokenContext = createContext();
export const UserContext = createContext();
function App() {
  const [jwtToken, setJwtToken] = useState(null);
  const [UserCon, setUserCon] = useState(null);
  const [theme, settheme] = useState(true);
  const darkTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
    },
  });
  const handleChange = (event) => {
    settheme(!theme);
  };
  return (
    <div className="App">
      <TokenContext.Provider value={{jwtToken, setJwtToken}}>
      <UserContext.Provider value={{UserCon, setUserCon}}>
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <MenuBar onChange={handleChange} currentTheme={theme} />
          <Switch>
            <Route exact path="/">
              <LandingPage currentTheme={theme} />
            </Route>
            <Route exact path="/Login">
              <Login currentTheme={theme} />
            </Route>
            <Route exact path="/Register">
              < Register currentTheme={theme}/>
            </Route>
            <Route exact path="/CreateEntry">
              <CreateEntry currentTheme={theme} />
            </Route>
            <Route exact path="/Home">
              <LandingPage />
            </Route>
            <Route exact path="/Admin">
              <Test currentTheme={theme} />
            </Route>
            </Switch>
            </Box>
          </ThemeProvider>
          </UserContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
