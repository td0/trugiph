import { createFileRoute } from "@tanstack/react-router";
import { Typography, Box, Button, Container, Paper, Fade } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { Home as HomeIcon, Gif as GifIcon } from "@mui/icons-material";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Fade in timeout={800}>
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: 8,
          }}
        >
          {/* Animated 404 with GIF icon */}
          <Box sx={{ position: "relative", mb: 4 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: "8rem", md: "12rem" },
                fontWeight: "bold",
                background: "linear-gradient(45deg, #697AE5 30%, #E56969 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0.9,
                letterSpacing: "-0.05em",
              }}
            >
              404
            </Typography>
            <GifIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3rem",
                color: "primary.main",
                opacity: 0.3,
              }}
            />
          </Box>

          {/* Error message */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              maxWidth: 500,
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Oops! GIF Not Found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              The page you're looking for seems to be missing. It might have
              been moved, deleted, or you may have mistyped the URL.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              Don't worry, there are plenty of amazing GIFs waiting for you on
              our homepage!
            </Typography>
          </Paper>

          {/* Action buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate({ to: "/" })}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1.1rem",
                boxShadow: "0 4px 20px rgba(105, 122, 229, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 25px rgba(105, 122, 229, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Back to Home
            </Button>
          </Box>

          {/* Fun fact */}
          <Box sx={{ mt: 6, opacity: 0.7 }}>
            <Typography variant="caption" color="text.secondary">
              💡 Fun fact: The first GIF was created in 1987 by Steve Wilhite at
              CompuServe
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
}

export const Route = createFileRoute("/$splat")({
  component: NotFoundPage,
});
