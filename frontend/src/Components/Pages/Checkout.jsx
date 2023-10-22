import React, { useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { TokenContext } from "../../App";
import showAlert from "../../Components/alertDialog";
import { Redirect } from "react-router-dom";
import Columns from "./DatagridColums"

export default function DataTable(props) {
  const { jwtToken } = useContext(TokenContext);
  if (!jwtToken) return <Redirect to="/home" />;
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(true);
  }, []);
  const [AlertComponent, setAlertComponent] = useState(null);
  React.useEffect(() => {
    if (AlertComponent) {
      const timer = setTimeout(() => {
        setAlertComponent(null);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [AlertComponent]);

  const [Requests, setRequests] = useState([]);
  async function fetchData() {
    const res = await fetch("http://localhost:5000/request/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const dataArray = Object.values(data).map((item) => ({
          ...item,
          checkInTime: new Date(item.checkInTime).toLocaleString(),
          checkOutTime:
            item.checkOutTime === null
              ? "--CHECKED IN--"
              : new Date(item.checkOutTime).toLocaleString(),
        }));
        setRequests(dataArray);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  React.useEffect(() => {
    fetchData();
  }, []);
  function getRowId(row) {
    return row._id;
  }
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const handleSubmit = () => {
    if (selectedRows.length === 0) {
      const alert = showAlert(269, "You forgot to Select Any Visitors ");
      setAlertComponent(alert);
      return;
    }
    selectedRows.forEach(async (id) => {
      const nonVisitedUser = Requests.find(
        (req) => req.checkOutTime === "--CHECKED IN--" && req._id === id
      );
      if (nonVisitedUser) {
        try {
          const res = await fetch(
            `http://localhost:5000/request/chekout/${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          const response = await res.json();
          const errMessage = response.message;
          const alert = showAlert(res.status, errMessage);
          setAlertComponent(alert);
          fetchData();
        } catch (error) {
          console.log(error);
          const alert = showAlert(500, "Error In Checkout");
          setAlertComponent(alert);
        }
      }
    });
    fetchData();
  };

  return (
    <Box
      sx={{
        my: 2,
        mx: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" align="center" gutterBottom>
        Check Out Visitor
      </Typography>
      {AlertComponent && AlertComponent}
      <DataGrid
        rows={Requests}
        columns={Columns}
        rowHeight={80}
        getRowId={getRowId}
        onRowSelectionModelChange={handleSelectionModelChange}
        checkboxSelection
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Check Out Selected Visitors 
      </Button>
    </Box>
  );
}
