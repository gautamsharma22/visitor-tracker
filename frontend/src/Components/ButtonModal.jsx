import { Box } from "@mui/material";
import React,{useContext} from "react";
import { Typography, Button } from "@mui/material";
import { TokenContext } from "../App";
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
const ButtonModal = (props) => {
  const { jwtToken } = useContext(TokenContext);
  function handleRemove() {
    const deleteId = props.userId;
    try {
      const response = fetch("http://localhost:5000/users/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ userId: deleteId }),
      });
    } catch (err) {
      console.log(err);
    }
    props.setOpen(false);
  }

  return (
    props.open && (
      <Box
        open={props.open}
        onClose={() => props.setOpen(false)}
        sx={ModalStyles}
        onClick={() => props.setOpen(false)}
      >
        <Box sx={ModalBoxstyle} onClick={(e) => e.stopPropagation()}>
          <Typography variant="h6" component="h2">
            Are you Sure Want to Dismiss this User As Admin ??
          </Typography>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={handleRemove}
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
            Cancel
          </Button>
        </Box>
      </Box>
    )
  );
};

export default ButtonModal;
