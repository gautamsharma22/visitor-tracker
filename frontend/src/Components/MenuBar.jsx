import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Typography,
  Toolbar,
} from "@mui/material";

import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MapSharpIcon from "@mui/icons-material/MapSharp";
import NavbarButtons from "./Pages/NavbarButtons";
const MenuBar = (props) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ hover: "#" }}>
          <Toolbar>
            <MapSharpIcon color="warning" />
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                display: { sm: "block" },
                ml: 1,
              }}
            >
              VISOR
            </Typography>
            {props.theme ? (
              <Brightness7Icon onClick={props.onChange} />
            ) : (
              <DarkModeIcon onClick={props.onChange} />
            )}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <NavbarButtons />
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
          {/* <Toolbar /> */}
        </Box>
      </Box>
    </>
  );
};

export default MenuBar;
