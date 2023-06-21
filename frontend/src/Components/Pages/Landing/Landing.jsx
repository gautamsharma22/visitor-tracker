import React, { useContext } from "react";
import { Typography, Box } from "@mui/material";
import Image1 from "../../../images/Visitor-Management-main-image-768x728.svg";
import Technologies from "./Technologies";
const LandingPage = () => {
  return (
    <>
      <Box
        sx={{
          justifyItems: "center",
          justifyContent:"center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "70vh"
        }}
        mt={4}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          About VISOR
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ m: 4, flexBasis: "75%" }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: "justify", color:"text.secondary"}}>
              VISOR (Visitor Tracking Sytem) is an online version of the manual
              recording of visitors in a visitor register, offering advanced
              features. It digitally collects and analyzes visitor data,
              providing valuable insights into demographics, traffic patterns,
              and engagement. It optimizes operations, enhances customer
              experiences, and ensures efficient visitor management.
            </Typography>
          </Box>
          <Box sx={{ flexBasis: '25%', display: 'flex', justifyContent: 'center' }}>
      <img
        src={Image1}
        alt="Image"
        height="100%"
        width="100%"
      />
    </Box>
        </Box>
      </Box>
      <Technologies />
    </>
  );
};

export default LandingPage;
