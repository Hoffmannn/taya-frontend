import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import theme from "./styles/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ptBR } from "date-fns/locale";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </Provider>
);

reportWebVitals(console.log);
