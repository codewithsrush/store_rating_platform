import {
    Box,
    Typography,
    Paper,
    Grid,
    Avatar,
  } from "@mui/material";
  
  import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
  import StarIcon from "@mui/icons-material/Star";
  import SearchIcon from "@mui/icons-material/Search";
  
  import StoreList from "./StoreList";
  
  export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    return (
      <Box sx={{ p: 4 }}>
  
        {/* Header */}
  
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background:
              "linear-gradient(135deg,#16a34a,#22c55e)",
            color: "white",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
          >
            Welcome 👋
          </Typography>
  
          <Typography
            variant="h5"
            mt={1}
          >
            {user?.name}
          </Typography>
  
          <Typography mt={2}>
            Discover stores, explore ratings and
            share your own experience.
          </Typography>
        </Paper>
  
        {/* Feature Cards */}
  
        <Grid container spacing={3} mb={4}>
  
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                transition: ".3s",
  
                "&:hover": {
                  transform: "translateY(-6px)",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#16a34a",
                  mb: 2,
                }}
              >
                <StoreMallDirectoryIcon />
              </Avatar>
  
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Browse Stores
              </Typography>
  
              <Typography color="text.secondary">
                View every registered store.
              </Typography>
            </Paper>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                transition: ".3s",
  
                "&:hover": {
                  transform: "translateY(-6px)",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#2563eb",
                  mb: 2,
                }}
              >
                <SearchIcon />
              </Avatar>
  
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Search Stores
              </Typography>
  
              <Typography color="text.secondary">
                Search by name or address.
              </Typography>
            </Paper>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                transition: ".3s",
  
                "&:hover": {
                  transform: "translateY(-6px)",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#f59e0b",
                  mb: 2,
                }}
              >
                <StarIcon />
              </Avatar>
  
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Rate Stores
              </Typography>
  
              <Typography color="text.secondary">
                Give ratings between 1 and 5 stars.
              </Typography>
            </Paper>
          </Grid>
  
        </Grid>
  
        {/* Store List */}
  
        <StoreList />
  
      </Box>
    );
  }