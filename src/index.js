import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./components/App";
import theme from "./styles/theme";
import { AuthProvider } from "./lib/auth";
import { SnackbarProvider } from "notistack";
import * as ReactDOMClient from "react-dom/client";
const container = document.querySelector("#root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <SnackbarProvider maxSnack={3}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </SnackbarProvider>
);
