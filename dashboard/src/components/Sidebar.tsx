import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AccountBalance as WalletIcon,
  Apps as DAppIcon,
  Timeline as TimelineIcon,
  Notifications as AlertIcon,
  Compare as CompareIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Overview", icon: <DashboardIcon />, path: "/" },
  { text: "Wallet Analytics", icon: <WalletIcon />, path: "/wallet" },
  { text: "dApp Interactions", icon: <DAppIcon />, path: "/dapp" },
  { text: "Real-Time Data", icon: <TimelineIcon />, path: "/realtime" },
  { text: "Alerts", icon: <AlertIcon />, path: "/alerts" },
  { text: "Comparative Analysis", icon: <CompareIcon />, path: "/compare" },
  { text: "Export & Share", icon: <ShareIcon />, path: "/export" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          SonicTrace
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{ color: location.pathname === item.path ? "white" : "inherit" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
