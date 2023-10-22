import React from "react";
import { useState, createContext } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
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
import ViewAdmins from "./Components/Pages/ViewAdmins";
import ButtonModal from "./Components/ButtonModal";
import CardView from "./Components/Pages/CardView";
import UserDetailsModal from "./Components/UserDetailsModal";
export const TokenContext = createContext();
export const UserContext = createContext();
/* 
  // TODOS
  
  Frontend Validations 
  Removed Props Theme dependency Please change all the components vice-versa
  Admin Module custom page remaining
  Checkout and Show More Button Pending at View All 
  Remove Option Pop-Up at Admin >> ViewAll Pending
  Crash Fix At Image Selector { Set Image Max Size}
  Fix : Check Auto Reload Not Working
  Show images in View All

*/
function App() {
  const [jwtToken, setJwtToken] = useState(null);
  const [UserCon, setUserCon] = useState({ user: "", admin: false });
  const [theme, settheme] = useState(false);
  const handleChange = (event) => {
    settheme(!theme);
  };
  const currentTheme = theme ? darkTheme : lightTheme;
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
  // testing Modal Please delete it after test and move it to view admin page with API call
  const request = {
    "firstName": "Ashwani",
    "lastName": "Kumar",
    "email": "Ashwani@gmail.com",
    "reason": "Take Degree",
    "visitortype": "Alumni",
    "checkInTime": {
      "$date": "2023-06-27T14:38:37Z"
    },
    "checkOutTime": null,
    "phoneNumber": "8976789878",
    "aadharNumber": "9878987876",
  };
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
              <MenuBar onChange={handleChange} theme={theme} />
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
                <Route exact path="/View">
                  <CardView />
                </Route>
                <Route exact path="/Test">
                  <ViewAdmins />
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
