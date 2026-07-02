import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar.jsx";
import Navbar from "../components/layout/Navbar.jsx";

export default function DashboardLayout() {

  return (

    <Box sx={{ display: "flex" }}>

      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >

        <Navbar />

        <Box
          sx={{
            p: 4,
          }}
        >
          <Outlet />
        </Box>

      </Box>

    </Box>

  );

}