import React, { useState } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MenuBar from "./Components/MenuBar";
import RegisterUserForm from "./Components/HomePage/RegisterUserForm.jsx";
import Login from "./Components/HomePage/Login.jsx"
import AdminDashboard from "./Components/AdminDashboard";
import TestFile from "./Components/TestFile";
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
        <MenuBar onChange={handleChange} currentTheme={theme}/>
        <RegisterUserForm darkMode={theme} />
        {/* <Login darkMode={theme}/> */}
        {/* <AdminDashboard /> */}
        {/* <TestFile/> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
