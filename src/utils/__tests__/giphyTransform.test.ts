import { transformGiphyToMasonryItem, transformGiphyArrayToMasonryItems } from '../giphyTransform';
import type { GiphyGif } from '@/types/giphy';

const mockGiphyGif: GiphyGif = {
  type: 'gif',
  id: 'test123',
  url: 'https://giphy.com/gifs/test123',
  slug: 'test-gif',
  bitly_gif_url: 'https://gph.is/test123',
  bitly_url: 'https://gph.is/test123',
  embed_url: 'https://giphy.com/embed/test123',
  username: 'testuser',
  source: 'https://example.com',
  title: 'Test GIF',
  rating: 'g',
  content_url: '',
  source_tld: 'example.com',
  source_post_url: 'https://example.com/post',
  is_sticker: 0,
  import_datetime: '2023-01-01 00:00:00',
  trending_datetime: '2023-01-01 00:00:00',
  images: {
    original: {
      height: '480',
      width: '480',
      size: '1000000',
      url: 'https://media.giphy.com/media/test123/giphy.gif',
    },
    downsized: {
      height: '480',
      width: '480',
      size: '500000',
      url: 'https://media.giphy.com/media/test123/giphy-downsized.gif',
    },
    downsized_large: {
      height: '480',
      width: '480',
      size: '800000',
      url: 'https://media.giphy.com/media/test123/giphy-downsized-large.gif',
    },
    downsized_medium: {
      height: '480',
      width: '480',
      size: '600000',
      url: 'https://media.giphy.com/media/test123/giphy-downsized-medium.gif',
    },
    downsized_small: {
      height: '240',
      width: '240',
      size: '200000',
      url: 'https://media.giphy.com/media/test123/giphy-downsized-small.gif',
    },
    downsized_still: {
      height: '480',
      width: '480',
      size: '50000',
      url: 'https://media.giphy.com/media/test123/giphy-downsized_s.gif',
    },
    fixed_height: {
      height: '200',
      width: '200',
      size: '300000',
      url: 'https://media.giphy.com/media/test123/200.gif',
    },
    fixed_height_downsampled: {
      height: '200',
      width: '200',
      size: '150000',
      url: 'https://media.giphy.com/media/test123/200_d.gif',
    },
    fixed_height_small: {
      height: '100',
      width: '100',
      size: '75000',
      url: 'https://media.giphy.com/media/test123/100.gif',
    },
    fixed_height_small_still: {
      height: '100',
      width: '100',
      size: '5000',
      url: 'https://media.giphy.com/media/test123/100_s.gif',
    },
    fixed_height_still: {
      height: '200',
      width: '200',
      size: '15000',
      url: 'https://media.giphy.com/media/test123/200_s.gif',
    },
    fixed_width: {
      height: '300',
      width: '300',
      size: '400000',
      url: 'https://media.giphy.com/media/test123/200w.gif',
    },
    fixed_width_downsampled: {
      height: '300',
      width: '300',
      size: '200000',
      url: 'https://media.giphy.com/media/test123/200w_d.gif',
    },
    fixed_width_small: {
      height: '150',
      width: '150',
      size: '100000',
      url: 'https://media.giphy.com/media/test123/100w.gif',
    },
    fixed_width_small_still: {
      height: '150',
      width: '150',
      size: '7500',
      url: 'https://media.giphy.com/media/test123/100w_s.gif',
    },
    fixed_width_still: {
      height: '300',
      width: '300',
      size: '20000',
      url: 'https://media.giphy.com/media/test123/200w_s.gif',
    },
    preview_gif: {
      height: '150',
      width: '150',
      size: '50000',
      url: 'https://media.giphy.com/media/test123/giphy-preview.gif',
    },
    preview_webp: {
      height: '150',
      width: '150',
      size: '25000',
      url: 'https://media.giphy.com/media/test123/giphy-preview.webp',
    },
    '480w_still': {
      height: '480',
      width: '480',
      size: '30000',
      url: 'https://media.giphy.com/media/test123/480w_s.jpg',
    },
  },
  analytics_response_payload: 'test_payload',
  analytics: {
    onload: { url: 'https://giphy-analytics.giphy.com/onload' },
    onclick: { url: 'https://giphy-analytics.giphy.com/onclick' },
    onsent: { url: 'https://giphy-analytics.giphy.com/onsent' },
  },
};

describe('giphyTransform', () => {
  describe('transformGiphyToMasonryItem', () => {
    it('should transform Giphy GIF to MasonryItem with correct properties', () => {
      const result = transformGiphyToMasonryItem(mockGiphyGif);

      expect(result).toEqual({
        id: 'test123',
        imageUrl: 'https://media.giphy.com/media/test123/200w.gif',
        staticImageUrl: 'https://media.giphy.com/media/test123/200w_s.gif',
        width: 300,
        height: 300,
        title: 'Test GIF',
      });
    });

    it('should handle GIF without title', () => {
      const gifWithoutTitle = { ...mockGiphyGif, title: '' };
      const result = transformGiphyToMasonryItem(gifWithoutTitle);

      expect(result.title).toBe('GIF by testuser');
    });

    it('should handle GIF without title and username', () => {
      const gifWithoutTitleAndUser = { ...mockGiphyGif, title: '', username: '' };
      const result = transformGiphyToMasonryItem(gifWithoutTitleAndUser);

      expect(result.title).toBe('GIF by Anonymous');
    });

    it('should parse width and height as integers', () => {
      const result = transformGiphyToMasonryItem(mockGiphyGif);

      expect(typeof result.width).toBe('number');
      expect(typeof result.height).toBe('number');
      expect(result.width).toBe(300);
      expect(result.height).toBe(300);
    });

    it('should use fixed_width image format', () => {
      const result = transformGiphyToMasonryItem(mockGiphyGif);

      expect(result.imageUrl).toBe(mockGiphyGif.images.fixed_width.url);
      expect(result.staticImageUrl).toBe(mockGiphyGif.images.fixed_width_still.url);
    });
  });

  describe('transformGiphyArrayToMasonryItems', () => {
    it('should transform array of Giphy GIFs to MasonryItems', () => {
      const mockGif2: GiphyGif = {
        ...mockGiphyGif,
        id: 'test456',
        title: 'Second Test GIF',
        username: 'anotheruser',
      };

      const gifs = [mockGiphyGif, mockGif2];
      const result = transformGiphyArrayToMasonryItems(gifs);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('test123');
      expect(result[0].title).toBe('Test GIF');
      expect(result[1].id).toBe('test456');
      expect(result[1].title).toBe('Second Test GIF');
    });

    it('should handle empty array', () => {
      const result = transformGiphyArrayToMasonryItems([]);

      expect(result).toEqual([]);
    });

    it('should handle single item array', () => {
      const result = transformGiphyArrayToMasonryItems([mockGiphyGif]);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test123');
    });
  });
});
