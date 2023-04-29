import React from "react";
import { Typography, Box } from "@mui/material";
const LandingPage = () => {
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
      <Typography variant="h1" gutterBottom align="center">
        Hello! This App is Under Development
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        Please Comeback Soon :)
      </Typography>
    </Box>
  );
};

export default LandingPage;
