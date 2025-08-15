import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from "@mui/material";
import { type ReactNode } from "react";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#697AE5",
          light: "#8B9AFF",
          dark: "#4A5BB8",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#E56969", // Complementary red-orange
          light: "#FF8B8B",
          dark: "#B84A4A",
          contrastText: "#FFFFFF",
        },
        success: {
          main: "#69E597", // Triadic green
          light: "#8BFFA8",
          dark: "#4AB86A",
          contrastText: "#000000",
        },
        warning: {
          main: "#E5C569", // Triadic yellow-orange
          light: "#FFD78B",
          dark: "#B8984A",
          contrastText: "#000000",
        },
        info: {
          main: "#69D4E5", // Analogous cyan
          light: "#8BE5FF",
          dark: "#4AA7B8",
          contrastText: "#000000",
        },
        background: {
          default: "#FAFBFF",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#1A1D29",
          secondary: "#4A5568",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#8B9AFF",
          light: "#B8C4FF",
          dark: "#697AE5",
          contrastText: "#000000",
        },
        secondary: {
          main: "#FF8B8B",
          light: "#FFB8B8",
          dark: "#E56969",
          contrastText: "#000000",
        },
        success: {
          main: "#8BFFA8",
          light: "#B8FFD4",
          dark: "#69E597",
          contrastText: "#000000",
        },
        warning: {
          main: "#FFD78B",
          light: "#FFE5B8",
          dark: "#E5C569",
          contrastText: "#000000",
        },
        info: {
          main: "#8BE5FF",
          light: "#B8F2FF",
          dark: "#69D4E5",
          contrastText: "#000000",
        },
        background: {
          default: "#0F1419",
          paper: "#1A1D29",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B8C4D6",
        },
      },
    },
  },
  typography: {
    fontFamily: '"Space Mono", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition:
            "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
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
