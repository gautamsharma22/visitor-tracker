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
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  MobileDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const RegisterForm = (props) => {
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    reason: "",
    password: "",
    visitortype: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const [DateAndTime, setDateAndTime] = React.useState(dayjs().add(1, "day"));
  const handleDateChange = (newDate) => {
    setDateAndTime(newDate);
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
      reason,
      password,
      visitortype,
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
        reason,
        password,
        visitortype,
      }),
    });
  }

  return (
    <>
      <Box
        sx={{
          p: 1,
        }}
        mt={4}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h2" gutterBottom align="center">
            Registration Form
          </Typography>
          <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
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
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="visitor-type">Visitor Type</InputLabel>
            <Select
              name="visitortype"
              labelId="visitor-type"
              id="visitor-type-select"
              value={userData.visitortype}
              label="Visitor Type"
              onChange={handleChange}
            >
              <MenuItem value={"Parent"}>Parent</MenuItem>
              <MenuItem value={"Alumni"}>Alumni</MenuItem>
              <MenuItem value={"Admission Enquiry"}>Admission Enquiry</MenuItem>
              <MenuItem value={"Fee Submission"}>Fee Submission</MenuItem>
              <MenuItem value={"Maintainance"}>Maintainance</MenuItem>
              <MenuItem value={"Others"}>--Others--</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="reason"
            id="outlined-textarea"
            label="Reason of Visit"
            placeholder="Please Specify reason for Visit"
            onChange={handleChange}
            value={userData.reason}
            multiline
            fullWidth
            sx={{ mb: 3 }}
          />
          <Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputLabel htmlFor="DateAndTimePicker">
                Select Visiting Date and Time :
              </InputLabel>
              <MobileDateTimePicker
                id="DateAndTimePicker"
                value={DateAndTime}
                onChange={handleDateChange}
                disablePast
              />
            </LocalizationProvider>
          </Stack>
          <Button
            variant="contained"
            color={props.currentTheme ? "warning" : "primary"}
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
