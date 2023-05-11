import React from "react";
import { useState, createContext } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MenuBar from "./Components/MenuBar";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login.jsx";
import LandingPage from "./Components/Pages/Landing";
import ViewRequests from "./Components/Pages/ViewRequests";
import MakeRequests from "./Components/Pages/MakeRequest";
import AdminDashboard from "./Components/Pages/AdminDashboard"
import { Route, Switch } from "react-router";
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
          <CssBaseline />
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
            <Route exact path="/Requests">
              <MakeRequests currentTheme={theme} />
            </Route>
            <Route exact path="/Home">
              <LandingPage />
            </Route>
            <Route exact path="/View">
              <ViewRequests currentTheme={theme} />
            </Route>
            <Route exact path="/Admin">
              <AdminDashboard currentTheme={theme} />
            </Route>
          </Switch>
          </ThemeProvider>
          </UserContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
