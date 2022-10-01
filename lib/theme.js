import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      light: "#6fbf73",
      main: "#4caf50",
      dark: "#357a38",
      contrastText: "#fff",
    },
    secondary: {
      light: "#91ff35",
      main: "#76ff03",
      dark: "#52b202",
      contrastText: "#000",
    },
    // error: {},
    // warning: {},
    // info: {},
    // success: {},
    categoryBar: {
      light: "#5fa463",
      main: "#388e3c",
      dark: "#27632a",
      contrastText: "#fff",
    },
    categoryText: {
      main: "#000",
    },
  },
});

export default theme;
