import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Rating,
} from "@mui/material";

import api from "../../services/api";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({});

  const loadStores = () => {
    api.get("/user/stores").then((res) => {
      setStores(res.data.stores);
    });
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleSearch = async () => {
    const res = await api.get(`/user/search?search=${search}`);
    setStores(res.data.stores);
  };

  const submitRating = async (storeId, rating) => {
    await api.post("/user/rating", {
      store_id: storeId,
      rating,
    });

    loadStores();
  };

  return (
    <>
      <TextField
        fullWidth
        placeholder="Search Store..."
        sx={{ mb: 4 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mb: 4 }}
        onClick={handleSearch}
      >
        Search
      </Button>

      <Grid container spacing={3}>
        {stores.map((store) => (
          <Grid item xs={4} key={store.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {store.name}
                </Typography>

                <Typography>
                  {store.address}
                </Typography>

                <Typography>
                  Overall Rating :
                  {store.overallRating || 0}
                </Typography>

                <Rating
                  value={store.userRating || 0}
                  onChange={(e, value) =>
                    submitRating(store.id, value)
                  }
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}