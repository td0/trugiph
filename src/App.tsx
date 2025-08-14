import { Typography, Container } from '@mui/material';
import { QueryProvider, ThemeProvider } from './providers';

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Container>
          <Typography variant="h1" component="h1" sx={{ textAlign: 'center', mt: 4 }}>
            TruGiph
          </Typography>
        </Container>
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App
