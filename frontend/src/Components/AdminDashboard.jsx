import React from "react";
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { FormControl, InputLabel, Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import RequestCard from './RequestCard';
import { TokenContext } from "../App";
const AdminDashboard = (props) => {
  /*
    Removed Token Authentication from backend for testing please add it back when you're done...
   */
  const [Requests, setRequests] = useState([]);
  const { jwtToken} = useContext(TokenContext);
  if (!jwtToken) return <Redirect to="/home" />;

  const [VisitorType, setVisitorType] = React.useState("");

  async function fetchData() {
    const res = await fetch("http://localhost:5000/request/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const dataArray = Object.values(data);
        setRequests(dataArray);
        console.log(dataArray);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  function getStatusMessage(status) {
    if (status === "Accepted") {
      return "reject";
    } else if (status === "Rejected") {
      return "accept";
    } else if (status === "Pending") {
      return "accept";
    } else {
      return "";
    }
  }
  async function handleRequest(req) {
    const status = getStatusMessage(req.reqStatus);
    const res = await fetch(
      `http://localhost:5000/request/${status}/${req._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    fetchData();
  }
  function handleSubmit(event) {
    event.preventDefault();
  }

  const reqCards = Requests.map((req) => {
    return (
      <RequestCard req={req} handleRequest={handleRequest} />
    );
  });
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
            View Recieved Requests
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="visitor-type">Visitor Type</InputLabel>
            <Select
              labelId="visitor-type"
              id="visitor-type-select"
              value={VisitorType}
              label="Visitor Type"
              onChange={(e) => setVisitorType(e.target.value)}
            >
              <MenuItem value={"*"}>--All Requests--</MenuItem>
              <MenuItem value={"Parent"}>Parent</MenuItem>
              <MenuItem value={"Alumni"}>Alumni</MenuItem>
              <MenuItem value={"Admission Enquiry"}>Admission Enquiry</MenuItem>
              <MenuItem value={"Fee Submission"}>Fee Submission</MenuItem>
              <MenuItem value={"Maintainance"}>Maintainance</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color={props.currentTheme ? "warning" : "primary"}
            type="submit"
            fullWidth
            size="large"
          >
            Search
          </Button>
        </form>
      </Box>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        mt={2}
        spacing={3}
      >
        {reqCards}
      </Grid>
    </>
  );
};
export default AdminDashboard;
