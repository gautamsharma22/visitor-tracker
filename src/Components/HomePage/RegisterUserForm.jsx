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
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  MobileDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(firstName, lastName, email, password);
  }

  return (
    <>
      <Box
        sx={{
          p: 1,
        }}
      >
        <form onSubmit={handleSubmit}>
        <Typography variant="h2" gutterBottom align="center">
          Registration Form
        </Typography>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              fullWidth
              required
            />
          </Stack>
          <TextField
            type="email"
            variant="outlined"
            color="primary"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <FormControl variant="outlined" fullWidth sx={{ mb: 4 }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
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
              required
            />
          </FormControl>
          <TextField
            id="outlined-textarea"
            label="Reason"
            placeholder="Please Specify reason for Visit"
            multiline
            fullWidth
            sx={{ mb: 4 }}
            required
                  />
                  <Stack>
                      
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <InputLabel htmlFor="DateAndTimePicker" fullWidth>
              Select Visiting Date and Time :
            </InputLabel>
            <MobileDateTimePicker
              id="DateAndTimePicker"
              defaultValue={dayjs()}
              required
              />
          </LocalizationProvider>
              </Stack>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
                      size="large"
                      sx={{ mt: 4 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </>
  );
};

export default RegisterForm;
