import React from "react";
import { useState, createContext } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Admin from "./Components/Pages/Admin"
import Checkout from "./Components/Pages/Checkout"
import Checkin from "./Components/Pages/Checkin"
import MenuBar from "./Components/MenuBar";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login.jsx";
import LandingPage from "./Components/Pages/Landing";
import { Route, Switch } from "react-router";
import {Box }from "@mui/material"
import Welcome from "./Components/Pages/Welcome";
import Cookies from "js-cookie"
export const TokenContext = createContext();
export const UserContext = createContext();
function App() {
  const [jwtToken, setJwtToken] = useState(null);
  const [UserCon, setUserCon] = useState({user:"",admin:false});
  const [theme, settheme] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
    },
  });
  const handleChange = (event) => {
    settheme(!theme);
  };
  React.useEffect(() => {
    const cookieValue = Cookies.get("jwttoken");
    if (cookieValue) {
      setJwtToken(cookieValue);
    }
  }, []);
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
            <Route exact path="/Welcome">
              <Welcome currentTheme={theme} />
            </Route>
            <Route exact path="/Login">
              <Login currentTheme={theme} />
            </Route>
            <Route exact path="/Register">
              < Register currentTheme={theme}/>
            </Route>
            <Route exact path="/Checkin">
              <Checkin currentTheme={theme} />
            </Route>
            <Route exact path="/Home">
              <LandingPage />
            </Route>
            <Route exact path="/Admin">
              <Admin currentTheme={theme} />
            </Route>
            <Route exact path="/Checkout">
              <Checkout currentTheme={theme} />
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
