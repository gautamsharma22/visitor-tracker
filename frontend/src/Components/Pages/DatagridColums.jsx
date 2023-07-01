import React from "react";
import { Avatar } from "@mui/material";
const colors = [
  "#ff8906",
  "#3da9fc",
  "#e53170",
  "#f25f4c",
  "#a786df",
  "#2cb67d",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const renderImageCell = (params) => (
  <Avatar
    sx={{
      m: 1,
      bgcolor: getRandomColor(),
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
    ) : params.row.firstName.charAt(0)}
  </Avatar>
);
const Columns = [
  {
    field: "visitorImage",
    headerName: "Image",
    width: 100,
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
