import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  List,
  Divider,
  IconButton,
  ListItem,
  Link as MuiLink,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";

const UserNavigation = [
  {
    text: "Mi perfil",
    to: "/user/my-profile",
    icon: <PersonIcon color="primary" />,
  },
];

const AdminNavigation = [
  {
    text: "Agregar empleado",
    to: "/admin/add",
    icon: <PersonAddIcon color="terciary" />,
  },
  {
    text: "Lista de empleados",
    to: "/admin/list",
    icon: <PeopleIcon color="terciary" />,
  },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NavItemsAdmin = ({ onHandleDrawerClose }) => {
  const theme = useTheme();

  return (
    <>
      <DrawerHeader>
        <IconButton onClick={onHandleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon color="primary" />
          ) : (
            <ChevronRightIcon color="primary" />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {AdminNavigation.map((text, index) => (
          <MuiLink
            component={Link}
            to={text.to}
            key={`nav-item-${text.text}`}
            underline="none"
          >
            <ListItem button onClick={onHandleDrawerClose}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText
                primary={text.text}
                primaryTypographyProps={{
                  color: "textBlack",
                }}
              />
            </ListItem>
          </MuiLink>
        ))}
        <Divider />
        {UserNavigation.map((text, index) => (
          <MuiLink
            component={Link}
            to={text.to}
            key={`nav-item-${text.text}`}
            underline="none"
          >
            <ListItem button onClick={onHandleDrawerClose}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText
                primary={text.text}
                primaryTypographyProps={{
                  color: "textBlack",
                }}
              />
            </ListItem>
          </MuiLink>
        ))}
      </List>
    </>
  );
};

export default NavItemsAdmin;
