import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Grid,
  Box,
  Paper,
  TextField,
  Grow,
} from "@mui/material";
import Cookies from "js-cookie";
import PersonIcon from "@mui/icons-material/Person";
import image1 from "../../images/Visitor-main-image-Banner.svg";
import { TokenContext } from "../../App";
import showAlert from "../../Components/alertDialog";
import { UserContext } from "../../App";
export default function Login(props) {
  const {setUserCon } = useContext(UserContext);
  const { jwtToken, setJwtToken } = useContext(TokenContext);
  const cookieValue = Cookies.get('jwttoken');
  if(cookieValue || jwtToken) return <Redirect to="/Welcome" />;
  const [checked, setChecked] = React.useState(false);
  const [AlertComponent, setAlertComponent] = useState(null);
  React.useEffect(() => {
    setChecked(true);
  }, []);
  const [user, setUser] = React.useState({ email: "", password: "" });
  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  const [redirect, setRedirect] = React.useState(false);
  React.useEffect(() => {
    if (jwtToken) {
      const redirectTimer = setTimeout(() => {
        setRedirect(true);
      }, 600);
      return () => clearTimeout(redirectTimer);
    }
  }, [jwtToken]);

  React.useEffect(() => {
    if (AlertComponent) {
      const timer = setTimeout(() => {
        setAlertComponent(null);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [AlertComponent]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await res.json();
    
      if (!res.ok) {
        const errMessage = data.message;
        const alert = showAlert(res.status,errMessage);
        setAlertComponent(alert);
      } else {
        const errMessage = data.message;
        const alert = showAlert(res.status,errMessage);
        setAlertComponent(alert);
        setJwtToken(data.token);
        setUserCon({ user: data.user, admin: data.admin });
      }
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "95vh" }}>
      {redirect && <Redirect to="/Welcome" />}
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:"center"
        }}
      >
        <img src={image1} height={600} width={600} alt="login"/>
        </Grid>
      <Grow in={checked} {...(checked ? { timeout: 800 } : {})}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square backgroundColor="background.secondary">
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "primary",
                height: 56,
                width: 56,
              }}
            >
              <PersonIcon
                sx={{
                  height: 50,
                  width: 50,
                }}
              />
            </Avatar>
            <Typography variant="h3" align="center">
              Login
            </Typography>
            {AlertComponent && AlertComponent}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grow>
    </Grid>
  );
}
