import React, { useContext } from "react";
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
import { TokenContext } from "../App";
import { UserContext } from "../App";
const MenuBar = (props) => {
  const { setUserCon } = useContext(UserContext);
  const { jwtToken, setJwtToken } = useContext(TokenContext);
  const drawerWidth = 240;
  const navItems = ["Home", "Register", "Login"];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
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
  function handleHoverColor(e) {
    e.target.style.color = props.currentTheme ? "#FFC107" : "#FFFFFF";
  }
  function handleHoverColorBack(e) {
    e.target.style.color = "#FFFFFF";
  }
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ hover: "#" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <MapSharpIcon color={props.currentTheme ? "warning" : ""} />
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
              {!jwtToken && (
                <Button key="Home">
                  <Link
                    to="/Home"
                    style={{
                      textDecoration: "none",
                      color: "#FFFFFF",
                    }}
                    onMouseEnter={handleHoverColor}
                    onMouseLeave={handleHoverColorBack}
                  >
                    Home
                  </Link>
                </Button>)}
              {jwtToken && (
                <Button key="Requests">
                  <Link
                    to="/CreateEntry"
                    style={{ textDecoration: "none", color: "#fff" }}
                    onMouseEnter={handleHoverColor}
                    onMouseLeave={handleHoverColorBack}
                  >
                    Create Entry
                  </Link>
                </Button>
              )}
              {jwtToken && (
                <Button key="AdminPanel">
                  <Link
                    to="/Admin"
                    style={{ textDecoration: "none", color: "#fff" }}
                    onMouseEnter={handleHoverColor}
                    onMouseLeave={handleHoverColorBack}
                  >
                    Admin
                  </Link>
                </Button>
              )}
              {!jwtToken && (
                <Button key="Login">
                  <Link
                    to="/Login"
                    style={{ textDecoration: "none", color: "#fff" }}
                    onMouseEnter={handleHoverColor}
                    onMouseLeave={handleHoverColorBack}
                  >
                    Log In
                  </Link>
                </Button>
              )}
              {jwtToken && (
                <Button key="Log Out">
                  <Link
                    to="/Home"
                    style={{ textDecoration: "none", color: "#fff" }}
                    onMouseEnter={handleHoverColor}
                    onMouseLeave={handleHoverColorBack}
                    onClick={() => {
                      localStorage.removeItem("jwtToken");
                      setJwtToken("");
                      setUserCon("");
                    }}
                  >
                    Log Out
                  </Link>
                </Button>
              )}
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
