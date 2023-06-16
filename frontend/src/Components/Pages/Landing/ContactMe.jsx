import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { Social } from "./TechData";
const ContactMe = () => {
  const social = Social.map((social) => {
    return (
      <Card sx={{ width: "25%", m: 1 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            src={social.Image}
            alt="TechImage"
            style={{ objectFit: "contain", margin: 5 }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {social.Name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {social.Info}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });
  return (
    <>
      <Box
        minHeight="80vh"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Contact Developer
        </Typography>
        <Box
          sx={{
            display: "flex",
            m: 3,
          }}
        >
          {social}
        </Box>
      </Box>
    </>
  );
};

export default ContactMe;
