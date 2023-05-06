import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  InputLabel,
  Box,
  FormControl,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { formatISO } from "date-fns";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import showAlert from "../../Components/alertDialog";
import { TokenContext } from "../../App";

const Requests = (props) => {
  const { jwtToken} = useContext(TokenContext);
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
    setDateAndTime(newDate);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const isoDateAndTime = formatISO(DateAndTime.toDate());
    setUserData((prevUserData) => ({
      ...prevUserData,
      visitingDate: isoDateAndTime,
    }));
    console.log(userData);
    if (userData.visitingDate === "") {
      const alert = showAlert(260);
      return setAlertComponent(alert);
    } else {
      const { reason, visitortype, visitingDate } = userData;
      try {
        console.log("request made");
        const res = await fetch("http://localhost:5000/request/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            reason,
            visitortype,
            visitingDate,
          }),
        })
        const response = await res.json();
        const errMessage = response.message;
        const alert = showAlert(res.status,errMessage);
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
          p: 1,
        }}
        mt={4}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h2" align="center">
            Request For a Visit
          </Typography>
          {AlertComponent && AlertComponent}
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
            Submit Request
          </Button>
        </form>
      </Box>
    </>
  );
};
export default Requests;
