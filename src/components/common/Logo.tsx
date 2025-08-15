import { Box, Typography, type TypographyProps } from "@mui/material";

type LogoProps = TypographyProps;

export function Logo(props: LogoProps) {
  return (
    <Typography
      variant={props.variant || "h5"}
      component="h1"
      sx={{
        fontFamily: "'Space Mono', monospace",
        fontStyle: "italic",
        fontWeight: "bold",
        display: "inline",
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
