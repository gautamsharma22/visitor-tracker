import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#fffffe",
      secondary: "#f8f5f2",
    },
    primary: {
      main: "#094067",
    },
    text: {
      primary: "#232323",
      button: "#fffffe",
    },
    secondary: {
      main: "#3da9fc",
    },
    error: {
      main: "#ef4565",
    },
    warning: {
      main: "#FFC107",
    },
    grey: {
      200: "#90b4ce",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
export default theme;
