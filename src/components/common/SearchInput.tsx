import { TextField, InputAdornment, type TextFieldProps } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

interface SearchInputProps
  extends Omit<TextFieldProps, "onChange" | "onKeyDown" | "variant"> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  searchVariant?: "compact" | "expanded" | "bottom";
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  searchVariant = "expanded",
  ...props
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  const getVariantStyles = () => {
    switch (searchVariant) {
      case "compact":
        return {
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        };
      case "expanded":
        return {
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        };
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

  const getIconSize = () => {
    switch (searchVariant) {
      case "compact":
        return 20;
      case "bottom":
        return 24;
      default:
        return undefined;
    }
  };

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search for GIFs..."
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: "text.secondary",
                  fontSize: getIconSize(),
                }}
              />
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
