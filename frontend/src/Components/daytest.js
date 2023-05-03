import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  InputLabel,
  Box,
  Alert,
  AlertTitle,
  FormControl,
} from "@mui/material";

const Requests = (props) => {
  const [visitingDate, setVisitingDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Visiting Date: ", visitingDate);
    // perform other form submission actions here
  };

  return (
    <>
      <Box
        sx={{
          p: 1,
        }}
        mt={4}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h2" align="center">
            Request For a Visit
          </Typography>
          <Stack spacing={2}>
            <FormControl>
              <InputLabel htmlFor="visitingDate">Select Visiting Date:</InputLabel>
              <TextField
                id="visitingDate"
                type="date"
                variant="standard"
                value={visitingDate}
                onChange={(event) => setVisitingDate(event.target.value)}
              />
            </FormControl>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default Requests;
