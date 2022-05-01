import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListIcon from "@mui/icons-material/List";
import WorkIcon from "@mui/icons-material/Work";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import BusinessIcon from "@mui/icons-material/Business";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

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
