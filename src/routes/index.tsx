import { createFileRoute } from "@tanstack/react-router";
import { Typography, Box, Container } from "@mui/material";
import { useMemo } from "react";
import { VirtualizedMasonryGrid } from "@/components/VirtualizedMasonryGrid";
import { useTrendingGifsInfinite } from "@/hooks/useGiphy";
import { transformGiphyArrayToMasonryItems } from "@/utils/giphyTransform";

function HomePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTrendingGifsInfinite({ limit: 25 });

  const items = useMemo(() => {
    if (!data?.pages) return [];

    const allGifs = data.pages.flatMap((page) => page.data);
    return transformGiphyArrayToMasonryItems(allGifs);
  }, [data]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        <Typography
          component="h3"
          sx={{
            textAlign: "center",
            mb: 2,
            fontStyle: "italic",
            fontSize: {
              xs: "1.75rem", // mobile
              sm: "2rem", // tablet
              md: "2.5rem", // desktop and up
            },
          }}
        >
          Trending GIFs
        </Typography>

        <VirtualizedMasonryGrid
          items={items}
          onLoadMore={handleLoadMore}
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
          gap={16}
        />
      </Container>

      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          {hasNextPage
            ? "💡 Scroll down to load more GIFs automatically"
            : "🎉 You're all caught up"}
        </Typography>
      </Box>
    </Box>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
