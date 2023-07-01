import React, { useContext, useEffect,useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Typography, Grid, Box } from "@mui/material";
import { TokenContext } from "../../App";
import { Redirect } from "react-router-dom";
import UserDetailsModal from "../UserDetailsModal";
import Avatar from "@mui/material/Avatar";
const CardView = () => {
  const [Request, setRequest] = React.useState([{}]);
  const { jwtToken } = useContext(TokenContext);
  if (!jwtToken) return <Redirect to="/home" />;
  useEffect(() => {
    fetchData();
  }, []);
  const colors = [
    "#ff8906",
    "#3da9fc",
    "#e53170",
    "#f25f4c",
    "#a786df",
    "#2cb67d",
  ];
  const [open, setOpen] = React.useState(false);
  const [filteredVisitor, setfilteredVisitor] = React.useState(null);
  function handleShowDetails(id) {
    console.log(id);
    setfilteredVisitor(Request.find((req) => req._id === id));
    setOpen(true);
  }

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:5000/request/admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      const dataArray = Object.values(data);
      setRequest(dataArray);
    } catch (err) {
      console.log(err);
    }
  }
  const mappedRequest = Request.map((request) => {
    const checkInTime = new Date(request.checkInTime).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const checkOutTime = request.checkOutTime
      ? new Date(request.checkOutTime).toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        })
      : "--CHECKED IN--";
    return (

      <Card
        key={request._id}
        sx={{
          maxWidth: 300,
          minWidth: 300,
          backgroundColor: "background.secondary",
        }}
      >
        <CardContent>
          <Avatar
            sx={{
              m: 1,
              height: 80,
              width: 80,
              bgcolor: getRandomColor(),
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              {request.firstName && request.firstName.charAt(0)}
            </Typography>
          </Avatar>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            {request.firstName} {request.lastName}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontWeight: "bold",
            }}
          >
            {request.visitortype}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check In: {checkInTime}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check Out: {checkOutTime}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="error">
            Checkout
          </Button>
          <Button size="small" variant="contained" onClick={()=>handleShowDetails(request._id)}>
            Show Details
          </Button>
        </CardActions>
      </Card>
    );
  });
  return (
    <Box
      sx={{
        my: 2,
        mx: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" align="center" gutterBottom>
        Showing All Visitors
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        justifyContent="center"
        sx={{ gap: 3, flexWrap: "wrap" }}
      >
        {mappedRequest}
      </Box>
      { filteredVisitor && <UserDetailsModal open={open} setOpen={setOpen} request={filteredVisitor} />}
    </Box>
  );
};

export default CardView;
