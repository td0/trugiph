import { createFileRoute } from '@tanstack/react-router'
import { Typography, Box } from '@mui/material'

function HomePage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{ textAlign: "center" }}
      >
        FIRST11 Welcome to TruGiph
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", mt: 2, opacity: 0.7 }}
      >
        Discover and share amazing GIFs
      </Typography>
      
      {/* Mock content for viewport scrolling */}
      {Array.from({ length: 50 }, (_, i) => (
        <Box key={i} sx={{ my: 4, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Mock GIF Collection #{i + 1}
          </Typography>
          <Typography variant="body1" paragraph>
            This is mock content to demonstrate scrolling behavior. In a real app, this would be 
            actual GIF cards with images, titles, and metadata. Each card would be interactive 
            and lead to detailed views or sharing options.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tags: funny, reaction, meme, trending, popular, viral, animated, gif, entertainment, social
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Typography variant="caption">👍 {Math.floor(Math.random() * 1000)} likes</Typography>
            <Typography variant="caption">💬 {Math.floor(Math.random() * 100)} comments</Typography>
            <Typography variant="caption">🔄 {Math.floor(Math.random() * 500)} shares</Typography>
          </Box>
        </Box>
      ))}
      
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          End of mock content - scroll up to test AppBar behavior
        </Typography>
      </Box>
    </Box>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
})
