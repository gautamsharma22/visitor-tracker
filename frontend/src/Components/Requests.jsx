import React from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  InputLabel,
  Box,
  Alert,
  AlertTitle,
  FormControl,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { formatISO } from "date-fns";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
const Requests = (props) => {
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
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    reason: "",
    visitortype: "",
    visitingDate: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const [DateAndTime, setDateAndTime] = React.useState(dayjs().add(1, "day"));
  const handleDateChange = (newDate) => {
    console.log(formatISO(newDate.toDate()));
    setDateAndTime(newDate);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const isoDateAndTime = formatISO(DateAndTime.toDate());
    setUserData({ ...userData, visitingDate: isoDateAndTime });
    console.log(userData);
    if (userData.visitingDate === "") {
      return setAlertMessage({
        type: "warning",
        title: "Oops!",
        text: "Date and Time not Selected Properly, ",
        secondrytext: "Please Check Again",
      });
    }
    const { name, email, reason, visitortype, visitingDate } = userData;
    try {
      console.log("request made");
      const res = await fetch("http://localhost:5000/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          reason,
          visitortype,
          visitingDate,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setAlertMessage(data);
        });
    } catch (error) {
      console.log(error);
    }
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
          <Typography variant="h2" align="center">
            Request For a Visit
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
              name="name"
              type="text"
              variant="outlined"
              color="primary"
              label="Enter Full Name: "
              onChange={handleChange}
              value={userData.name}
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
          <Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputLabel htmlFor="DateAndTimePicker">
                Select Visiting Date and Time :
              </InputLabel>
              <DateTimePicker
                value={DateAndTime}
                onChange={handleDateChange}
                views={["year", "month", "day", "hours", "minutes"]}
                required
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
            Subimit Request
          </Button>
        </form>
      </Box>
    </>
  );
};
export default Requests;
