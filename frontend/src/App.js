import React from "react";
import { useState, createContext } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MenuBar from "./Components/MenuBar";
import RegisterUserForm from "./Components/HomePage/RegisterUserForm.jsx";
import Login from "./Components/HomePage/Login.jsx";
import AdminDashboard from "./Components/AdminDashboard";
import TestFile from "./Components/TestFile";
import { Route, Switch } from "react-router";
import LandingPage from "./Components/HomePage/LandingPage";
import Requests from "./Components/Requests";
export const UserContext = createContext();
function App() {
  const [currentUser, setcurrentUser] = useState({Username:"", LoggedIn: false });
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
      <UserContext.Provider value={{currentUser, setcurrentUser}}>
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
              <RegisterUserForm currentTheme={theme} />
            </Route>
            <Route exact path="/Requests">
              <Requests currentTheme={theme} />
            </Route>
            <Route exact path="/Home">
              <LandingPage />
            </Route>
            <Route exact path="/View">
              <AdminDashboard currentTheme={theme} />
            </Route>
          </Switch>
          {/* <TestFile/> */}
        </ThemeProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
