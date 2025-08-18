import { IconButton, type IconButtonProps } from "@mui/material";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";

export function ThemeToggle(prop: IconButtonProps) {
  const { mode, setMode, systemMode } = useColorScheme();
  const isDarkMode =
    mode === "dark" || (mode === "system" && systemMode === "dark");

  if (!mode) {
    return null;
  }

  const handleToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <IconButton
      size="small"
      onClick={handleToggle}
      aria-label="toggle theme"
      {...prop}
    >
      <LightModeIcon
        fontSize="small"
        sx={{
          transition: "transform 0.5s ease-in-out",
          transform: !isDarkMode
            ? "rotate(-270deg) scale(0)"
            : "rotate(0deg) scale(1)",
        }}
      />
      <DarkModeIcon
        fontSize="small"
        sx={{
          position: "absolute",
          transition: "transform 0.5s ease-in-out",
          transform: isDarkMode
            ? "rotate(270deg) scale(0)"
            : "rotate(0deg) scale(1)",
        }}
      />
    </IconButton>
  );
}
