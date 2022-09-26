import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#007f00",
    },
    secondary: {
      main: "#7f007f",
    },
    // myCustomColor: {
    //   main: red[400],
    //   superDark: red[800],
    //   superLight: red[100],
    // },
  },
  // typography: {
  //   myVariant: {
  //     fontSize: "6rem",
  //     color: orange[500],
  //   },
  // },
});

export default theme;
