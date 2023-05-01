import React, { useState } from "react";
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
function App() {
  const [theme, settheme] = useState(false);
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
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MenuBar onChange={handleChange} currentTheme={theme} />

        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/Login">
            {/* <Login currentTheme={theme} /> */}
          </Route>
          <Route exact path="/Register">
            <RegisterUserForm currentTheme={theme} />
          </Route>
          <Route exact path="/Home">
            <LandingPage />
          </Route>
          <Route exact path="/View">
        <AdminDashboard currentTheme={theme}/>
          </Route>
        </Switch>
        {/* <TestFile/> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
