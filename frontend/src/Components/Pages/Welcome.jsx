import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { UserContext } from "../../App";
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
      <Typography variant="h2">Welcome {UserCon.user!=="" && UserCon.user}</Typography>
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
        <Typography variant="body1" sx={{ p: 1, m: 4 }}>
          It's a simple and efficient solution to manage visitor requests in
          organizations.
          <br />
          The system's features, such as real-time tracking of visitor requests,
          and user-friendly interface, ensures that the process of managing
          visitor requests is streamlined and secure.
        </Typography>
      </Box>
    </Box>
  );
};

export default Welcome;
