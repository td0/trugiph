import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryProvider, ThemeProvider } from "./providers";
import { Provider as JotaiProvider } from "jotai";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
  routeTree,
  // Respect GitHub Pages subpath (e.g., /trugiph/)
  basepath: import.meta.env.BASE_URL,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <JotaiProvider>
      <QueryProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryProvider>
    </JotaiProvider>
  );
}

export default App;
