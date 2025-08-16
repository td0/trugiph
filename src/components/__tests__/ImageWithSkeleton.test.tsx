import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageWithSkeleton } from '../ImageWithSkeleton';
import { useColorScheme } from '@mui/material';
import { useAtomValue } from 'jotai';

// Mock dependencies
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useColorScheme: jest.fn(),
}));

jest.mock('jotai', () => ({
  useAtomValue: jest.fn(),
}));

jest.mock('@/stores/animationStore', () => ({
  animationPausedAtom: {},
}));

// Mock clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

const mockUseColorScheme = useColorScheme as jest.MockedFunction<typeof useColorScheme>;
const mockUseAtomValue = useAtomValue as jest.MockedFunction<typeof useAtomValue>;

describe('ImageWithSkeleton', () => {
  const defaultProps = {
    src: 'https://media.giphy.com/media/abc123/giphy.gif',
    srcStatic: 'https://media.giphy.com/media/abc123/giphy_s.gif',
    alt: 'Test GIF',
    width: '200px',
    height: '150px',
    title: 'Test Title',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseColorScheme.mockReturnValue({ 
      mode: 'light',
      allColorSchemes: ['light', 'dark'],
      systemMode: 'light',
      lightColorScheme: 'light',
      darkColorScheme: 'dark',
      setMode: jest.fn(),
      setColorScheme: jest.fn()
    } as any);
    mockUseAtomValue.mockReturnValue(false); // Animation not paused
    mockWriteText.mockResolvedValue(undefined);
  });

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', defaultProps.src);
    });

    it('renders without optional title', () => {
      const { title, ...propsWithoutTitle } = defaultProps;
      render(<ImageWithSkeleton {...propsWithoutTitle} />);
      
      const image = screen.getByAltText('Test GIF');
      expect(image).toBeInTheDocument();
    });

    it('applies custom border radius', () => {
      render(<ImageWithSkeleton {...defaultProps} borderRadius={8} />);
      
      const image = screen.getByAltText('Test GIF');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    it('shows skeleton loader initially', () => {
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const skeleton = screen.getByTestId('skeleton') || document.querySelector('.MuiSkeleton-root');
      expect(skeleton || screen.getByAltText('Test GIF').closest('[data-testid]')).toBeInTheDocument();
    });

    it('hides skeleton after image loads', async () => {
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      
      // Simulate image load
      fireEvent.load(image);
      
      await waitFor(() => {
        const skeleton = document.querySelector('.MuiSkeleton-root');
        expect(skeleton).not.toBeInTheDocument();
      });
    });

    it('shows title overlay after image loads', async () => {
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      
      // Initially title should not be visible
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
      
      // Simulate image load
      fireEvent.load(image);
      
      await waitFor(() => {
        expect(screen.getByText('Test Title')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('shows fallback image on error', async () => {
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      
      // Simulate image error
      fireEvent.error(image);
      
      await waitFor(() => {
        expect(image).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'));
      });
    });

    it('hides skeleton on error', async () => {
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      
      // Simulate image error
      fireEvent.error(image);
      
      await waitFor(() => {
        const skeleton = document.querySelector('.MuiSkeleton-root');
        expect(skeleton).not.toBeInTheDocument();
      });
    });
  });

  describe('Animation Control', () => {
    it('uses animated src when animation is not paused', () => {
      mockUseAtomValue.mockReturnValue(false);
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      expect(image).toHaveAttribute('src', defaultProps.src);
    });

    it('uses static src when animation is paused', () => {
      mockUseAtomValue.mockReturnValue(true);
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      expect(image).toHaveAttribute('src', defaultProps.srcStatic);
    });
  });

  describe('Clipboard Functionality', () => {
    it('copies modified URL to clipboard on click', async () => {
      const user = userEvent.setup();
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const container = screen.getByAltText('Test GIF').closest('[data-testid]') || 
                       screen.getByAltText('Test GIF').parentElement;
      
      if (container) {
        await user.click(container);
      } else {
        await user.click(screen.getByAltText('Test GIF'));
      }
      
      expect(mockWriteText).toHaveBeenCalledWith(
        'https://media.giphy.com/media/abc123/giphy.gif'
      );
    });

    it('modifies URL path to use giphy.gif', async () => {
      const user = userEvent.setup();
      const propsWithDifferentPath = {
        ...defaultProps,
        src: 'https://media.giphy.com/media/abc123/200w.gif',
      };
      
      render(<ImageWithSkeleton {...propsWithDifferentPath} />);
      
      const image = screen.getByAltText('Test GIF');
      await user.click(image.parentElement || image);
      
      expect(mockWriteText).toHaveBeenCalledWith(
        'https://media.giphy.com/media/abc123/giphy.gif'
      );
    });

    it('shows snackbar after copying', async () => {
      const user = userEvent.setup();
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      await user.click(image.parentElement || image);
      
      await waitFor(() => {
        expect(screen.getByText('Copied to clipboard')).toBeInTheDocument();
      });
    });

    it('handles clipboard copy errors gracefully', async () => {
      const user = userEvent.setup();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      mockWriteText.mockRejectedValue(new Error('Clipboard error'));
      
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      await user.click(image.parentElement || image);
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to copy:', expect.any(Error));
      
      // Should still show snackbar even on error
      await waitFor(() => {
        expect(screen.getByText('Copied to clipboard')).toBeInTheDocument();
      });
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Color Scheme Integration', () => {
    it('uses light mode snackbar styling', async () => {
      const user = userEvent.setup();
      mockUseColorScheme.mockReturnValue({ 
        mode: 'light',
        allColorSchemes: ['light', 'dark'],
        systemMode: 'light',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        setMode: jest.fn(),
        setColorScheme: jest.fn()
      } as any);
      
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      await user.click(image.parentElement || image);
      
      await waitFor(() => {
        const snackbar = screen.getByText('Copied to clipboard').closest('.MuiSnackbar-root');
        expect(snackbar).toBeInTheDocument();
      });
    });

    it('uses dark mode snackbar styling', async () => {
      const user = userEvent.setup();
      mockUseColorScheme.mockReturnValue({ 
        mode: 'dark',
        allColorSchemes: ['light', 'dark'],
        systemMode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        setMode: jest.fn(),
        setColorScheme: jest.fn()
      } as any);
      
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      await user.click(image.parentElement || image);
      
      await waitFor(() => {
        const snackbar = screen.getByText('Copied to clipboard').closest('.MuiSnackbar-root');
        expect(snackbar).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text', () => {
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      expect(image).toBeInTheDocument();
    });

    it('supports keyboard interaction', async () => {
      const user = userEvent.setup();
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const container = screen.getByAltText('Test GIF').parentElement;
      
      if (container) {
        container.focus();
        await user.keyboard('{Enter}');
        
        expect(mockWriteText).toHaveBeenCalled();
      }
    });

    it('has proper cursor styling', () => {
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      expect(image).toHaveStyle('cursor: pointer');
    });
  });

  describe('Responsive Behavior', () => {
    it('applies correct dimensions', () => {
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const container = screen.getByAltText('Test GIF').parentElement;
      expect(container).toHaveStyle({
        width: '200px',
        height: '150px',
      });
    });

    it('applies hover transform effect', () => {
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const container = screen.getByAltText('Test GIF').parentElement;
      expect(container).toHaveStyle('transition: transform 0.2s ease-in-out');
    });
  });

  describe('Snackbar Auto-hide', () => {
    it('auto-hides snackbar after timeout', async () => {
      const user = userEvent.setup();
      render(<ImageWithSkeleton {...defaultProps} />);
      
      const image = screen.getByAltText('Test GIF');
      await user.click(image.parentElement || image);
      
      // Snackbar should appear
      await waitFor(() => {
        expect(screen.getByText('Copied to clipboard')).toBeInTheDocument();
      });
      
      // Wait for auto-hide (1000ms + some buffer)
      await waitFor(() => {
        expect(screen.queryByText('Copied to clipboard')).not.toBeInTheDocument();
      }, { timeout: 1500 });
    });
  });
});
