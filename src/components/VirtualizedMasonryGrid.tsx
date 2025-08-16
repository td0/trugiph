import { useRef, useEffect, useCallback } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { Box, useTheme, useMediaQuery, useColorScheme } from "@mui/material";
import { ImageWithSkeleton } from "./ImageWithSkeleton";

export interface MasonryItem {
  id: string;
  imageUrl: string;
  staticImageUrl: string;
  width: number;
  height: number;
  title?: string;
}

interface VirtualizedMasonryGridProps {
  items: MasonryItem[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
  gap?: number;
}

export function VirtualizedMasonryGrid({
  items,
  onLoadMore,
  hasNextPage = false,
  isLoading = false,
  gap = 16,
}: VirtualizedMasonryGridProps) {
  const theme = useTheme();
  const { mode: colorMode } = useColorScheme();
  const isDarkMode = colorMode === "dark";
  const listRef = useRef<HTMLDivElement>(null);

  // Responsive column count
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  const columnCount = isXs ? 1 : isSm ? 2 : isMd ? 3 : 4;

  // Calculate estimated height for each item based on aspect ratio
  const getEstimatedSize = useCallback(
    (index: number) => {
      const item = items[index];
      if (!item) return 200; // fallback height

      // For window virtualizer, we need to estimate based on viewport width
      const viewportWidth = window.innerWidth;
      const containerWidth = Math.min(viewportWidth - 48, 1536); // max-width xl with padding
      const availableWidth = containerWidth - gap * (columnCount - 1);
      const columnWidth = availableWidth / columnCount;

      // Calculate height based on aspect ratio
      const aspectRatio = item.height / item.width;
      const estimatedHeight = columnWidth * aspectRatio;

      return Math.max(estimatedHeight, 100); // minimum height of 100px
    },
    [items, columnCount, gap]
  );

  const rowVirtualizer = useWindowVirtualizer({
    count: items.length,
    estimateSize: getEstimatedSize,
    overscan: 10,
    lanes: columnCount,
    gap,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  // Force re-render when column count changes
  useEffect(() => {
    rowVirtualizer.measure();
  }, [columnCount, rowVirtualizer]);

  // Infinite scroll detection for window scrolling
  useEffect(() => {
    if (!onLoadMore || !hasNextPage || isLoading) return;

    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      const scrollPercentage = (scrollY + innerHeight) / scrollHeight;

      // Load more when 80% scrolled
      if (scrollPercentage > 0.8) {
        onLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onLoadMore, hasNextPage, isLoading]);

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <Box
      ref={listRef}
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const item = items[virtualItem.index];
          if (!item) return null;

          const columnWidth = `${100 / columnCount}%`;
          const leftPosition = `${(virtualItem.lane / columnCount) * 100}%`;

          return (
            <Box
              key={item.id}
              sx={{
                position: "absolute",
                top: 0,
                left: leftPosition,
                width: columnWidth,
                height: `${virtualItem.size}px`,
                transform: `translateY(${
                  virtualItem.start - rowVirtualizer.options.scrollMargin
                }px)`,
                padding: `${gap / 2}px`,
                boxSizing: "border-box",
              }}
            >
              <ImageWithSkeleton
                src={item.imageUrl}
                srcStatic={item.staticImageUrl}
                alt={item.title || `Image ${virtualItem.index}`}
                width="100%"
                height="100%"
                borderRadius={2}
                title={item.title}
              />
            </Box>
          );
        })}

        {/* Loading indicator */}
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: isDarkMode
                ? "rgba(26, 29, 41, 0.3)"
                : "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              borderRadius: 10,
              p: 2,
              color: "text.secondary",
            }}
          >
            Loading more...
          </Box>
        )}
      </Box>
    </Box>
  );
}
