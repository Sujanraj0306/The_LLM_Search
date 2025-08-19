import React from "react";
import { ThemeProvider, createTheme, Box } from "@mui/material";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import MainContent from "./components/MainContent";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#131314",
      paper: "#1e1f20",
    },
    text: {
      primary: "#e8eaed",
      secondary: "#bdc1c6",
    },
  },
  typography: {
    fontFamily: "Google Sans, Arial, sans-serif",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Google Sans, Arial, sans-serif",
        }}
      >
        <Header />
        <Box sx={{ display: "flex", flexGrow: 1, position: "relative" }}>
          <SideMenu />
          <MainContent />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
