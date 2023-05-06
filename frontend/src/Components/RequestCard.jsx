import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";

const RequestCard = ({ req, handleRequest }) => {
  const visitingDate = new Date(req.visitingDate).toLocaleString();

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
              {visitingDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {req.reason}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {req.reqStatus}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {req.reqStatus === "Accepted" && (
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => {
                handleRequest(req);
              }}
            >
              Reject
            </Button>
          )}
          {req.reqStatus === "Rejected" && (
            <Button
              size="small"
              color="success"
              variant="contained"
              onClick={() => {
                handleRequest(req);
              }}
            >
              Accept
            </Button>
          )}
          {req.reqStatus === "Pending" && (
            <>
              <Button
                size="small"
                color="success"
                variant="contained"
                onClick={() => {
                  handleRequest(req);
                }}
              >
                Accept
              </Button>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => {
                  handleRequest(req);
                }}
              >
                Reject
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default RequestCard;
