import { useEffect, useMemo, useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Box,
  Chip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import api from "../../services/api";

export default function Users() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    api.get("/admin/users").then((res) => {

      setUsers(res.data.users);

    });

  }, []);

  const filteredUsers = useMemo(() => {

    return users.filter((user) =>

      user.name.toLowerCase().includes(search.toLowerCase()) ||

      user.email.toLowerCase().includes(search.toLowerCase()) ||

      user.address.toLowerCase().includes(search.toLowerCase())

    );

  }, [users, search]);

  const columns = [

    {
      field: "id",
      headerName: "ID",
      width: 90,
    },

    {
      field: "name",
      headerName: "Name",
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
      field: "role",
      headerName: "Role",
      width: 150,

      renderCell: (params) => (

        <Chip
          label={params.value}
          color={
            params.value === "admin"
              ? "error"
              : params.value === "owner"
              ? "warning"
              : "success"
          }
        />

      ),

    },

  ];

  return (

    <Paper sx={{ p: 3 }}>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Users
      </Typography>

      <Box mb={3}>

        <TextField

          fullWidth

          label="Search User"

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

      </Box>

      <div style={{ height: 600 }}>

        <DataGrid

          rows={filteredUsers}

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