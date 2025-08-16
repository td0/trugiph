/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "@tanstack/react-router";
import { Router, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchGifs } from "@/hooks/useGiphy";
import { transformGiphyArrayToMasonryItems } from "@/utils/giphyTransform";
import { routeTree } from "../../../routeTree.gen";
import "@testing-library/jest-dom";
// Avoid importing app types in tests to reduce coupling

// Mock dependencies
jest.mock("@/hooks/useGiphy", () => ({
  useSearchGifs: jest.fn(),
}));
jest.mock("@/utils/giphyTransform", () => ({
  transformGiphyArrayToMasonryItems: jest.fn(),
}));
jest.mock("@/components/VirtualizedMasonryGrid", () => ({
  VirtualizedMasonryGrid: ({
    items,
    onLoadMore,
    hasNextPage,
    isLoading,
  }: any) => (
    <div data-testid="masonry-grid">
      <div data-testid="items-count">{items.length}</div>
      <div data-testid="has-next-page">{hasNextPage.toString()}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <button onClick={onLoadMore} data-testid="load-more">
        Load More
      </button>
    </div>
  ),
}));

const mockUseSearchGifs = useSearchGifs as jest.MockedFunction<
  typeof useSearchGifs
>;
const mockTransformGiphyArrayToMasonryItems =
  transformGiphyArrayToMasonryItems as jest.MockedFunction<
    typeof transformGiphyArrayToMasonryItems
  >;

const createTestRouter = (initialLocation = "/search/cats") => {
  const history = createMemoryHistory({
    initialEntries: [initialLocation],
  });

  return new Router({
    routeTree,
    history,
  });
};

const renderWithProviders = (initialLocation = "/search/cats") => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const router = createTestRouter(initialLocation);

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

describe("SearchPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTransformGiphyArrayToMasonryItems.mockReturnValue([]);
  });

  describe("Loading State", () => {
    it("shows loading spinner when search is pending", () => {
      mockUseSearchGifs.mockReturnValue({
        data: undefined,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: true,
        isError: false,
        error: null,
      });

      renderWithProviders("/search/cats");

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      expect(screen.getByText('Searching for "cats"...')).toBeInTheDocument();
    });

    it("displays the search keyword in loading message", () => {
      mockUseSearchGifs.mockReturnValue({
        data: undefined,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: true,
        isError: false,
        error: null,
      } as any);

      renderWithProviders("/search/funny%20dogs");

      expect(
        screen.getByText('Searching for "funny dogs"...')
      ).toBeInTheDocument();
    });
  });

  describe("Empty Results", () => {
    it("shows empty state when no results found", () => {
      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [] }] },
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue([]);

      renderWithProviders("/search/nonexistent");

      expect(
        screen.getByText('No GIFs found for "nonexistent"')
      ).toBeInTheDocument();
      expect(
        screen.getByText("Try searching for something else")
      ).toBeInTheDocument();
    });

    it("does not show masonry grid when no results", () => {
      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [] }] },
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue([]);

      renderWithProviders("/search/empty");

      expect(screen.queryByTestId("masonry-grid")).not.toBeInTheDocument();
    });
  });

  describe("Results Display", () => {
    const mockItems = [
      {
        id: "1",
        imageUrl: "gif1.gif",
        staticImageUrl: "gif1_s.gif",
        width: 200,
        height: 150,
        title: "GIF 1",
      },
      {
        id: "2",
        imageUrl: "gif2.gif",
        staticImageUrl: "gif2_s.gif",
        width: 180,
        height: 200,
        title: "GIF 2",
      },
    ];

    it("shows search results when data is available", () => {
      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [{ id: "1" }, { id: "2" }] }] },
        fetchNextPage: jest.fn(),
        hasNextPage: true,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue(mockItems);

      renderWithProviders("/search/cats");

      expect(screen.getByText("Search Results")).toBeInTheDocument();
      expect(screen.getByText('"cats"')).toBeInTheDocument();
      expect(screen.getByTestId("masonry-grid")).toBeInTheDocument();
      expect(screen.getByTestId("items-count")).toHaveTextContent("2");
    });

    it("shows scroll hint when results are available", () => {
      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [{ id: "1" }] }] },
        fetchNextPage: jest.fn(),
        hasNextPage: true,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue(mockItems);

      renderWithProviders("/search/cats");

      expect(
        screen.getByText("💡 Scroll down to load more search results")
      ).toBeInTheDocument();
    });

    it("does not show scroll hint when no results", () => {
      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [] }] },
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue([]);

      renderWithProviders("/search/empty");

      expect(
        screen.queryByText("💡 Scroll down to load more search results")
      ).not.toBeInTheDocument();
    });
  });

  describe("Infinite Scrolling", () => {
    it("passes correct props to masonry grid", () => {
      const mockFetchNextPage = jest.fn();
      const mockItems = [
        {
          id: "1",
          src: "gif1.gif",
          srcStatic: "gif1_s.gif",
          alt: "GIF 1",
          width: "200px",
          height: "150px",
        },
      ];

      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [{ id: "1" }] }] },
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue(mockItems);

      renderWithProviders("/search/cats");

      expect(screen.getByTestId("has-next-page")).toHaveTextContent("true");
      expect(screen.getByTestId("is-loading")).toHaveTextContent("false");
    });

    it("calls fetchNextPage when load more is triggered", () => {
      const mockFetchNextPage = jest.fn();
      const mockItems = [
        {
          id: "1",
          src: "gif1.gif",
          srcStatic: "gif1_s.gif",
          alt: "GIF 1",
          width: "200px",
          height: "150px",
        },
      ];

      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [{ id: "1" }] }] },
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue(mockItems);

      renderWithProviders("/search/cats");

      const loadMoreButton = screen.getByTestId("load-more");
      fireEvent.click(loadMoreButton);

      expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
    });

    it("does not call fetchNextPage when no more pages available", () => {
      const mockFetchNextPage = jest.fn();
      const mockItems = [
        {
          id: "1",
          src: "gif1.gif",
          srcStatic: "gif1_s.gif",
          alt: "GIF 1",
          width: "200px",
          height: "150px",
        },
      ];

      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [{ id: "1" }] }] },
        fetchNextPage: mockFetchNextPage,
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue(mockItems);

      renderWithProviders("/search/cats");

      const loadMoreButton = screen.getByTestId("load-more");
      fireEvent.click(loadMoreButton);

      expect(mockFetchNextPage).not.toHaveBeenCalled();
    });

    it("does not call fetchNextPage when already fetching", () => {
      const mockFetchNextPage = jest.fn();
      const mockItems = [
        {
          id: "1",
          src: "gif1.gif",
          srcStatic: "gif1_s.gif",
          alt: "GIF 1",
          width: "200px",
          height: "150px",
        },
      ];

      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [{ id: "1" }] }] },
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: true,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue(mockItems);

      renderWithProviders("/search/cats");

      const loadMoreButton = screen.getByTestId("load-more");
      fireEvent.click(loadMoreButton);

      expect(mockFetchNextPage).not.toHaveBeenCalled();
    });
  });

  describe("Data Transformation", () => {
    it("transforms multiple pages of data correctly", () => {
      const mockData = {
        pages: [
          { data: [{ id: "1" }, { id: "2" }] },
          { data: [{ id: "3" }, { id: "4" }] },
        ],
      };

      mockUseSearchGifs.mockReturnValue({
        data: mockData,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      const mockItems = [
        {
          id: "1",
          imageUrl: "gif1.gif",
          staticImageUrl: "gif1_s.gif",
          width: 200,
          height: 150,
          title: "GIF 1",
        },
        {
          id: "2",
          imageUrl: "gif2.gif",
          staticImageUrl: "gif2_s.gif",
          width: 180,
          height: 200,
          title: "GIF 2",
        },
        {
          id: "3",
          imageUrl: "gif3.gif",
          staticImageUrl: "gif3_s.gif",
          width: 220,
          height: 180,
          title: "GIF 3",
        },
        {
          id: "4",
          imageUrl: "gif4.gif",
          staticImageUrl: "gif4_s.gif",
          width: 190,
          height: 160,
          title: "GIF 4",
        },
      ];

      mockTransformGiphyArrayToMasonryItems.mockReturnValue(mockItems);

      renderWithProviders("/search/cats");

      expect(mockTransformGiphyArrayToMasonryItems).toHaveBeenCalledWith([
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
      ]);

      expect(screen.getByTestId("items-count")).toHaveTextContent("4");
    });

    it("handles undefined data gracefully", () => {
      mockUseSearchGifs.mockReturnValue({
        data: undefined,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue([]);

      renderWithProviders("/search/cats");

      expect(mockTransformGiphyArrayToMasonryItems).toHaveBeenCalledWith([]);
      expect(screen.getByText('No GIFs found for "cats"')).toBeInTheDocument();
    });

    it("handles data without pages gracefully", () => {
      mockUseSearchGifs.mockReturnValue({
        data: { pages: undefined },
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      mockTransformGiphyArrayToMasonryItems.mockReturnValue([]);

      renderWithProviders("/search/cats");

      expect(mockTransformGiphyArrayToMasonryItems).toHaveBeenCalledWith([]);
      expect(screen.getByText('No GIFs found for "cats"')).toBeInTheDocument();
    });
  });

  describe("URL Parameter Handling", () => {
    it("decodes URL-encoded search keywords", () => {
      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [] }] },
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      renderWithProviders("/search/funny%20cats");

      expect(screen.getByText('"funny cats"')).toBeInTheDocument();
    });

    it("handles special characters in search keywords", () => {
      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [] }] },
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      renderWithProviders("/search/cats%20%26%20dogs");

      expect(screen.getByText('"cats & dogs"')).toBeInTheDocument();
    });
  });

  describe("Hook Integration", () => {
    it("calls useSearchGifs with correct parameters", () => {
      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [] }] },
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      renderWithProviders("/search/cats");

      expect(mockUseSearchGifs).toHaveBeenCalledWith("cats", { limit: 25 });
    });

    it("calls useSearchGifs with decoded keyword", () => {
      mockUseSearchGifs.mockReturnValue({
        data: { pages: [{ data: [] }] },
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isPending: false,
        isError: false,
        error: null,
      } as any);

      renderWithProviders("/search/funny%20dogs");

      expect(mockUseSearchGifs).toHaveBeenCalledWith("funny dogs", {
        limit: 25,
      });
    });
  });
});
