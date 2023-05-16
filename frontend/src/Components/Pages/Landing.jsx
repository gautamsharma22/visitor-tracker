import React, { useContext } from "react";
import { Typography, Box, Grow, Zoom } from "@mui/material";
import { UserContext } from "../../App";
const LandingPage = () => {
  const { UserCon } = useContext(UserContext);
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <Box
      m={3}
    >
      <Grow in={checked} {...(checked ? { timeout: 1500 } : {})}>
        <Typography variant="h2" align="center" color={"#1976d2"}>
          Welcome to
        </Typography>
      </Grow>
      <Grow
        in={checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(checked ? { timeout: 1500 } : {})}
      >
        <Typography variant="h3" align="center" color={"#FFC107"} gutterBottom>
          VISOR (Advanced Visitor Tracking Sytem)
        </Typography>
      </Grow>
      <Zoom
        in={checked}
        style={{ transitionDelay: checked ? "1000ms" : "0ms" }}
      >
        <Typography variant="h4" align="justify">
          It's a simple and efficient solution to manage visitor
          requests in organizations.<br/>
          The system's features, such as real-time
          tracking of visitor requests, and user-friendly interface, ensures
          that the process of managing visitor requests is streamlined and
          secure.
        </Typography>
      </Zoom>
      </Box>
  );
};

export default LandingPage;
