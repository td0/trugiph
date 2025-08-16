import { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  type TextFieldProps,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { useNavigate, useParams, useLocation } from "@tanstack/react-router";

interface SearchInputProps
  extends Omit<TextFieldProps, "onChange" | "onKeyDown" | "variant" | "value"> {
  initialValue?: string;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  searchVariant?: "compact" | "expanded" | "bottom";
  showSearchButton?: boolean;
  showClearButton?: boolean;
}

export function SearchInput({
  initialValue = "",
  onSearch,
  onClear,
  searchVariant = "expanded",
  showSearchButton = true,
  showClearButton = true,
  ...props
}: SearchInputProps) {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const location = useLocation();

  // Get initial value from URL params (keyword) or fallback to prop
  const getInitialValue = () => {
    if (params?.keyword) {
      return params.keyword;
    }
    return initialValue;
  };

  const [value, setValue] = useState(getInitialValue);

  // Clear search input when navigating to homepage
  useEffect(() => {
    if (location.pathname === "/") {
      setValue("");
    } else if (params?.keyword) {
      setValue(params.keyword);
    }
  }, [location.pathname, params?.keyword]);

  const handleSearchSubmit = () => {
    if (value.trim()) {
      // Navigate to search page
      navigate({ to: "/search/$keyword", params: { keyword: value.trim() } as any });

      // Call optional onSearch callback for additional handling (like closing mobile search)
      if (onSearch) {
        onSearch(value);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
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
    setValue("");
    if (onClear) {
      onClear();
    }
  };

  const handleSearchClick = () => {
    handleSearchSubmit();
  };

  const isDirty = value.length > 0;

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
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
