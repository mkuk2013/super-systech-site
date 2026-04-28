"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

const spikeTheme = createTheme({
  palette: {
    primary: {
      main: "#5D87FF",
      light: "#ECF2FF",
      dark: "#4570EA",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#49BEFF",
      light: "#E8F7FF",
      dark: "#23af15",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F4F6F8",
      paper: "#ffffff",
    },
    text: {
      primary: "#2A3547",
      secondary: "#5A6A85",
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    h1: { fontWeight: 600, fontSize: "2.25rem", lineHeight: 1.2 },
    h2: { fontWeight: 600, fontSize: "1.875rem", lineHeight: 1.2 },
    h3: { fontWeight: 600, fontSize: "1.5rem", lineHeight: 1.2 },
    h4: { fontWeight: 600, fontSize: "1.3125rem", lineHeight: 1.2 },
    h5: { fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.2 },
    h6: { fontWeight: 600, fontSize: "1rem", lineHeight: 1.2 },
    body1: { fontSize: "0.875rem" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
          padding: "8px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.02), 0px 4px 6px -1px rgba(0,0,0,0.02)",
          border: "1px solid #EAEFF4",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
        },
      },
    },
  },
});

export default function ThemeProviderRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={spikeTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
