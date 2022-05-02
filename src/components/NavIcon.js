import React from "react";
import { useAuth } from "../lib/auth";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Link as MuiLink,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const settings = [
  {
    text: "Mi perfil",
    to: "/user/my-profile",
  },
];

const NavIcon = ({ onHandleDrawerClose }) => {
  const { logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon color="black" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
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
        {settings.map((setting) => (
          <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
            <MuiLink component={Link} to={setting.to} underline="none">
              <Typography textAlign="center" color="textBlack">
                {setting.text}
              </Typography>
            </MuiLink>
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            logout().then(onHandleDrawerClose);
          }}
        >
          <Typography textAlign="center" color="textBlack">
            Cerrar sesión
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavIcon;
