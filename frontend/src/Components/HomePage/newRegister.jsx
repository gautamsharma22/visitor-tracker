import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Box,
  CssBaseline,
  Grow,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import { Redirect } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import image1 from "../../images/bg3.jpg";
import image2 from "../../images/bg2.jpg";
import showAlert from "../../Components/alertDialog";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function NewRegister(props) {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(true);
  }, []);
  const [redirect, setRedirect] = React.useState(false);
  const [AlertComponent, setAlertComponent] = useState(null);
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
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(userData);
    const { firstName, lastName, email, password } = userData;
    try {
      const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      if (res.ok) {
        const alert = showAlert(res.status);
        setAlertComponent(alert);
      } else {
        console.log("Error Occured At Register Page");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
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
      <Grow in={checked} {...(checked ? { timeout: 800 } : {})}>
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
                width: 56,
              }}
            >
              <LockOutlinedIcon
                sx={{
                  height: 40,
                  width: 40,
                }}
              />
            </Avatar>
            <form onSubmit={handleSubmit}>
              <Typography variant="h3" align="center">
                Register
              </Typography>
              {AlertComponent && AlertComponent}

              <Stack spacing={2} direction="row" sx={{ mb: 3, mt: 3 }}>
                <TextField
                  name="firstName"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="First Name"
                  onChange={handleChange}
                  value={userData.firstName}
                  fullWidth
                />
                <TextField
                  name="lastName"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Last Name"
                  onChange={handleChange}
                  value={userData.lastName}
                  fullWidth
                />
              </Stack>
              <TextField
                name="email"
                type="email"
                variant="outlined"
                color="primary"
                label="Email"
                onChange={handleChange}
                value={userData.email}
                fullWidth
                sx={{ mb: 3 }}
              />
              <FormControl variant="outlined" fullWidth sx={{ mb: 3 }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  onChange={handleChange}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={userData.password}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                variant="contained"
                color={props.currentTheme ? "warning" : "primary"}
                type="submit"
                fullWidth
                size="large"
              >
                Register
              </Button>
            </form>
          </Box>
        </Grid>
      </Grow>
    </Grid>
  );
}
