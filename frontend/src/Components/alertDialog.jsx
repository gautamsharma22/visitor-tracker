import React from "react";
import { Alert, AlertTitle } from "@mui/material";
const showResponseAlert = (statusCode) => {
  switch (statusCode) {
    case 200:
      return (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <strong>Your request has been completed successfully.</strong>
        </Alert>
      );
    case 260:
      return (
        <Alert severity="Warning">
          <AlertTitle>Ohh!!!</AlertTitle>
          <strong>Date and time not Set Properly</strong>
        </Alert>
      );
    case 201:
      return (
        <Alert severity="success">
          <AlertTitle>Created</AlertTitle>
          <strong>Your request has been created successfully.</strong>
        </Alert>
      );
    case 400:
      return (
        <Alert severity="warning">
          <AlertTitle>Bad Request</AlertTitle>
          <strong>The server was unable to process your request.</strong>
        </Alert>
      );
    case 401:
      return (
        <Alert severity="warning">
          <AlertTitle>Unauthorized</AlertTitle>
          <strong>You are not authorized to perform this action.</strong>
        </Alert>
      );
    case 404:
      return (
        <Alert severity="error">
          <AlertTitle>Not Found</AlertTitle>
          <strong>The resource you requested was not found.</strong>
        </Alert>
      );
    case 500:
      return (
        <Alert severity="error">
          <AlertTitle>Internal Server Error</AlertTitle>
          <strong>The server encountered an error.</strong>
        </Alert>
      );
    default:
      return (
        <Alert severity="info">
          <AlertTitle>Information</AlertTitle>
          <strong>An unknown error occurred.</strong>
        </Alert>
      );
  }
};
export default showResponseAlert;
