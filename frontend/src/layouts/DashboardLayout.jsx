import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex" }}>
      <Drawer variant="permanent">
        <Toolbar />
        <List sx={{ width: 220 }}>
          <ListItemButton onClick={() => navigate("/admin/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/admin/users")}>
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/admin/stores")}>
            <ListItemText primary="Stores" />
          </ListItemButton>
        </List>
      </Drawer>

      <div style={{ flex: 1, padding: 30 }}>
        <Outlet />
      </div>
    </div>
  );
}