import { copyUrlToClipboard } from '../clipboardUtils';

// Mock navigator.clipboard
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe('clipboardUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('copyUrlToClipboard', () => {
    it('should copy URL to clipboard', async () => {
      const testUrl = 'https://example.com/test.gif';
      mockWriteText.mockResolvedValue(undefined);

      await copyUrlToClipboard(testUrl);

      expect(mockWriteText).toHaveBeenCalledWith(testUrl);
      expect(mockWriteText).toHaveBeenCalledTimes(1);
    });

    it('should handle clipboard write errors', async () => {
      const testUrl = 'https://example.com/test.gif';
      const error = new Error('Clipboard not available');
      mockWriteText.mockRejectedValue(error);

      await expect(copyUrlToClipboard(testUrl)).rejects.toThrow('Clipboard not available');
      expect(mockWriteText).toHaveBeenCalledWith(testUrl);
    });

    it('should work with empty string', async () => {
      mockWriteText.mockResolvedValue(undefined);

      await copyUrlToClipboard('');

      expect(mockWriteText).toHaveBeenCalledWith('');
    });

    it('should work with special characters in URL', async () => {
      const testUrl = 'https://example.com/test with spaces & symbols.gif';
      mockWriteText.mockResolvedValue(undefined);

      await copyUrlToClipboard(testUrl);

      expect(mockWriteText).toHaveBeenCalledWith(testUrl);
    });
  });
});
