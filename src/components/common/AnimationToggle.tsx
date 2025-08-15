import { IconButton, type IconButtonProps } from "@mui/material";
import { PlayArrow as PlayIcon, Pause as PauseIcon } from "@mui/icons-material";
import { useState } from "react";

export default function AnimationToggle(prop: IconButtonProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <IconButton size="small" onClick={() => setIsPaused(!isPaused)} {...prop}>
      <PlayIcon
        fontSize="small"
        sx={{
          transition: "transform 0.3s ease-in-out",
          transform: !isPaused
            ? "rotate(-180deg) scale(0)"
            : "rotate(0deg) scale(1)",
        }}
      />
      <PauseIcon
        fontSize="small"
        sx={{
          position: "absolute",
          transition: "transform 0.3s ease-in-out",
          transform: isPaused
            ? "rotate(180deg) scale(0)"
            : "rotate(0deg) scale(1)",
        }}
      />
    </IconButton>
  );
}
