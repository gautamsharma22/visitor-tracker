import React, { useState,useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { TokenContext } from "../../App";
import { Redirect } from "react-router-dom";

const columns = [
  { field: "firstName", headerName: "First Name", width: 200, sortable: false },
  { field: "lastName", headerName: "Last Name", width: 200, sortable: false },
  {
    field: "visitortype",
    headerName: "Visitor Type",
    width: 200,
    sortable: false,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 200,
    sortable: false,
  },
  {
    field: "aadharNumber",
    headerName: "Aadhar Number",
    width: 200,
    sortable: false,
  },
  { field: "checkInTime", headerName: "Check In Time", width: 200 },
];

export default function DataTable() {
  const [Requests, setRequests] = useState([]);
  const { jwtToken} = useContext(TokenContext);
  if (!jwtToken) return <Redirect to="/home" />;
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
        console.log("hellopp")
    setSelectedRows(selectionModel);
    if (selectionModel.length > 0) {
      const selectedRow = Requests.find((row) => row._id === selectionModel[0]);
      console.log("Selected Row:", selectedRow);
    }
    };

  return (
    <Box
      sx={{
        my: 4,
        mx: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DataGrid
        rows={Requests}
        columns={columns}
        getRowId={getRowId}
        onRowSelectionModelChange={handleSelectionModelChange}
        checkboxSelection
      />
    </Box>
  );
}
