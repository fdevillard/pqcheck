import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppBar } from "./components/AppBar";
import { Index } from "./pages";
import { Generate } from "./pages/generate";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Settings } from "./pages/settings";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type SettingsStore = {
  // we store the index in the list of device. At least firefox hides the deviceId when the camera is not activated.
  deviceIndex: number;
};

const LOCALSTORAGE_DEVICEINDEX_KEY = "settings-deviceIndex";

function App() {
  const [settings, setSettings] = React.useState<SettingsStore>({
    deviceIndex: Number(localStorage.getItem(LOCALSTORAGE_DEVICEINDEX_KEY) || 0),
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <header>
            <AppBar />
          </header>
          <main className="App-main">
            <Routes>
              <Route path="/generate" element={<Generate />} />
              <Route
                path="/settings"
                element={
                  <Settings
                    deviceIndex={settings.deviceIndex}
                    onSelectDeviceIndex={(nDeviceID: number) => {
                      localStorage.setItem(
                        LOCALSTORAGE_DEVICEINDEX_KEY,
                        String(nDeviceID)
                      );
                      setSettings((prev) => ({ ...prev, deviceId: nDeviceID }));
                    }}
                  />
                }
              />
              <Route
                path="*"
                element={<Index deviceIndex={settings.deviceIndex} />}
              />
            </Routes>
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
