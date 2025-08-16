export const giphyApi = {
  searchGifs: jest.fn(() => Promise.resolve({ data: [], pagination: { total_count: 0, count: 0, offset: 0 } })),
  getTrending: jest.fn(() => Promise.resolve({ data: [], pagination: { total_count: 0, count: 0, offset: 0 } })),
};
