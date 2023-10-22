import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Typography, Grid, Box } from "@mui/material";
import { TokenContext } from "../../App";
import { Redirect } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ButtonModal from "../ButtonModal";
const ViewAdmins = () => {
  const [Users, setUsers] = React.useState([{}]);
  const [removeUsers, setremoveUsers] = React.useState(null);
  const { jwtToken } = useContext(TokenContext);
  if (!jwtToken) return <Redirect to="/home" />;
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    fetchData();
  }, []);
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
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:5000/users/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      const dataArray = Object.values(data);
      setUsers(dataArray);
    } catch (err) {
      console.log(err);
    }
  }
  function handleRemove(id) {
    console.log(id);
    setremoveUsers(id);
    setOpen(true);
    fetchData();
  }
  const mappedUsers = Users.map((user) => {
    return (
      <Card
        key={user._id}
        sx={{
          maxWidth: 300,
          minWidth: 300,
          backgroundColor: "background.secondary",
        }}
      >
        <CardContent alignContent="center" justifyContent="center">
          <Avatar
            sx={{
              m: 1,
              height: 80,
              width: 80,
              bgcolor: getRandomColor(),
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              {user.firstName && user.firstName.charAt(0)}
            </Typography>
          </Avatar>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="error" onClick={()=>handleRemove(user._id)}>
            Remove
          </Button>
          <Button size="small" variant="contained">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  });
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
        Showing All Admins
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        justifyContent="center"
        sx={{ gap: 3, flexWrap: "wrap" }}
      >
        {mappedUsers}
      </Box>
      <ButtonModal open={open} setOpen={setOpen} userId={removeUsers}/>
    </Box>
  );
};

export default ViewAdmins;
