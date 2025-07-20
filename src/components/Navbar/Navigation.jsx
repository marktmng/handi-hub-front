import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
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

import Inventory2SharpIcon from "@mui/icons-material/Inventory2Sharp";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
import PeopleOutlineSharpIcon from "@mui/icons-material/PeopleOutlineSharp";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";

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

export default function LeftDrawer() {
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists, false otherwise
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
            onClick={() => navigate("/")}
            sx={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              cursor: "pointer",
            }}
          >
            HANDIHUB
          </Typography>

          {/* Navigation buttons for other pages */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, mr: 3 }}>
            {["Products", "About Us", "Contact"].map((page) => {
              const routeMap = {
                Products: "/",
                "About Us": "/aboutus",
                Contact: "/contact",
              };

              return (
                <Button
                  key={page}
                  sx={{ color: "inherit" }}
                  onClick={() => navigate(routeMap[page])}
                >
                  {page}
                </Button>
              );
            })}
          </Box>

          {/* Avatar and User Settings Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Mark Tmng" src="#" />
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
              {/* Render menu items based on login status */}
              {(isLoggedIn ? settingsLoggedIn : settingsLoggedOut).map(
                (setting) => {
                  const routeMap = {
                    Profile: "/profile",
                    Register: "/register",
                    Login: "/login",
                    Logout: "", // Logout handled separately
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
        <Divider /> {/* Divider for product management section */}
        {/* Product management list */}
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
              <ListItemText primary="Manage Products" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider /> {/* Divider for customer management section */}
        {/* Customer management list */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/add-customer")}>
              <ListItemIcon>
                <PersonAddSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Add Customer" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/manage-customer")}>
              <ListItemIcon>
                <PeopleOutlineSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Customer" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider /> {/* Divider for admin dashboard section */}
        {/* Admin dashboard list */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/users")}>
              <ListItemIcon>
                <PersonAddSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </List>
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
      </Drawer>

      {/* Main content area where routes render */}
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
