import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import Inventory2SharpIcon from "@mui/icons-material/Inventory2Sharp";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
import PeopleOutlineSharpIcon from "@mui/icons-material/PeopleOutlineSharp";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import YoutubeSearchedForSharpIcon from "@mui/icons-material/YoutubeSearchedForSharp";

const drawerWidth = 240;

// Main content area style with transition for drawer open/close
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

// AppBar style with transition when drawer toggles
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Drawer header style (for close button alignment)
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Navigation() {
  const theme = useTheme();
  const [open, setOpen] = useState(false); // State for drawer open/close
  const navigate = useNavigate();

  // Toggle drawer open state
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // State for user menu anchor element (for popover menu)
  const [anchorElUser, setAnchorElUser] = useState(null);

  // State to track if user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage token on component mount to determine login status
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || "";

  const getInitials = (first, last) => {
    const firstInitial = first?.charAt(0).toUpperCase() || "";
    const lastInitial = last?.charAt(0).toUpperCase() || "";
    return firstInitial + lastInitial;
  };

  const userInitials = getInitials(firstName, lastName);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      setIsLoggedIn(!!token);
      setUserRole(role);
    };

    // Run once on mount
    checkLogin();

    window.addEventListener("loginStatusChanged", checkLogin);
    return () => {
      window.removeEventListener("loginStatusChanged", checkLogin);
    };
  }, []);

  // Open user menu popover
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Close user menu popover
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Logout function: clear tokens, update state, redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    handleCloseUserMenu();
    alert("Logged out successfully");
    navigate("/login");
  };

  // Menu items when logged out
  const settingsLoggedOut = ["Profile", "Register", "Login"];

  // Menu items when logged in
  const settingsLoggedIn = ["Profile", "Register", "Logout"];

  // State and handlers for search input toggle and value
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search submit
  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  // Toggle search bar open/close
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setSearchTerm("");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar with menu button and site title */}
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "#576b49ff" }}
      >
        <Toolbar>
          {/* Hamburger icon to open drawer */}
          <IconButton
            color="#576b49ff"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          {/* Site title clickable to navigate home */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate("/home")}
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              cursor: "pointer",
              mr: 3,
            }}
          >
            HANDIHUB
          </Typography>

          {/* User login status and role display */}
          {/* <Typography variant="body2" color="white" sx={{ m: 2 }}>
            Logged in: {isLoggedIn ? "Yes" : "No"} | Role: {userRole}
          </Typography> */}

          {/* Centered Navigation Buttons */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {["Products", "About Us", "Contact"].map((page) => {
              const routeMap = {
                Products: "/home",
                "About Us": "/aboutus",
                Contact: "/contact",
              };

              return (
                <Button
                  key={page}
                  sx={{ color: "white", fontWeight: 500 }}
                  onClick={() => navigate(routeMap[page])}
                >
                  {page}
                </Button>
              );
            })}
          </Box>

          {/* Search icon & input container */}
          <Box
            sx={{
              position: "relative",
              width: searchOpen ? 250 : 40,
              transition: "width 0.3s ease",
              display: "flex",
              alignItems: "center",
              bgcolor: searchOpen ? "white" : "transparent",
              borderRadius: "30px",
              overflow: "hidden",
              mr: 2,
            }}
          >
            {searchOpen && (
              <InputBase
                autoFocus
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearchSubmit();
                  }
                }}
                sx={{
                  ml: 2,
                  flexGrow: 1,
                  color: "black",
                }}
              />
            )}

            <Tooltip
              title="Search"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#576b49ff", // your desired background color
                    color: "white", // text color
                    fontSize: "0.9rem",
                  },
                },
              }}
            >
              <IconButton
                onClick={searchOpen ? handleSearchSubmit : toggleSearch}
                sx={{
                  p: "10px",
                  color: searchOpen ? "#576b49ff" : "white",
                }}
                aria-label={searchOpen ? "search submit" : "open search"}
              >
                {searchOpen ? <SearchIcon /> : <YoutubeSearchedForSharpIcon />}
              </IconButton>
            </Tooltip>

            {/* Close button when search input is open */}
            {searchOpen && (
              <IconButton
                onClick={toggleSearch}
                sx={{ p: "10px", color: "#576b49ff" }}
                aria-label="close search"
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>

          {/* Cart Icon with Badge */}
          <Tooltip
            title="Cart"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#576b49ff", // your desired background color
                  color: "white", // text color
                  fontSize: "0.9rem",
                },
              },
            }}
          >
            <IconButton
              sx={{ color: "white", mr: 2 }}
              onClick={() => navigate("/cart")}
            >
              <Badge
                badgeContent={JSON.parse(
                  localStorage.getItem("cart") || "[]"
                ).reduce((sum, item) => sum + item.quantity, 0)}
                color="secondary"
              >
                <AddShoppingCartSharpIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Avatar and Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip
              title="Profile"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#576b49ff", // your desired background color
                    color: "white", // text color
                    fontSize: "0.9rem",
                  },
                },
              }}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: "inherit",
                    border: "2px solid white", // outline thickness and color
                    color: "white",
                    fontWeight: 600,
                  }}
                  alt=""
                  src="#"
                >
                  {userInitials}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {(isLoggedIn ? settingsLoggedIn : settingsLoggedOut).map(
                (setting) => {
                  const routeMap = {
                    Profile: "/profile",
                    Register: "/register",
                    Login: "/login",
                    Logout: "",
                  };

                  if (setting === "Logout") {
                    return (
                      <MenuItem key={setting} onClick={handleLogout}>
                        <LogoutIcon sx={{ mr: 1 }} />
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );
                  }

                  return (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate(routeMap[setting]);
                      }}
                    >
                      {setting === "Login" ? (
                        <LoginIcon sx={{ mr: 1 }} />
                      ) : null}
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Drawer for navigation */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#576b49ff",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/* Drawer header with close icon */}
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider /> {/* Divider */}
        {/* Customer */}
        {isLoggedIn && userRole === "Customer" && (
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/cart")}>
                <ListItemIcon>
                  <ShoppingCartSharpIcon />
                </ListItemIcon>
                <ListItemText primary="Cart" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
        <Divider /> {/* Divider Artist*/}
        {/* Product management list */}
        {isLoggedIn && userRole === "Artist" && (
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/add-product")}>
                <ListItemIcon>
                  <Inventory2SharpIcon />
                </ListItemIcon>
                <ListItemText primary="Add Product" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/manage-product")}>
                <ListItemIcon>
                  <InventorySharpIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
        <Divider /> {/* Divider for customer management section */}
        {/* Customer management list */}
        {isLoggedIn && (userRole === "Artist" || userRole === "Admin") && (
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/manage-customer")}>
                <ListItemIcon>
                  <PeopleOutlineSharpIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
        <Divider /> {/* Divider for admin dashboard section */}
        {/* Admin dashboard list */}
        {/* <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/users")}>
              <ListItemIcon>
                <PersonAddSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </List> */}
        {isLoggedIn && userRole === "Admin" && (
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/artists")}>
                <ListItemIcon>
                  <PersonAddSharpIcon />
                </ListItemIcon>
                <ListItemText primary="Artists" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Drawer>

      {/* Main content area where routes render */}
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
