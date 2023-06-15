import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { UserContext,TokenContext } from "../../App";
import Image1 from "../../images/Parent-Concerns-Helpdesk-768x655.svg";
const Welcome = () => {
  const { UserCon } = useContext(UserContext);
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      mt={4}
      height={"90vh"}
    >
      <Typography
        gutterBottom
        variant="h2"
        component="div"
        sx={{ textAlign: "center" }}
      >
        Welcome {UserCon.user !== "" && UserCon.user}
      </Typography>
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "row",
        }}
        mt={4}
        height={"90vh"}
      >
        <img src={Image1} height={600} width={600}></img>
      </Box>
    </Box>
  );
};

export default Welcome;
