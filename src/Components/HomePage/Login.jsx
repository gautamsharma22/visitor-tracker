import React from "react"
import {Avatar,Button,CssBaseline,Typography,Grid,Box,Paper,TextField} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import image1 from "../../images/bg3.jpg"
import image2 from "../../images/bg2.jpg"
export default function SignInSide(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
            backgroundImage:props.currentTheme?`url(${image1})`:`url(${image2})`,
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
          <Avatar sx={{ width: 56, height: 56,bgcolor:props.currentTheme?"warning.light":"primary.light" }}
          >
            <AccountCircleIcon sx={{ width: 56, height: 56 }}
            />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
                autoComplete="email"
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
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color={props.currentTheme?"warning":"primary"}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}
