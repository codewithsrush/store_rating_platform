import { Typography } from "@mui/material";
import StoreList from "./StoreList";

export default function Dashboard() {
  return (
    <div style={{ padding: 30 }}>
      <Typography variant="h4" mb={3}>
        User Dashboard
      </Typography>

      <StoreList />
    </div>
  );
}