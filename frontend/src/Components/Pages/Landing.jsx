import React, { useContext } from "react";
import { Typography, Box } from "@mui/material";
import Image1 from "../../images/Visitor-Management-main-image-768x728.svg";
import { UserContext } from "../../App";
const LandingPage = () => {
  const { UserCon } = useContext(UserContext);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      mt={4}
      height={"90vh"}
    >
      <Typography variant="h2" gutterBottom>
        Visitor Tracking System
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            m: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            The Visitor Tracking System provides a simple and efficient
            solution to manage visitor requests in organizations.
          </Typography>
          <Typography variant="h5" gutterBottom>
            The system's features, such as the automated confirmation and
            rejection process, real-time tracking of visitor requests, and
            user-friendly interface.
          </Typography>
          <Typography variant="h5">
            It also ensures that the process of managing visitor requests is
            streamlined and secure.
          </Typography>
        </Box>
        <img src={Image1} height={600} width={600} />
      </Box>
    </Box>
  );
};

export default LandingPage;
