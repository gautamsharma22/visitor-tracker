import React,{useContext} from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { TokenContext } from "../../App";
import { UserContext } from "../../App";
import Cookies from "js-cookie";

const NavbarButtons = (props) => {
  const { UserCon, setUserCon } = useContext(UserContext);
  const { jwtToken, setJwtToken } = useContext(TokenContext);
  function handleHoverColor(e) {
    console.log(e.target.style.color)
    e.target.style.color = "#FFC107";
  }
  function handleLogout(e) {
    Cookies.remove("jwttoken", { path: "/" });
    setJwtToken("");
    setUserCon("");
  }
  function handleHoverColorBack(e) {
    e.target.style.color = "#FFFFFF";
  }
  const buttons = [
    {
      key: "Home",
      link: "/Home",
      text: "Home",
      condition: !jwtToken,
    },
    {
      key: "Checkin",
      link: "/Checkin",
      text: "Check In",
      condition: jwtToken && !UserCon.admin,
    },
    {
      key: "Checkout",
      link: "/Checkout",
      text: "Check Out",
      condition: jwtToken && !UserCon.admin,
    },
    {
      key: "AdminPanel",
      link: "/Admin",
      text: "Admin",
      condition: jwtToken && UserCon.admin,
    },
    {
      key: "Register",
      link: "/Register",
      text: "Register",
      condition: jwtToken && UserCon.admin,
    },
    {
      key: "Login",
      link: "/Login",
      text: "Log In",
      condition: !jwtToken,
    },
    {
      key: "Logout",
      link: "/Home",
      text: "Log Out",
      condition: jwtToken,
    },
  ];

  return (
    <>
      {buttons.map(
        (button) =>
          button.condition && (
            <Button key={button.key}>
              <Link
                to={button.link}
                style={{ textDecoration: "none", color: "#fff" ,fontWeight: "bold",}}
                onMouseEnter={handleHoverColor}
                onMouseLeave={handleHoverColorBack}
                onClick={button.key === "Logout" ? handleLogout : undefined}
              >
                {button.text}
              </Link>
            </Button>
          )
      )}
    </>
  );
};

export default NavbarButtons;
