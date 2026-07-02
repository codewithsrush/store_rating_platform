import {
    Drawer,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    Divider,
  } from "@mui/material";
  
  import DashboardIcon from "@mui/icons-material/Dashboard";
  import StoreIcon from "@mui/icons-material/Store";
  import PeopleIcon from "@mui/icons-material/People";
  import AddBusinessIcon from "@mui/icons-material/AddBusiness";
  import PersonAddIcon from "@mui/icons-material/PersonAdd";
  import LogoutIcon from "@mui/icons-material/Logout";
  
  import { useNavigate } from "react-router-dom";
  
  const drawerWidth = 250;
  
  export default function Sidebar() {
    const navigate = useNavigate();
  
    const logout = () => {
      localStorage.clear();
      navigate("/");
    };
  
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
  
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#0F172A",
            color: "#fff",
          },
        }}
      >
        <Toolbar>
  
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            ⭐ Store Rating
          </Typography>
  
        </Toolbar>
  
        <Divider sx={{ bgcolor: "#334155" }} />
  
        <Box sx={{ mt: 2 }}>
  
          <List>
  
            <ListItemButton onClick={() => navigate("/admin/dashboard")}>
  
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#22c55e" }} />
              </ListItemIcon>
  
              <ListItemText primary="Dashboard" />
  
            </ListItemButton>
  
            <ListItemButton onClick={() => navigate("/admin/users")}>
  
              <ListItemIcon>
                <PeopleIcon sx={{ color: "#22c55e" }} />
              </ListItemIcon>
  
              <ListItemText primary="Users" />
  
            </ListItemButton>
  
            <ListItemButton onClick={() => navigate("/admin/stores")}>
  
              <ListItemIcon>
                <StoreIcon sx={{ color: "#22c55e" }} />
              </ListItemIcon>
  
              <ListItemText primary="Stores" />
  
            </ListItemButton>
  
            <ListItemButton onClick={() => navigate("/admin/add-user")}>
  
              <ListItemIcon>
                <PersonAddIcon sx={{ color: "#22c55e" }} />
              </ListItemIcon>
  
              <ListItemText primary="Add User" />
  
            </ListItemButton>
  
            <ListItemButton onClick={() => navigate("/admin/add-store")}>
  
              <ListItemIcon>
                <AddBusinessIcon sx={{ color: "#22c55e" }} />
              </ListItemIcon>
  
              <ListItemText primary="Add Store" />
  
            </ListItemButton>
  
            <Divider sx={{ my: 2, bgcolor: "#334155" }} />
  
            <ListItemButton onClick={logout}>
  
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#ef4444" }} />
              </ListItemIcon>
  
              <ListItemText primary="Logout" />
  
            </ListItemButton>
  
          </List>
  
        </Box>
  
      </Drawer>
    );
  }