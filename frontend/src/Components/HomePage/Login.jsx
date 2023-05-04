import React, { useContext } from "react";
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
  Alert,
  AlertTitle,
  Grow,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import image1 from "../../images/bg3.jpg";
import image2 from "../../images/bg2.jpg";
import { UserContext } from "../../App";
export default function Login(props) {
  const [checked, setChecked] = React.useState(false);
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
  const { currentUser, setcurrentUser } = useContext(UserContext);
  const [redirect, setRedirect] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  React.useEffect(() => {
    if (currentUser.LoggedIn) {
      const redirectTimer = setTimeout(() => {
        setRedirect(true);
      }, 1000);
      return () => clearTimeout(redirectTimer);
    }
  }, [currentUser.LoggedIn]);

  React.useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alertMessage]);
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
      })
        .then((response) => response.json())
        .then((data) => {
          setAlertMessage(data);
          setcurrentUser({ ...currentUser, ...data });
        });
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {redirect && <Redirect to="/home" />}
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: props.currentTheme
            ? `url(${image1})`
            : `url(${image2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grow
        in={checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(checked ? { timeout: 800 } : {})}
      >
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                bgcolor: props.currentTheme ? "warning.light" : "primary.light",
                height: 56,
                width:56,
              }}
            >
              <PersonIcon sx={{
                height: 50,
                width:50,
              }}/>
            </Avatar>
            <Typography variant="h3" align="center">
              Login
            </Typography>
            {alertMessage && (
              <Alert severity={alertMessage.type}>
                <AlertTitle>{alertMessage.title}</AlertTitle>
                {alertMessage.text}
                <strong>{alertMessage.secondrytext}</strong>
              </Alert>
            )}
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
                color={props.currentTheme ? "warning" : "primary"}
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
