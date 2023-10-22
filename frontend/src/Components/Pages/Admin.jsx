import React, { useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { TokenContext } from "../../App";
import { Redirect } from "react-router-dom";
import Columns from "./DatagridColums";

export default function DataTable() {
  const [Requests, setRequests] = useState([]);
  const { jwtToken } = useContext(TokenContext);
  if (!jwtToken) return <Redirect to="/home" />;
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
    if (selectionModel.length > 0) {
      const selectedRow = Requests.find((row) => row._id === selectionModel[0]);
    }
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
      {Requests.length > 0 ? (
        <>
          <Typography variant="h2" align="center" gutterBottom>
            Showing all Visitors
          </Typography>
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
            // onClick={handleSubmit}
          >
            Show Details
          </Button>
        </>
      ) : (
        <Typography variant="h2" align="center" gutterBottom>
          No Visitors Visited
        </Typography>
      )}
    </Box>
  );
}
