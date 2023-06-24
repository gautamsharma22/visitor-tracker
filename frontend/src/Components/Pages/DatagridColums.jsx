import React from "react";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
const renderImageCell = (params) => (
  <Avatar
    sx={{
      m: 1,
      bgcolor: "primary",
      height: 60,
      width: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    }}
  >
    {params.value ? (
      <img
        src={params.value}
        alt="Uploaded"
        style={{
          height: 60,
          width: 60,
          borderRadius: "50%",
        }}
      />
    ) : (
      <PersonIcon
        sx={{
          height: 70,
          width: 70,
        }}
      />
    )}
  </Avatar>
);
const Columns = [
  {
    field: "visitorImage",
    headerName: "Image",
    width: 200,
    sortable: false,
    renderCell: renderImageCell,
    
  },
  { field: "firstName", headerName: "First Name", width: 150, sortable: false },
  { field: "lastName", headerName: "Last Name", width: 150, sortable: false },
  {
    field: "visitortype",
    headerName: "Visitor Type",
    width: 200,
    sortable: false,
  },
  {
    field: "phoneNumber",
    headerName: "Contact Number",
    width: 200,
    sortable: false,
  },
  { field: "checkInTime", headerName: "Check In Time", width: 200 },
  { field: "checkOutTime", headerName: "Check Out Time", width: 200 },
];
export default Columns;
