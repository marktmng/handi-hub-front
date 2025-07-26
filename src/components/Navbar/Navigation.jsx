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
import CategorySharpIcon from "@mui/icons-material/CategorySharp";
import ClassSharpIcon from "@mui/icons-material/ClassSharp";
import GradeIcon from "@mui/icons-material/Grade";
import Inventory2SharpIcon from "@mui/icons-material/Inventory2Sharp";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
import PeopleOutlineSharpIcon from "@mui/icons-material/PeopleOutlineSharp";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import YoutubeSearchedForSharpIcon from "@mui/icons-material/YoutubeSearchedForSharp";

import Categories from "../Categories";

const drawerWidth = 240;

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Navigation() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || ""
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("lastName") || ""
  );

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
      const first = localStorage.getItem("firstName") || "";
      const last = localStorage.getItem("lastName") || "";
      setIsLoggedIn(!!token);
      setUserRole(role);
      setFirstName(first);
      setLastName(last);
    };

    checkLogin();

    window.addEventListener("loginStatusChanged", checkLogin);
    return () => {
      window.removeEventListener("loginStatusChanged", checkLogin);
    };
  }, []);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    setFirstName("");
    setLastName("");
    setIsLoggedIn(false);
    handleCloseUserMenu();
    alert("Logged out successfully");
    navigate("/login");
  };

  const settingsLoggedOut = ["Profile", "Register", "Login"];
  const settingsLoggedIn = ["Profile", "Register", "Logout"];

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setSearchTerm("");
  };

  // Handler for when user clicks on category in drawer
  const handleCategorySelect = (categoryId) => {
    navigate(`/home?categoryId=${categoryId}`);
    setOpen(false); // optional: close drawer after selecting category
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "#576b49ff" }}
      >
        <Toolbar>
          <IconButton
            color="#576b49ff"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

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
                    bgcolor: "#8ba57d",
                    color: "white",
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
          {/* add cart */}
          <Tooltip
            title="Cart"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#8ba57d",
                  color: "white",
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

          {/* wishlist */}
          <Tooltip
            title="Wishlist"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#8ba57d",
                  color: "white",
                  fontSize: "0.9rem",
                },
              },
            }}
          >
            <IconButton
              sx={{ color: "white", mr: 2 }}
              onClick={() => navigate("/wishlist")}
            >
              <Badge
                badgeContent={JSON.parse(
                  localStorage.getItem("wishlist") || "[]"
                ).reduce((sum, item) => sum + item.quantity, 0)}
                color="secondary"
              >
                <GradeIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip
              title="Profile"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#8ba57d",
                    color: "white",
                    fontSize: "0.9rem",
                  },
                },
              }}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: "inherit",
                    border: "2px solid white",
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
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* Customer */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/cart")}>
              <ListItemIcon>
                <ShoppingCartSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/wishlist")}>
              <ListItemIcon>
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        {/* Artist product management */}
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

        {(isLoggedIn && userRole === "Artist") ||
          (userRole === "Admin" && (
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/manage-product")}>
                  <ListItemIcon>
                    <InventorySharpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>
              </ListItem>
            </List>
          ))}

        <Divider />

        {/* Customer management */}
        {isLoggedIn && (userRole === "Artist" || userRole === "Admin") && (
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/customers")}>
                <ListItemIcon>
                  <PeopleOutlineSharpIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItemButton>
            </ListItem>
          </List>
        )}

        <Divider />

        {/* Admin */}
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

        <Divider />

        {/* Admin */}
        {isLoggedIn && (userRole === "Artist" || userRole === "Admin") && (
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/add-category")}>
                <ListItemIcon>
                  <CategorySharpIcon />
                </ListItemIcon>
                <ListItemText primary="Add Category" />
              </ListItemButton>
            </ListItem>
          </List>
        )}

        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <ClassSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
          <Categories onCategorySelect={handleCategorySelect} />
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
