import { useState, useEffect } from "react";
import {
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
    if (trimmed) {
      // Navigate to search page
      navigate({
        to: "/search/$keyword",
        params: { keyword: trimmed },
      });
      onSearch?.(trimmed);
    } else {
      // Empty -> if on search route, go home; if already on home, do nothing
      if (params?.keyword) {
        navigate({ to: "/" });
      }
      onSearch?.("");
    }
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
            height: 48,
            fontSize: "1.1rem",
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

  return (
    <TextField
      fullWidth
      value={displayedValue}
      onChange={(e) => {
        const next = e.target.value;
        if (!isControlled) setValue(next);
        onChange?.(next);
      }}
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
