import React, { useState } from "react";
import "./App.css";
import Main from "./Main.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MenuBar from "./Components/MenuBar";
import RegisterUserForm from "./Components/HomePage/RegisterUserForm.jsx";
import { Label } from "@mui/icons-material";
function App() {
  const [theme, settheme] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
    },
  });
  const handleChange = (event) => {
    settheme(event.target.checked);
  };
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MenuBar onChange={handleChange} />
        <h3>Dark Theme</h3>
        <Switch
					checked={theme}
					color='warning'
          onChange={handleChange} />
        <RegisterUserForm />
      </ThemeProvider>
    </div>
  );
}

export default App;
