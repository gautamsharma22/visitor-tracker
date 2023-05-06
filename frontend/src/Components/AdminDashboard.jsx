import React from "react";
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { FormControl, InputLabel, Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import TestData from "../Components/TestData";
import { TokenContext } from "../App";
const AdminDashboard = (props) => {
  if (!jwtToken) return <Redirect to="/home" />;
  /*
    Removed Token Authentication from backend for testing please add it back when you're done...
   */
  const [Requests, setRequests] = useState([]);
  const { jwtToken } = useContext(TokenContext);

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
    const id = req._id;
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

  const req = Requests.map((req) => {
    const visitingDate = new Date(req.visitingDate).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return (
      <>
        <Grid item xs={12} sm={2} md={3}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {req.name}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  {req.visitorType}
                </Typography>
                <Typography variant="body1" color="text.primary" gutterBottom>
                  {visitingDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {req.reason}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {req.reqStatus}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {req.reqStatus === "Accepted" && (
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => {
                    handleRequest(req);
                  }}
                >
                  Reject
                </Button>
              )}
              {req.reqStatus === "Rejected" && (
                <Button
                  size="small"
                  color="success"
                  variant="contained"
                  onClick={() => {
                    handleRequest(req);
                  }}
                >
                  Accept
                </Button>
              )}
              {req.reqStatus === "Pending" && (
                <>
                  <Button
                    size="small"
                    color="success"
                    variant="contained"
                    onClick={() => {
                      handleRequest(req);
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => {
                      handleRequest(req);
                    }}
                  >
                    Reject
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        </Grid>
      </>
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
        {req}
      </Grid>
    </>
  );
};
export default AdminDashboard;
