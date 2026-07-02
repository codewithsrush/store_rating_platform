import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16a34a",
    },
    secondary: {
      main: "#22c55e",
    },
    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "sans-serif",
    ].join(","),
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.08)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow:
            "0 10px 25px rgba(0,0,0,.08)",
        },
      },
    },
  },
});

export default theme;