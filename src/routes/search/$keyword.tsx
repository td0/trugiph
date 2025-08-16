import { createFileRoute } from "@tanstack/react-router";
import { Typography, Box, Container, CircularProgress } from "@mui/material";
import { useMemo } from "react";
import { VirtualizedMasonryGrid } from "@/components/VirtualizedMasonryGrid";
import { useSearchGifs } from "@/hooks/useGiphy";
import { transformGiphyArrayToMasonryItems } from "@/utils/giphyTransform";
import type { GiphyResponse } from "@/types/giphy";

function SearchPage() {
  const { keyword } = Route.useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useSearchGifs(keyword, { limit: 25 });

  const items = useMemo(() => {
    if (!data?.pages) return [];

    const allGifs = data.pages.flatMap((page: GiphyResponse) => page.data);
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
          variant="h2"
          component="h1"
          sx={{ textAlign: "center", mb: 1, fontStyle: "italic" }}
        >
          Search Results
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{ textAlign: "center", mb: 4, color: "text.secondary" }}
        >
          "{keyword}"
        </Typography>

        {isPending ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <CircularProgress size={48} sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Searching for "{keyword}"...
            </Typography>
          </Box>
        ) : items.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No GIFs found for "{keyword}"
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try searching for something else
            </Typography>
          </Box>
        ) : (
          <VirtualizedMasonryGrid
            items={items}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            gap={16}
          />
        )}
      </Container>

      {items.length > 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            💡 Scroll down to load more search results
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export const Route = createFileRoute("/search/$keyword")({
  component: SearchPage,
  parseParams: (params) => ({
    keyword: decodeURIComponent(params.keyword),
  }),
  stringifyParams: (params) => ({
    keyword: encodeURIComponent(params.keyword),
  }),
});
