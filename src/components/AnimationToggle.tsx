import { IconButton, type IconButtonProps } from "@mui/material";
import { PlayArrow as PlayIcon, Pause as PauseIcon } from "@mui/icons-material";
import { useAtom } from "jotai";
import { animationToggleAtom } from "@/stores";

export function AnimationToggle(prop: IconButtonProps) {
  const [isPaused, toggleAnimation] = useAtom(animationToggleAtom);

  return (
    <IconButton size="small" onClick={toggleAnimation} {...prop}>
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
