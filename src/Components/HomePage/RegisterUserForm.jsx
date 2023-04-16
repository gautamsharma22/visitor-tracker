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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  const [DateAndTime, setDateAndTime] = React.useState(dayjs().add(1, 'day')
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleDateChange = (newDate) => {
    setDateAndTime(newDate)
  }
  const [VisitorType, setVisitorType] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(firstName, lastName, email, password, DateAndTime,VisitorType,reason);
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
              type="text"
              variant="outlined"
              color="primary"
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              fullWidth
          
            />
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              fullWidth
          
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
        
            sx={{ mb: 3 }}
          />
          <FormControl variant="outlined" fullWidth sx={{ mb: 3 }}>
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
          
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="visitor-type">Visitor Type</InputLabel>
            <Select
              labelId="visitor-type"
              id="visitor-type-select"
              value={VisitorType}
              label="Visitor Type"
              onClose={(e) => setVisitorType(e.target.value)}
          
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
            id="outlined-textarea"
            label="Reason of Visit"
            placeholder="Please Specify reason for Visit"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
            multiline
            fullWidth
            sx={{ mb: 3 }}
        
          />
          <Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputLabel htmlFor="DateAndTimePicker" fullWidth>
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
            color={props.darkMode ? "warning" : "primary"}
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
