import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppBar } from "./components/AppBar";
import { Index } from "./pages";
import { Generate } from "./pages/generate";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <AppBar />
          <header className="App-header">
            <Routes>
              <Route path="/generate" element={<Generate />} />
              <Route path="*" element={<Index />} />
            </Routes>
          </header>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
