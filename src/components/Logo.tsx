import { Box, Typography, type TypographyProps } from "@mui/material";
import { useNavigate, useLocation } from "@tanstack/react-router";

type LogoProps = TypographyProps;

export function Logo(props: LogoProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnHomePage = location.pathname === "/";

  const handleClick = () => {
    if (!isOnHomePage) {
      navigate({ to: "/" });
    }
  };

  return (
    <Typography
      variant={props.variant || "h5"}
      component="h1"
      onClick={handleClick}
      sx={{
        fontFamily: "'Space Mono', monospace",
        fontStyle: "italic",
        fontWeight: "bold",
        display: "inline",
        cursor: isOnHomePage ? "default" : "pointer",
        opacity: isOnHomePage ? 1 : 0.9,
        transition: "all 0.2s ease",
        userSelect: "none",
        ...props.sx,
      }}
    >
      <Box
        component="span"
        sx={{
          color: "text.primary",
        }}
      >
        Tru
      </Box>
      <Box
        component="span"
        sx={{
          background: "linear-gradient(45deg, #697AE5, #7373E6)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Giph
      </Box>
    </Typography>
  );
}
