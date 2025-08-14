import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from "@mui/material";
import { type ReactNode } from "react";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
  typography: {
    fontFamily: '"Space Mono", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
        },
        body: {
          transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
        },
      },
    },
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
