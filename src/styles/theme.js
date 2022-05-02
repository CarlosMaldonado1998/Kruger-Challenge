import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#F0CA22",
    },
    secondary: {
      main: "#F01509",
    },
    terciary: {
      main: "#95F0B7",
    },
    error: {
      main: red.A400,
    },
    black: {
      main: "#000000",
    },
    textSecondary: "#F01509",
    textTerciary: "#95F0B7",
    textBlack: "#000000",
  },
});

export default theme;
