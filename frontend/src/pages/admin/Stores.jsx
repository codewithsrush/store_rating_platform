import { useEffect, useMemo, useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Chip,
  Box,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import api from "../../services/api";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/admin/stores").then((res) => {
      setStores(res.data.stores);
    });
  }, []);

  const filteredStores = useMemo(() => {
    return stores.filter((store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.email.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
    );
  }, [stores, search]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      headerName: "Store Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Average Rating",
      width: 180,
      renderCell: (params) => (
        <Chip
          label={params.value ?? 0}
          color={
            params.value >= 4
              ? "success"
              : params.value >= 2
              ? "warning"
              : "error"
          }
        />
      ),
    },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Stores
      </Typography>

      <Box mb={3}>
        <TextField
          fullWidth
          label="Search Store"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <div style={{ height: 600 }}>
        <DataGrid
          rows={filteredStores}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </div>
    </Paper>
  );
}