import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Dashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <Grid container spacing={3} sx={{ p: 4 }}>
      <Grid item xs={4}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5">Users</Typography>
          <Typography variant="h3">{data.totalUsers}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5">Stores</Typography>
          <Typography variant="h3">{data.totalStores}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5">Ratings</Typography>
          <Typography variant="h3">{data.totalRatings}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}