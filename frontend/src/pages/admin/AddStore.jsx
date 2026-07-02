import { useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import api from "../../services/api";

export default function AddStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/stores", form);

      alert("Store Added Successfully");

      setForm({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4">Add Store</Typography>

      <form onSubmit={submit}>
        <TextField
          fullWidth
          label="Store Name"
          name="name"
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Store Email"
          name="email"
          margin="normal"
          value={form.email}
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
          fullWidth
          label="Owner ID"
          name="owner_id"
          margin="normal"
          value={form.owner_id}
          onChange={handleChange}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Add Store
        </Button>
      </form>
    </Paper>
  );
}