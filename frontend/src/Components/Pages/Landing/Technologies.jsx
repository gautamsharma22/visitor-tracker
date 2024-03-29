import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { Tech, Security } from "./TechData";
import DeveloperDetails from "./DeveloperDetails";
import ContactMe from "./ContactMe";
const newArr = Tech.map((tech) => {
  return (
    <Card sx={{ width: "25%", m: 1, backgroundColor: "background.default" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={tech.Image}
          alt="TechImage"
          style={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold", color: "text.primary" }}
          >
            {tech.Name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {tech.Info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});
const SecArr = Security.map((sec) => {
  return (
    <Card sx={{ width: "30%", m: 2 ,backgroundColor: "background.secondary"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={sec.Image}
          alt="Security Image"
          style={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            {sec.Name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {sec.Info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default function Technologies() {
  return (
    <>
      <Box
        minHeight="80vh"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "background.secondary",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "text.primary" ,
          }}
        >
          Tech Stack Used
        </Typography>
        <Box
          sx={{
            display: "flex",
            m: 3,
          }}
        >
          {newArr}
        </Box>
      </Box>
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
          Security Features
        </Typography>
        <Box
          sx={{
            display: "flex",
            m: 3,
          }}
        >
          {SecArr}
        </Box>
      </Box>
      <DeveloperDetails />
      <ContactMe />
    </>
  );
}
