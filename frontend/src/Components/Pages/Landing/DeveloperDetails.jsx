import React from "react";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import DevImage from "../../../images/dev_details.jpg";
const DeveloperDetails = () => {
  const roundImageStyle = {
    borderRadius: "50%",
    border: "2px solid #888888",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  return (
    <>
      <Box
        minHeight="80vh"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Developer Details
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              maxWidth: "50%",
              alignItems: "center",
              justifyContent: "center",
              p: 5,
            }}
          >
            <img
              src={DevImage}
              height="300px"
              style={roundImageStyle}
              width="300px"
              alt="Gautam's Image"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              maxWidth: "50%",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Hey There!
            </Typography>
            <Typography variant="body1" gutterBottom>
              I am a final year student pursuing a Bachelor's degree in
              Information Technology (B.Sc. I.T.), and I am planning to pursue
              my Masters. I have a strong interest in web development and
              problem-solving. Currently, I am focusing on learning the MERN
              (MongoDB, Express.js, React.js, Node.js) stack, and I have
              intermediate-level proficiency in these technologies.
              Additionally, I dedicate my free time to practicing Data
              Structures and Algorithms (DSA) to enhance my problem-solving
              skills. I am passionate about honing my skills in web development
              and continuously expanding my knowledge in the field.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DeveloperDetails;
