import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
  } from "@mui/material";
  
  export default function Navbar() {
  
    const user =
      JSON.parse(localStorage.getItem("user"));
  
    return (
      <AppBar
        elevation={0}
        position="static"
        sx={{
          background: "#fff",
          color: "#111827",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Toolbar>
  
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Store Rating Platform
          </Typography>
  
          <Box sx={{ flexGrow: 1 }} />
  
          <Typography mr={2}>
            {user?.name}
          </Typography>
  
          <Avatar
            sx={{
              bgcolor: "#22c55e",
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>
  
        </Toolbar>
      </AppBar>
    );
  }