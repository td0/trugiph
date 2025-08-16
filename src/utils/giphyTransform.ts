import type { GiphyGif } from "@/types/giphy";
import type { MasonryItem } from "@/components/VirtualizedMasonryGrid";

/**
 * Transform Giphy API response to MasonryItem format
 */
export function transformGiphyToMasonryItem(gif: GiphyGif): MasonryItem {
  // Use fixed_width for consistent loading and good quality
  const image = gif.images.fixed_width;

  return {
    id: gif.id,
    imageUrl: image.url,
    staticImageUrl: gif.images.fixed_width_still.url,
    width: parseInt(image.width),
    height: parseInt(image.height),
    title: gif.title || `GIF by ${gif.username || "Anonymous"}`,
  };
}

/**
 * Transform array of Giphy GIFs to MasonryItems
 */
export function transformGiphyArrayToMasonryItems(
  gifs: GiphyGif[]
): MasonryItem[] {
  return gifs.map(transformGiphyToMasonryItem);
}
