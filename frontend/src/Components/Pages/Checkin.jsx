import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  InputLabel,
  Box,
  FormControl,
  Input,
  Avatar,
} from "@mui/material";
import { Redirect } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { formatISO } from "date-fns";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import PersonIcon from "@mui/icons-material/Person";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import showAlert from "../../Components/alertDialog";
import { TokenContext } from "../../App";
/*
    Disabled Redirect for testing please add it back 
*/
const CreateEntry = () => {
  const { jwtToken } = useContext(TokenContext);
  if (!jwtToken) return <Redirect to="/home" />;
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64ImageString, setbase64ImageString] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    convertToBase64(file);
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      setbase64ImageString(base64String);
      console.log("Base64 String:", base64String);
    };
  };
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    aadharNumber: "",
    reason: "",
    visitortype: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const [checkInTime, setcheckInTime] = React.useState(
    dayjs().add(1, "minute")
  );
  async function handleSubmit(event) {
    event.preventDefault();
    const isoCheckIn = formatISO(checkInTime.toDate());
    setUserData((prevUserData) => ({
      ...prevUserData,
      checkInTime: isoCheckIn,
    }));
    if (userData.checkInTime === "" || !userData.checkInTime) {
      const message = "Date not selected properly.";
      const alert = showAlert(260, message);
      return setAlertComponent(alert);
    } else {
      const {
        firstName,
        lastName,
        email,
        reason,
        visitortype,
        phoneNumber,
        aadharNumber,
        checkInTime,
      } = userData;
      const visitorImage = base64ImageString;
      try {
        console.log(checkInTime);
        console.log("request made");
        const res = await fetch("http://localhost:5000/request/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            reason,
            visitortype,
            phoneNumber,
            aadharNumber,
            checkInTime,
            visitorImage,
          }),
        });
        const response = await res.json();
        const errMessage = response.message;
        const alert = showAlert(res.status, errMessage);
        setAlertComponent(alert);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <Box
        sx={{
          my: 2,
          mx: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 3 }}>
            Create an Entry for Visitor
            <Stack
              sx={{ mb: 3, justifyContent: "center", alignItems: "center" }}
            >
    <Avatar
      sx={{
        m: 1,
        bgcolor: "primary",
        height: 90,
        width: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
      }}
    >
      {!base64ImageString ? (
        <PersonIcon
          sx={{
            height: 70,
            width: 70,
          }}
        />
      ) : (
        <img
          src={base64ImageString}
          alt="Uploaded"
          style={{
            height: 90,
            width: 90,
            borderRadius: "50%",
          }}
        />
      )}
    </Avatar>
            </Stack>
          </Typography>
          {AlertComponent && AlertComponent}
          <Stack spacing={2} direction="row" sx={{ mb: 3, width: "100%" }}>
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
            id="outlined-textarea"
            label="Email"
            placeholder="Email"
            onChange={handleChange}
            value={userData.email}
            multiline
            fullWidth
            sx={{ mb: 3 }}
          />
          <Stack spacing={2} direction="row" sx={{ mb: 3, width: "100%" }}>
            <TextField
              name="phoneNumber"
              id="outlined-textarea"
              label="Phone Number "
              placeholder="Enter Phone Number"
              onChange={handleChange}
              value={userData.phoneNumber}
              sx={{ width: "50%" }}
            />
            <TextField
              name="aadharNumber"
              id="outlined-textarea"
              label="Aadhar Number"
              placeholder="Enter Aadhar Number"
              onChange={handleChange}
              value={userData.aadharNumber}
              sx={{ width: "50%" }}
            />
          </Stack>
          <FormControl fullWidth sx={{ mb: 3 }} required>
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

          <Stack sx={{ mb: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputLabel htmlFor="DateAndTimePicker">
                Select Check In Time :
              </InputLabel>
              <DateTimePicker
                value={checkInTime}
                onChange={(time) => {
                  setcheckInTime(time);
                }}
                views={["year", "month", "day", "hours", "minutes"]}
                disablePast
                required
              />
            </LocalizationProvider>
          </Stack>
          <label htmlFor="file-input">
            <Input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: "image/*" }}
              style={{ display: "none" }}
            />
            <Button
              fullWidth
              variant="contained"
              component="span"
              size="large"
              // onClick={handleFileUpload}
            >
              Upload Visitor Image
            </Button>
          </label>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            size="large"
            sx={{ mt: 4 }}
          >
            Submit Request
          </Button>
        </form>
      </Box>
    </>
  );
};
export default CreateEntry;
