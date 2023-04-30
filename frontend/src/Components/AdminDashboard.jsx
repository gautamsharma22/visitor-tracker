import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import Requests from "./TestData";
import { Grid } from "@mui/material";
const AdminDashboard = (props) => {
  const [Requests, setRequests] = useState([]);

  const [VisitorType, setVisitorType] = React.useState("");
  useEffect(() => {
    fetch(`http://localhost:5000/view/${VisitorType}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("CallMade");
        console.log(data);
        setRequests(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [VisitorType]);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(VisitorType);
  }

  const req = Requests.map((req) => {
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
                  {req.dateAndTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {req.reason}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="error" variant="contained">
                Decline
              </Button>
              <Button size="small" color="warning" variant="contained">
                Reschedule
              </Button>
              <Button size="small" color="success" variant="contained">
                Accept
              </Button>
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
