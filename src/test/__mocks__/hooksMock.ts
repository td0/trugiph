export const useSearchGifs = jest.fn(() => ({
  data: { pages: [] },
  isLoading: false,
  isError: false,
  error: null,
  fetchNextPage: jest.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
}));

export const useTrendingGifs = jest.fn(() => ({
  data: { data: [] },
  isLoading: false,
  isError: false,
  error: null,
}));

export const useGiphy = jest.fn(() => ({
  searchGifs: jest.fn(),
  getTrending: jest.fn(),
}));
