import { Box } from "@mui/material";
import React from "react";
import { Typography, Button } from "@mui/material";
import UserDetails from "../Components/UserDetails"
const ModalStyles = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  backgroundColor: "rgba(0,0,0,0.1)",
  backdropFilter: "blur(1px)",
  justifyContent: "center",
  alignItems: "center",
};
const ModalBoxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.secondary",
  border: "1px solid #000",
  borderRadius: 5,
  boxShadow: 15,
  p: 4,
};
const UserDetailsModal = (props) => {
  const { request } = props;
  return (
    props.open && (
      <Box
        open={props.open}
        onClose={() => props.setOpen(false)}
        sx={ModalStyles}
        onClick={() => props.setOpen(false)}
      >
        <Box sx={ModalBoxstyle} onClick={(e) => e.stopPropagation()}>
          <UserDetails request={request}/>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={() => props.setOpen(false)}
            sx={{ mr: 2, mt: 2 }}
          >
            Remove
          </Button>
          <Button
            size="medium"
            variant="contained"
            sx={{ mr: 2, mt: 2 }}
            onClick={() => props.setOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Box>
    )
  );
};

export default UserDetailsModal;
