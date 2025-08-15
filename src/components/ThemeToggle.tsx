import { IconButton, type IconButtonProps } from "@mui/material";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";

export function ThemeToggle(prop: IconButtonProps) {
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
      size="small"
      onClick={handleToggle}
      aria-label="toggle theme"
      {...prop}
    >
      <DarkModeIcon
        fontSize="small"
        sx={{
          transition: "transform 0.5s ease-in-out",
          transform: !isDarkMode
            ? "rotate(-720deg) scale(0)"
            : "rotate(0deg) scale(1)",
        }}
      />
      <LightModeIcon
        fontSize="small"
        sx={{
          position: "absolute",
          transition: "transform 0.5s ease-in-out",
          transform: isDarkMode
            ? "rotate(720deg) scale(0)"
            : "rotate(0deg) scale(1)",
        }}
      />
    </IconButton>
  );
}
