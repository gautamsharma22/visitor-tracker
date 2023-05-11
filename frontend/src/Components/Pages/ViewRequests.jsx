import React from "react";
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import { TokenContext } from "../../App";
import { UserContext } from "../../App";
import { Grid, Grow,Zoom } from "@mui/material";
const UserRequests = (props) => {
  const { jwtToken } = useContext(TokenContext);
  if (!jwtToken) return <Redirect to="/home" />;
  const [Requests, setRequests] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/request", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("CallMade");
          console.log(data);
          const dataArray = Object.values(data);
          setRequests(dataArray);
          console.log(dataArray);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  const { UserCon } = useContext(UserContext);
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(true);
  }, []);

  const req = Requests.map((req) => {
    const visitingDate = new Date(req.visitingDate).toLocaleString();
    return (
      <>
        <Grid item xs={12} sm={2} md={3} key={req.id}>
        <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
          <Card sx={{ width: "300px", height: "200px" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {req.visitortype}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                {req.reason}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {visitingDate}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {req.reqStatus === "Rejected" && (
                <Button size="small" color="error" variant="contained" alignSelf="flex-end">
                  Request Rejected
                </Button>
              )}
              {req.reqStatus === "Accepted" && (
                <Button size="small" color="success" variant="contained">
                  Request Accepted
                </Button>
              )}
              {req.reqStatus === "Pending" && (
                <Button size="small" color="warning" variant="contained">
                  Request Pending
                </Button>
              )}
            </CardActions>
            </Card>
            </Zoom>
        </Grid>
      </>
    );
  });
  return (
    <Box m={3}>
      {UserCon && (
        <Grow in={checked} {...(checked ? { timeout: 2000 } : {})}>
          <Typography variant="h3" align="center" gutterBottom>
            Hello, {UserCon}
          </Typography>
        </Grow>
      )}
      <Grid container direction={{ xs: "column", sm: "row" }} spacing={3}>
        {req}
      </Grid>
    </Box>
  );
};
export default UserRequests;
