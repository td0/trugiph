import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  type TextFieldProps,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { useNavigate, useParams } from "@tanstack/react-router";

interface SearchInputProps
  extends Omit<TextFieldProps, "onChange" | "onKeyDown" | "variant"> {
  initialValue?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  searchVariant?: "compact" | "expanded" | "bottom";
  showSearchButton?: boolean;
  showClearButton?: boolean;
}

export function SearchInput({
  initialValue = "",
  onSearch,
  onChange,
  onClear,
  searchVariant = "expanded",
  showSearchButton = true,
  showClearButton = true,
  ...props
}: SearchInputProps) {
  const navigate = useNavigate();
  const params = useParams({ strict: false });

  // Get initial value from URL params (keyword) or fallback to prop
  const getInitialValue = () => {
    if (params?.keyword) {
      return params.keyword;
    }
    return initialValue;
  };

  const [value, setValue] = useState(getInitialValue);
  const isControlled = props.value !== undefined;
  const displayedValue = (props.value as string | undefined) ?? value;

  // Clear/sync when not on the search route (robust to basepath). Only when uncontrolled.
  useEffect(() => {
    if (isControlled) return;
    if (params?.keyword) {
      setValue(params.keyword);
      onChange?.(params.keyword);
    } else {
      setValue("");
      onChange?.("");
    }
  }, [params?.keyword, onChange, isControlled]);

  const handleSubmit = () => {
    const trimmed = displayedValue.trim();
    const isAllowed = trimmed.length === 0 || /^[A-Za-z0-9 ]+$/.test(trimmed);

    // Only proceed if input is valid (3-50 characters) and allowed characters
    if (trimmed.length >= 3 && trimmed.length <= 50 && isAllowed) {
      // Navigate to search page
      navigate({
        to: "/search/$keyword",
        params: { keyword: trimmed },
      });
      onSearch?.(trimmed);
    } else if (trimmed.length === 0) {
      // Empty -> if on search route, go home; if already on home, do nothing
      if (params?.keyword) {
        navigate({ to: "/" });
      }
      onSearch?.("");
    }
    // If invalid length, do nothing (MUI validation will show error)
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const getVariantStyles = () => {
    switch (searchVariant) {
      case "bottom":
        return {
          "& .MuiOutlinedInput-root": {
            fontSize: "1rem",
          },
        };
      default:
        return {};
    }
  };

  const handleClear = () => {
    if (!isControlled) setValue("");
    onChange?.("");
    if (onClear) {
      onClear();
    }
  };

  const handleSearchClick = () => {
    handleSubmit();
  };

  const isDirty = displayedValue.length > 0;

  const trimmed = displayedValue.trim();
  const hasInvalidChars =
    trimmed.length > 0 && !/^[A-Za-z0-9 ]+$/.test(trimmed);
  const hasError =
    (trimmed.length > 0 && (trimmed.length < 3 || hasInvalidChars)) ||
    displayedValue.length > 50;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        maxHeight: "44px",
        minHeight: "44px",
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        value={displayedValue}
        onChange={(e) => {
          const next = e.target.value;
          if (!isControlled) setValue(next);
          onChange?.(next);
        }}
        helperText={
          hasInvalidChars
            ? "Only letters, numbers, and spaces are allowed"
            : trimmed.length > 0 && trimmed.length < 3
            ? "Search must be at least 3 characters long"
            : displayedValue.length > 50
            ? "Search cannot exceed 50 characters"
            : ""
        }
        error={hasError}
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
            inputProps: {
              pattern: "[A-Za-z0-9 ]*",
              maxLength: 100,
            },
          },
        }}
        sx={{
          maxHeight: "24px",
          overflow: "hidden",
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
          "& .MuiFormHelperText-root": {
            marginTop: "0px",
            marginLeft: "8px",
          },
          ...getVariantStyles(),
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        }}
        {...props}
        variant="standard"
      />
    </Box>
  );
}
