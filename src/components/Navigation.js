import React from "react";
import { useAuth } from "../lib/auth";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NavItemsAdmin from "./NavItemsAdmin";
import NavItemsUser from "./NavItemsUser";
import NavIcon from "./NavIcon";
import { Container } from "@mui/material";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function ElevationScroll(props) {
  const { children, window } = props;

  return React.cloneElement(children, {
    elevation: 4,
    style: {
      backgroundColor: "rgba(85, 108, 214, 0.95)",
      color: "rgba(85, 108, 214, 0.95)",
    },
  });
}

const Navigation = (props) => {
  const { user } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="sticky" open={open}>
          <Toolbar>
            {user ? (
              <IconButton
                color="black"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" noWrap component="div" color="white">
                Challenge Kruger
              </Typography>
            </Box>

            {user ? (
              <Box sx={{ paddingLeft: 5 }}>
                <NavIcon onHandleDrawerClose={handleDrawerClose} />
              </Box>
            ) : null}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {user ? (
        <Drawer variant="permanent" open={open}>
          {user?.role === "Admin" ? (
            <NavItemsAdmin onHandleDrawerClose={handleDrawerClose} />
          ) : (
            <NavItemsUser onHandleDrawerClose={handleDrawerClose} />
          )}
        </Drawer>
      ) : null}
    </>
  );
};

export default Navigation;
