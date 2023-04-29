import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Requests from "./TestData";
import { Grid } from "@mui/material";
const AdminDashboard = () => {
  const req = Requests.map((req) => {
    return (
      <Grid item xs={12} sm={2} md={3}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {req.name}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {req.visitorType}
              </Typography>
              <Typography variant="body1" color="text.primary" gutterBottom>
                {req.dateAndTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {req.reason}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="error" variant="contained">
              Decline
            </Button>
            <Button size="small" color="warning" variant="contained">
              Reschedule
            </Button>
            <Button size="small" color="success" variant="contained">
              Accept
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
  return (
      <Grid container direction={{ xs: "column", sm: "row" }} mt={2}
        spacing={3}
      >
      {req}
    </Grid>
  );
};
export default AdminDashboard;
