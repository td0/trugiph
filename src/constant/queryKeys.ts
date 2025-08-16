import type { GiphySearchParams, GiphyTrendingParams } from '@/types/giphy'

/**
 * TanStack Query key factory for Giphy API
 * Provides consistent and type-safe query keys across the application
 */
export const giphyKeys = {
  // Base key for all Giphy queries
  all: ['giphy'] as const,
  
  // Trending queries
  trending: () => [...giphyKeys.all, 'trending'] as const,
  trendingList: (params: GiphyTrendingParams) => [...giphyKeys.trending(), 'list', params] as const,
  trendingInfinite: (params: GiphyTrendingParams) => [...giphyKeys.trending(), 'infinite', params] as const,
  
  // Search queries
  search: () => [...giphyKeys.all, 'search'] as const,
  searchList: (query: string, params: Omit<GiphySearchParams, 'q' | 'offset'>) => 
    [...giphyKeys.search(), 'list', query, params] as const,
  searchInfinite: (query: string, params: Omit<GiphySearchParams, 'q' | 'offset'>) => 
    [...giphyKeys.search(), 'infinite', query, params] as const,
} as const

/**
 * Query key factory utilities for cache invalidation
 */
export const giphyQueryUtils = {
  // Invalidate all Giphy queries
  invalidateAll: () => giphyKeys.all,
  
  // Invalidate all trending queries
  invalidateAllTrending: () => giphyKeys.trending(),
  
  // Invalidate all search queries
  invalidateAllSearch: () => giphyKeys.search(),
  
  // Invalidate specific search query
  invalidateSearch: (query: string) => [...giphyKeys.search(), 'list', query],
} as const
