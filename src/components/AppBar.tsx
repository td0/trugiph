import { useState, useEffect } from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Fab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";
import { AnimationToggle } from "./AnimationToggle";
import { ThemeToggle } from "./ThemeToggle";
import { SearchInput } from "./SearchInput";
import { Logo } from "./Logo";

export function AppBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBottomSearchOpen, setIsBottomSearchOpen] = useState(false);

  const theme = useTheme();
  const { mode: colorMode } = useColorScheme();
  const isDarkMode = colorMode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsBottomSearchOpen(false);
    // TODO: Implement search functionality
  };

  return (
    <>
      <MuiAppBar
        elevation={0}
        color="transparent"
        sx={{
          backgroundColor: isDarkMode
            ? "rgba(26, 29, 41, 0.5)"
            : "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(20px)",
          borderBottom: isDarkMode
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
          py: isScrolled ? 1 : isMobile ? 2 : 3,
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          {/* Unified Layout */}
          <Box sx={{ py: isMobile ? 0 : isScrolled ? 0 : 2 }}>
            <Toolbar
              disableGutters
              sx={{
                minHeight: "auto",
                height: isMobile ? "auto" : isScrolled ? "auto" : "8rem",
                py: isMobile ? 1 : 0,
                flexDirection: "row",
                alignItems: !isScrolled && !isMobile ? "start" : "center",
              }}
            >
              <Logo
                sx={{
                  flex: 1,
                  transition: "all 0.3s ease",
                  mr: isMobile ? 0 : isScrolled ? 4 : 0,
                  fontSize: isMobile || isScrolled ? "1.7rem" : "2.7rem",
                }}
              />

              {/* Search input with conditional positioning */}
              <Box
                sx={{
                  position: "absolute",
                  top: isScrolled ? "auto" : "calc(100% - 5rem)",
                  right: isScrolled ? "4.5rem" : "50%",
                  transform: isScrolled ? "none" : "translateX(50%)",
                  flexGrow: isScrolled ? 1 : 0,
                  maxWidth: isScrolled ? 400 : "50%",
                  width: isScrolled ? "auto" : "100%",
                  mx: isScrolled ? 2 : 0,
                  mt: isScrolled ? 0 : 2,
                  display: isMobile ? "none" : "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                  transition: "all 0.3s ease",
                }}
              >
                <SearchInput
                  size={isScrolled ? "small" : "medium"}
                  searchVariant={isScrolled ? "compact" : "expanded"}
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  sx={{
                    width: "100%",
                    transition: "all 0.3s ease",
                  }}
                />
                {!isScrolled && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textAlign: "center",
                      opacity: 0.8,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {searchQuery
                      ? `Search results for "${searchQuery}"`
                      : "Discover trending GIFs"}
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: isMobile ? 0.5 : isScrolled ? 0.5 : 1,
                  border: "1px solid primary.main",
                  borderRadius: 2,
                  p: 0.5,
                }}
              >
                <AnimationToggle
                  size={isMobile ? "small" : isScrolled ? "small" : "medium"}
                />
                <ThemeToggle
                  size={isMobile ? "small" : isScrolled ? "small" : "medium"}
                />
              </Box>
            </Toolbar>
          </Box>
        </Container>
      </MuiAppBar>

      <Toolbar sx={{ height: isMobile ? "auto" : "12rem" }} />

      {/* Floating Search Button */}
      <Fab
        onClick={() => setIsBottomSearchOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          transition: "all 0.3s ease-in-out",
          width: isBottomSearchOpen ? "100vw" : "3.5rem",
          height: isBottomSearchOpen ? "6rem" : "3.5rem",
          opacity: isMobile && !isBottomSearchOpen ? 1 : 0,
          borderRadius: isBottomSearchOpen ? 0 : "50%",
          transform: isBottomSearchOpen ? "translateY(50%)" : "translateY(0)",
          backdropFilter: "blur(20px)",
          color: "text.primary",
          backgroundColor: isBottomSearchOpen
            ? "transparent"
            : isDarkMode
            ? "rgba(26, 29, 41, 0.5)"
            : "rgba(255, 255, 255, 0.5)",
          "&:hover": {
            backgroundColor: isBottomSearchOpen
              ? "transparent"
              : isDarkMode
              ? "rgba(26, 29, 41, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
            transform: "scale(1.1)",
          },
        }}
      >
        <SearchIcon
          sx={{
            transition: "opacity 0.3s ease-in-out",
            opacity: isBottomSearchOpen ? 0 : 1,
          }}
        />
      </Fab>

      {/* Bottom Search Pane */}
      <Box
        sx={{
          position: "fixed",
          bottom: -1,
          left: 0,
          right: 0,
          zIndex: 1300,
          backgroundColor: isDarkMode
            ? "rgba(26, 29, 41, 0.5)"
            : "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid",
          borderColor: isDarkMode
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
          boxShadow: isDarkMode
            ? "0 -4px 20px rgba(0, 0, 0, 0.3)"
            : "0 -4px 20px rgba(0, 0, 0, 0.1)",
          py: 2,
          px: 2,
          pb: "calc(22px + env(safe-area-inset-bottom))",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: isBottomSearchOpen ? 0 : "50%",
          transform: isBottomSearchOpen
            ? "translateX(0) scale(1)"
            : "translateX(100%) scale(0)",
          display: isMobile ? "block" : "none",
        }}
      >
        <Container maxWidth="md" sx={{ px: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <SearchInput
              autoFocus
              searchVariant="expanded"
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              sx={{
                width: "100%",
                transition: "all 0.3s ease",
              }}
            />
            <IconButton
              onClick={() => setIsBottomSearchOpen(false)}
              sx={{
                width: 48,
                height: 48,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </>
  );
}
