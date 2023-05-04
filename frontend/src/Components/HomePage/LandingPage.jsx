import React, { useContext } from "react";
import { Typography, Box, Grow, Zoom } from "@mui/material";
import { UserContext } from "../../App";
const LandingPage = () => {
  const { currentUser, setcurrentUser } = useContext(UserContext);
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(true);
  }, []);
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
      <Grow
        in={checked}
        {...(checked ? { timeout: 1500 } : {})}
      >
        <Typography variant="h1" align="center" color={"#1976d2"}>
          Welcome {currentUser.LoggedIn && currentUser.firstName}!
        </Typography>
      </Grow>
      <Grow
        in={checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(checked ? { timeout: 1500 } : {})}
      >
        <Typography variant="h1" align="center" color={"#FFC107"}>
          Currently This App is Under
        </Typography>
      </Grow>
      <Zoom in={checked} style={{ transitionDelay: checked ? '1000ms' : '0ms' }}>
        <Typography variant="h1" gutterBottom align="center" color={"#f44336"}>
          Development
        </Typography>
      </Zoom>
    </Box>
  );
};

export default LandingPage;
