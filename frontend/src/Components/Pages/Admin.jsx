import React, { useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box,Button,Typography } from "@mui/material";
import { TokenContext } from "../../App";
import { Redirect } from "react-router-dom";
import Columns from "./DatagridColums"



export default function DataTable(props) {
  const [Requests, setRequests] = useState([]);
  const { jwtToken } = useContext(TokenContext);
  // if (!jwtToken) return <Redirect to="/home" />;
  async function fetchData() {
    const res = await fetch("http://localhost:5000/request/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwtToken}`,
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
        console.log(dataArray);
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
      console.log("Selected Row:", selectionModel);
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
      <Typography variant="h2" align="center" gutterBottom>
        Create an Entry for Visitor
      </Typography>
      <DataGrid
        rows={Requests}
        columns={Columns}
        getRowId={getRowId}
        onRowSelectionModelChange={handleSelectionModelChange}
        checkboxSelection
      />
      <Button
        variant="contained"
        color={props.currentTheme ? "warning" : "primary"}
        fullWidth
        size="large"
        sx={{ mt: 4 }}
        // onClick={handleSubmit}
      >
        Submit Request
      </Button>
    </Box>
  );
}
