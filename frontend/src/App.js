import React from "react";
import { useState, createContext } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import jwtDecode from "jwt-decode";
import Admin from "./Components/Pages/Admin";
import Checkout from "./Components/Pages/Checkout";
import Checkin from "./Components/Pages/Checkin";
import MenuBar from "./Components/MenuBar";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login.jsx";
import LandingPage from "./Components/Pages/Landing/Landing.jsx";
import { Route, Switch } from "react-router";
import { Box } from "@mui/material";
import Welcome from "./Components/Pages/Welcome";
import Cookies from "js-cookie";
import darkTheme from "./Themes/darkTheme";
import lightTheme from "./Themes/lightTheme";
export const TokenContext = createContext();
export const UserContext = createContext();
/* 
Removed Props Theme dependency Please change all the components vice-versa
*/
function App() {
  const [jwtToken, setJwtToken] = useState(null);
  const [UserCon, setUserCon] = useState({ user: "", admin: false });
  const [theme, settheme] = useState(false);
  const handleChange = (event) => {
    settheme(!theme);
  };
  const currentTheme = theme ? darkTheme:lightTheme;
  React.useEffect(() => {
    const cookieValue = Cookies.get("jwttoken");
    if (cookieValue) {
      setJwtToken(cookieValue);
      const decodedToken = jwtDecode(cookieValue);
      const userName = decodedToken.name;
      if (userName) {
        setUserCon({ user: userName, admin: false });
      }
    }
  }, []);
  return (
    <div className="App">
      <TokenContext.Provider value={{ jwtToken, setJwtToken }}>
        <UserContext.Provider value={{ UserCon, setUserCon }}>
          <ThemeProvider theme={currentTheme}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <MenuBar onChange={handleChange} />
              <Switch>
                <Route exact path="/">
                  <LandingPage />
                </Route>
                <Route exact path="/Welcome">
                  <Welcome />
                </Route>
                <Route exact path="/Login">
                  <Login />
                </Route>
                <Route exact path="/Register">
                  <Register />
                </Route>
                <Route exact path="/Checkin">
                  <Checkin />
                </Route>
                <Route exact path="/Home">
                  <LandingPage />
                </Route>
                <Route exact path="/Admin">
                  <Admin />
                </Route>
                <Route exact path="/Checkout">
                  <Checkout />
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
