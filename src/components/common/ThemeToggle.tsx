import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";

export function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const isDarkMode = mode === "dark";

  if (!mode) {
    return null;
  }

  const handleToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <IconButton
      onClick={handleToggle}
      color="inherit"
      aria-label="toggle theme"
      size="medium"
      sx={{ position: "relative" }}
    >
      <DarkMode
        sx={{
          position: "absolute",
          transition: "all 0.3s ease-in-out",
          transform: !isDarkMode
            ? "rotate(360deg) scale(0)"
            : "rotate(0deg) scale(1)",
        }}
      />
      <LightMode
        sx={{
          position: "absolute",
          transition: "all 0.3s ease-in-out",
          transform: isDarkMode
            ? "rotate(-360deg) scale(0)"
            : "rotate(0deg) scale(1)",
        }}
      />
    </IconButton>
  );
}
