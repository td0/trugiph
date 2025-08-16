import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { giphyApi } from "@/services/giphyApi";
import type { GiphySearchParams, GiphyTrendingParams } from "@/types/giphy";
import { GC_TIME, STALE_TIME, giphyKeys } from "@/constant";

/**
 * Hook for fetching trending GIFs
 */
export function useTrendingGifs(params: GiphyTrendingParams = {}) {
  return useQuery({
    queryKey: giphyKeys.trendingList(params),
    queryFn: () => giphyApi.getTrending(params),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

/**
 * Hook for searching GIFs with infinite scroll
 */
export function useSearchGifs(
  query: string,
  params: Omit<GiphySearchParams, "q" | "offset"> = {}
) {
  return useInfiniteQuery({
    queryKey: giphyKeys.searchInfinite(query, params),
    queryFn: ({ pageParam = 0 }) =>
      giphyApi.searchGifs({
        q: query,
        offset: pageParam as number,
        ...params,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      const nextOffset = pagination.offset + pagination.count;
      return nextOffset < pagination.total_count ? nextOffset : undefined;
    },
    enabled: !!query.trim(),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

/**
 * Hook for fetching trending GIFs with infinite scroll
 */
export function useTrendingGifsInfinite(params: GiphyTrendingParams = {}) {
  return useInfiniteQuery({
    queryKey: giphyKeys.trendingInfinite(params),
    queryFn: ({ pageParam = 0 }) =>
      giphyApi.getTrending({
        offset: pageParam as number,
        ...params,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      const nextOffset = pagination.offset + pagination.count;
      return nextOffset < pagination.total_count ? nextOffset : undefined;
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}
