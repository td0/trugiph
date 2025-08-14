import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { ThemeToggle } from "./ThemeToggle";

export function AppBar() {
  return (
    <MuiAppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              fontFamily="inherit"
              fontStyle="italic"
              sx={{ fontWeight: 400 }}
            >
              TruGiph
            </Typography>
          </Box>
          <ThemeToggle />
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}
