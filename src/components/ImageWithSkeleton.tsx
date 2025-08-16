import { useState } from "react";
import { Box, Skeleton, Snackbar, useColorScheme } from "@mui/material";
import { createPortal } from "react-dom";
import { useAtomValue } from "jotai";
import { animationPausedAtom } from "@/stores/animationStore";
import { copyImageWithFallback } from "@/utils/clipboardUtils";

interface ImageWithSkeletonProps {
  src: string;
  srcStatic: string;
  alt: string;
  width: string;
  height: string;
  borderRadius?: number;
  title?: string;
}

export function ImageWithSkeleton({
  src,
  srcStatic,
  alt,
  width,
  height,
  borderRadius = 2,
  title,
}: ImageWithSkeletonProps) {
  const { mode: colorMode } = useColorScheme();
  const isDarkMode = colorMode === "dark";
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const animationPaused = useAtomValue(animationPausedAtom);

  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    try {
      await copyImageWithFallback(src, srcStatic, animationPaused);
      setOpen(true);
    } catch (error) {
      console.error('Failed to copy:', error);
      setOpen(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width,
        height,
        transition: "transform 0.2s ease-in-out",
        userSelect: "none",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
      onClick={handleClick}
    >
      {/* Skeleton loader */}
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{
            borderRadius,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}

      {/* Actual image */}
      <Box
        component="img"
        src={
          hasError
            ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+"
            : animationPaused
            ? srcStatic
            : src
        }
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        sx={{
          userSelect: "none",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius,
          cursor: "pointer",
          opacity: isLoaded ? 1 : 0,
        }}
      />

      {/* Title overlay */}
      {title && isLoaded && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            color: "white",
            p: 1,
            borderRadius: `0 0 ${borderRadius * 4}px ${borderRadius * 4}px`,
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          {title}
        </Box>
      )}

      {/* Snackbar for copy feedback - rendered to viewport via portal */}
      {createPortal(
        <Snackbar
          open={open}
          color={isDarkMode ? "black" : "white"}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setOpen(false)}
          message="Copied to clipboard"
        />,
        document.body
      )}
    </Box>
  );
}
