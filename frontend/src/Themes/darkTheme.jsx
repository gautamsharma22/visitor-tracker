import { createTheme } from "@mui/material/styles";
// primary for main secondary for dark
const theme = createTheme({
  palette: {
    background: {
      default: "#16161a",
      secondary: "#242629",
    },
    text: {
      primary: "#fffffe",
      secondary: "#94a1b2",
    },
    primary: {
      main: "#7f5af0",
      contrastText: "#fffffe",
    },
    secondary: {
      main: "#72757e",
    },
    tertiary: {
      main: "#2cb67d",
    },
    error: {
      main: "#f44336",
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
