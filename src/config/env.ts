// Environment configuration with validation
const requiredEnvVars = {
  VITE_GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY,
  VITE_GIPHY_BASE_URL: import.meta.env.VITE_GIPHY_BASE_URL,
} as const

// Validate required environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
})

export const env = {
  giphy: {
    apiKey: requiredEnvVars.VITE_GIPHY_API_KEY,
    baseUrl: requiredEnvVars.VITE_GIPHY_BASE_URL,
  },
} as const
