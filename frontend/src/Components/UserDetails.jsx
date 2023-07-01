import React from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";
const colors = [
  "#ff8906",
  "#3da9fc",
  "#e53170",
  "#f25f4c",
  "#a786df",
  "#2cb67d",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const UserDetails = ({ request }) => {
  return (
    <div>
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold" }}
        gutterBottom
        align="center"
      >
        Visitor Information
      </Typography>
      <Box
        minWidth="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
        mb={2}
      >
        <Avatar
          sx={{
            m: 1,
            height: 100,
            width: 100,
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
      </Box>

      <Typography variant="h6" component="div" gutterBottom>
        <span style={{ fontWeight: "bold" }}>Name: </span>
        {request.firstName} {request.lastName}
      </Typography>


      <Typography variant="h6" component="div" gutterBottom>
        <span style={{ fontWeight: "bold" }}>Email: </span>
        {request.email}
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        <span style={{ fontWeight: "bold" }}>Reason: </span>
        {request.reason}
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        <span style={{ fontWeight: "bold" }}>Visitor Type: </span>
        {request.visitortype}
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        <span style={{ fontWeight: "bold" }}>Check-In Time: </span>
        {request.checkInTime.$date}
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        <span style={{ fontWeight: "bold" }}>Check-Out Time: </span>
        {request.checkOutTime ? request.checkOutTime.$date : "N/A"}
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        <span style={{ fontWeight: "bold" }}>Phone Number: </span>
        {request.phoneNumber}
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        <span style={{ fontWeight: "bold" }}>Aadhar Number: </span>
        {request.aadharNumber}
      </Typography>
    </div>
  );
};

export default UserDetails;
