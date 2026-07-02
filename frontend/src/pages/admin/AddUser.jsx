import { useState } from "react";
import { TextField, Button, Paper, Typography, MenuItem } from "@mui/material";
import api from "../../services/api";

export default function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/users", form);
      alert("User Added Successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "user",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4">Add User</Typography>

      <form onSubmit={submit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={form.password}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          margin="normal"
          value={form.address}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="owner">Store Owner</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Add User
        </Button>
      </form>
    </Paper>
  );
}