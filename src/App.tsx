import { Container, Typography } from "@mui/material";
import { QueryProvider, ThemeProvider } from "./providers";
import { MainLayout } from "./layout";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <MainLayout>
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center" }}
            >
              Welcome to TruGiph
            </Typography>
          </Container>
        </MainLayout>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
