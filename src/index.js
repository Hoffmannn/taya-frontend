import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import theme from "./styles/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </Provider>
);

reportWebVitals(console.log);
