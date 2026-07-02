import { useEffect, useMemo, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../services/api";
import StoreCard from "../../components/user/StoreCard";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const loadStores = async () => {
    try {
      setLoading(true);

      const res = await api.get("/user/stores");

      setStores(res.data.stores);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Unable to load stores",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const filteredStores = useMemo(() => {
    return stores.filter(
      (store) =>
        store.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        store.address
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [stores, search]);

  const handleRating = async (storeId, rating) => {
    try {
      await api.post("/user/rating", {
        store_id: storeId,
        rating,
      });

      setSnackbar({
        open: true,
        message: "Rating Saved Successfully",
        severity: "success",
      });

      loadStores();
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to submit rating",
        severity: "error",
      });
    }
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={8}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Browse Stores
      </Typography>

      <TextField
        fullWidth
        placeholder="Search by Store Name or Address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="success" />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {filteredStores.length === 0 ? (
          <Grid item xs={12}>
            <Typography
              align="center"
              color="text.secondary"
            >
              No Stores Found
            </Typography>
          </Grid>
        ) : (
          filteredStores.map((store) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={store.id}
            >
              <StoreCard
  store={store}
  onRate={handleRating}
/>
            </Grid>
          ))
        )}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}