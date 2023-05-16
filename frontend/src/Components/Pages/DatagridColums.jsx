
const Columns = [
    { field: "firstName", headerName: "First Name", width: 150, sortable: false},
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