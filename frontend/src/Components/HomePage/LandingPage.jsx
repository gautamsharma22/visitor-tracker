import React, { useContext } from "react";
import { Typography, Box } from "@mui/material";
import { UserContext } from "../../App";
const LandingPage = () => {
  const { currentUser, setcurrentUser } = useContext(UserContext);
  console.log("hello", currentUser);
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      mt={4}
      height={"90vh"}
    >
      <Typography variant="h1" align="center" color={"#1976d2"}>
        Welcome {currentUser.LoggedIn && currentUser.firstName}!
      </Typography>
      <Typography variant="h1" align="center" color={"#FFC107"}>
        Currently This App is Under
      </Typography>
      <Typography variant="h1" gutterBottom align="center" color={"#f44336"}>
        Development
      </Typography>
      <Typography variant="h6" align="center">
        Please Comeback Soon :)
      </Typography>
    </Box>
  );
};

export default LandingPage;
