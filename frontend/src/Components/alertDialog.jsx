import React from "react";
import { Alert, AlertTitle } from "@mui/material";
const showResponseAlert = (statusCode, message) => {
  switch (statusCode) {
    case 200:
      return (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <strong>{message}</strong>
        </Alert>
      );
    case 260:
      return (
        <Alert severity="warning">
          <AlertTitle>Ohh!!!</AlertTitle>
          <strong>{message}</strong>
        </Alert>
      );
    case 201:
      return (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <strong>{message}</strong>
        </Alert>
      );
    case 400:
      return (
        <Alert severity="warning">
          <AlertTitle>Bad Request</AlertTitle>
          <strong>{message}</strong>
        </Alert>
      );
    case 401:
      return (
        <Alert severity="warning">
          <AlertTitle>Unauthorized</AlertTitle>
          <strong>{message}</strong>
        </Alert>
      );
    case 404:
      return (
        <Alert severity="error">
          <AlertTitle>Not Found</AlertTitle>
          <strong>{message}</strong>
        </Alert>
      );
    case 500:
      return (
        <Alert severity="error">
          <AlertTitle>Internal Server Error</AlertTitle>
          <strong>{message}</strong>
        </Alert>
      );
    case 269:
      return (
        <Alert severity="info">
          <AlertTitle>Oops! </AlertTitle>
          <strong> {message}</strong>
        </Alert>
      );
    default:
      return (
        <Alert severity="info">
          <AlertTitle>Information</AlertTitle>
          <strong>{message}</strong>
        </Alert>
      );
  }
};
export default showResponseAlert;
