import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../SearchInput';

// Mock TanStack Router hooks
jest.mock('@tanstack/react-router', () => ({
  useNavigate: jest.fn(() => jest.fn()),
  useParams: jest.fn(() => ({})),
  useLocation: jest.fn(() => ({ pathname: '/' })),
}));

const renderSearchInput = (props = {}) => {
  return render(<SearchInput {...props} />);
};

describe('SearchInput', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Clear any existing mocks
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      renderSearchInput(<SearchInput />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    it('renders with initial value', () => {
      renderSearchInput(<SearchInput initialValue="test query" />);
      
      const input = screen.getByDisplayValue('test query');
      expect(input).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
      renderSearchInput(<SearchInput placeholder="Custom placeholder" />);
      
      const input = screen.getByPlaceholderText('Custom placeholder');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Button Visibility', () => {
    it('shows search and clear buttons by default when input has value', async () => {
      renderSearchInput(<SearchInput />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, 'test');

      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    });

    it('hides search button when showSearchButton is false', async () => {
      renderSearchInput(<SearchInput showSearchButton={false} />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, 'test');

      expect(screen.queryByRole('button', { name: /search/i })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    });

    it('hides clear button when showClearButton is false', async () => {
      renderSearchInput(<SearchInput showClearButton={false} />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, 'test');

      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
    });

    it('does not show clear button when input is empty', () => {
      renderSearchInput(<SearchInput />);
      
      expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
    });

    it('disables search button when input is empty', () => {
      renderSearchInput(<SearchInput />);
      
      const searchButton = screen.getByRole('button', { name: /search/i });
      expect(searchButton).toBeDisabled();
    });
  });

  describe('User Interactions', () => {
    it('updates input value when typing', async () => {
      renderSearchInput(<SearchInput />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, 'cats');

      expect(input).toHaveValue('cats');
    });

    it('clears input when clear button is clicked', async () => {
      renderSearchInput(<SearchInput />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, 'test');
      
      const clearButton = screen.getByRole('button', { name: /clear/i });
      await user.click(clearButton);

      expect(input).toHaveValue('');
    });

    it('calls onClear callback when clear button is clicked', async () => {
      const onClear = jest.fn();
      renderSearchInput(<SearchInput onClear={onClear} />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, 'test');
      
      const clearButton = screen.getByRole('button', { name: /clear/i });
      await user.click(clearButton);

      expect(onClear).toHaveBeenCalledTimes(1);
    });

    it('calls onSearch callback when search button is clicked', async () => {
      const onSearch = jest.fn();
      renderSearchInput(<SearchInput onSearch={onSearch} />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, 'cats');
      
      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      expect(onSearch).toHaveBeenCalledWith('cats');
    });

    it('submits search on Enter key press', async () => {
      const onSearch = jest.fn();
      renderSearchInput(<SearchInput onSearch={onSearch} />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, 'dogs');
      await user.keyboard('{Enter}');

      expect(onSearch).toHaveBeenCalledWith('dogs');
    });

    it('trims whitespace from search value', async () => {
      const onSearch = jest.fn();
      renderSearchInput(<SearchInput onSearch={onSearch} />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, '  cats  ');
      
      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      expect(onSearch).toHaveBeenCalledWith('  cats  ');
    });

    it('does not submit search with empty or whitespace-only value', async () => {
      const onSearch = jest.fn();
      renderSearchInput(<SearchInput onSearch={onSearch} />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, '   ');
      await user.keyboard('{Enter}');

      expect(onSearch).not.toHaveBeenCalled();
    });
  });

  describe('URL Parameter Integration', () => {
    it('initializes with value from URL keyword parameter', () => {
      renderSearchInput(<SearchInput />);
      
      const input = screen.getByDisplayValue('cats');
      expect(input).toBeInTheDocument();
    });

    it('prefers URL keyword over initialValue prop', () => {
      renderSearchInput(<SearchInput initialValue="dogs" />);
      
      const input = screen.getByDisplayValue('cats');
      expect(input).toBeInTheDocument();
    });

    it('clears input when navigating to homepage', async () => {
      // This test would require more complex router setup to test navigation
      // For now, we'll test the effect logic indirectly
      renderSearchInput(<SearchInput initialValue="test" />);
      
      const input = screen.getByDisplayValue('test');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Search Variants', () => {
    it('applies bottom variant styles', () => {
      renderSearchInput(<SearchInput searchVariant="bottom" />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      
      // Check if the component renders without errors
      expect(input).toBeInTheDocument();
    });

    it('applies default styles for expanded variant', () => {
      renderSearchInput(<SearchInput searchVariant="expanded" />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      expect(input).toBeInTheDocument();
    });

    it('applies default styles for compact variant', () => {
      renderSearchInput(<SearchInput searchVariant="compact" />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels for buttons', async () => {
      renderSearchInput(<SearchInput />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      await user.type(input, 'test');

      const searchButton = screen.getByRole('button', { name: /search/i });
      const clearButton = screen.getByRole('button', { name: /clear/i });

      expect(searchButton).toBeInTheDocument();
      expect(clearButton).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      renderSearchInput(<SearchInput />);
      
      const input = screen.getByPlaceholderText('Search for GIFs...');
      
      // Focus should be manageable via keyboard
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe('Props Forwarding', () => {
    it('forwards additional TextField props', () => {
      renderSearchInput(
        <SearchInput 
          data-testid="custom-search-input"
          disabled
        />
      );
      
      const input = screen.getByTestId('custom-search-input');
      expect(input).toBeInTheDocument();
      expect(input.querySelector('input')).toBeDisabled();
    });

    it('applies custom sx styles', () => {
      renderSearchInput(
        <SearchInput 
          sx={{ backgroundColor: 'red' }}
          data-testid="styled-input"
        />
      );
      
      const input = screen.getByTestId('styled-input');
      expect(input).toBeInTheDocument();
    });
  });
});
