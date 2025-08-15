import {
  TextField,
  InputAdornment,
  IconButton,
  type TextFieldProps,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

interface SearchInputProps
  extends Omit<TextFieldProps, "onChange" | "onKeyDown" | "variant"> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  searchVariant?: "compact" | "expanded" | "bottom";
  showSearchButton?: boolean;
  showClearButton?: boolean;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  onClear,
  searchVariant = "expanded",
  showSearchButton = true,
  showClearButton = true,
  ...props
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  const getVariantStyles = () => {
    switch (searchVariant) {
      case "bottom":
        return {
          "& .MuiOutlinedInput-root": {
            height: 48,
            fontSize: "1.1rem",
          },
        };
      default:
        return {};
    }
  };

  const handleClear = () => {
    onChange("");
    if (onClear) {
      onClear();
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const isDirty = value.length > 0;

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search for GIFs..."
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {showClearButton && isDirty && (
                <IconButton
                  size="small"
                  onClick={handleClear}
                  sx={{
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
              {showSearchButton && (
                <IconButton
                  size="small"
                  onClick={handleSearchClick}
                  disabled={!isDirty}
                  sx={{
                    ml: showClearButton && isDirty ? 0.5 : 0,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
      }}
      sx={[
        {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.1)",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
        },
        getVariantStyles(),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
      {...props}
    />
  );
}
