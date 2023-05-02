import React from "react";
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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import image1 from "../../images/bg3.jpg";
import image2 from "../../images/bg2.jpg";
export default function SignInSide(props) {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };
  const [alertMessage, setAlertMessage] = React.useState("");
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
          console.log(alertMessage);
        });
    } catch (err) {
      console.log("Error -> ", err);
    }
  };

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
              width: 56,
              height: 56,
              bgcolor: props.currentTheme ? "warning.light" : "primary.light",
            }}
          >
            <AccountCircleIcon sx={{ width: 56, height: 56 }} />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            Sign in
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
    </Grid>
  );
}
