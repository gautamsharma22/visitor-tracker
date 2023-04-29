import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Typography,
  ListItemText,
  Toolbar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MapSharpIcon from "@mui/icons-material/MapSharp";
import { Link } from "react-router-dom";

const MenuBar = (props) => {
  const drawerWidth = 240;
  const navItems = ["Home", "Register", "Login"];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  console.log(props);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VISOR
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <MapSharpIcon
              sx={{ display: { xs: "none", sm: "block" } }}
              color={props.currentTheme ? "warning" : ""}
            />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, display: { sm: "block" }, ml: 1 }}
            >
              VISOR
            </Typography>
            {props.currentTheme ? (
              <Brightness7Icon onClick={props.onChange} />
            ) : (
              <DarkModeIcon onClick={props.onChange} />
            )}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button key="Home">
                <Link
                  to="/Home"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Home
                </Link>
              </Button>
              <Button key="Login">
                <Link
                  to="/Login"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Login
                </Link>
              </Button>
              <Button key="Register">
                <Link
                  to="/Register"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Register
                </Link>
                </Button>
              <Button key="View">
                <Link
                  to="/View"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  View Requests
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "color.primary",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          {/* <Toolbar /> */}
        </Box>
      </Box>
    </>
  );
};

export default MenuBar;
