import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  List,
  Divider,
  IconButton,
  ListItem,
  Link as MuiLink,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const itemsNavigation = [
  {
    text: "Mi perfil",
    to: "/user/my-profile",
    icon: <PersonIcon color="primary" />,
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

const NavItemsUser = ({ onHandleDrawerClose }) => {
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
        {itemsNavigation.map((text, index) => (
          <MuiLink
            component={Link}
            to={text.to}
            key={`nav-user-${text.text}`}
            underline="none"
          >
            <ListItem button onClick={onHandleDrawerClose}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText
                primary={text.text}
                primaryTypographyProps={{
                  color: "primary",
                }}
              />
            </ListItem>
          </MuiLink>
        ))}
      </List>
    </>
  );
};

export default NavItemsUser;
