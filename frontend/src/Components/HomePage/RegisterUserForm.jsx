import React from "react";
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
  Alert,
  AlertTitle,
  LinearProgress,
  CssBaseline,
} from "@mui/material";
import { Redirect } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const RegisterForm = (props) => {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  React.useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
        if (alertMessage.type === "success" || alertMessage.type==="info") {
          setRedirect(true);
        }
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alertMessage]);
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
    const {
      firstName,
      lastName,
      email,
      password,
    } = userData;
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
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertMessage(data);
        console.log(data);
      });
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          p: 2,
        }}
        mt={4}
        >
{redirect && (
  <React.Fragment>
    <div>
      <Redirect to="/login" />
      <LinearProgress color="warning" />
    </div>
  </React.Fragment>
)}
        <form onSubmit={handleSubmit}>
          <Typography variant="h2" align="center">
            Register
          </Typography>
          {alertMessage && (
            <Alert severity={alertMessage.type}>
              <AlertTitle>{alertMessage.title}</AlertTitle>
              {alertMessage.text}
              <strong>{alertMessage.secondrytext}</strong>
            </Alert>
          )}
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
    </>
  );
};

export default RegisterForm;
