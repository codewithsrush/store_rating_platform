import { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  PersonAdd,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const signup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/signup", form);

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        item
        md={6}
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          background:
            "linear-gradient(135deg,#16a34a,#22c55e)",
          color: "#fff",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <PersonAdd sx={{ fontSize: 120 }} />

        <Typography variant="h3" fontWeight="bold" mt={2}>
          Join Store Rating
        </Typography>

        <Typography mt={2}>
          Create your account and start rating stores.
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ background: "#f5f7fb" }}
      >
        <Paper
          elevation={8}
          sx={{
            width: 500,
            p: 5,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={4}
          >
            Create Account
          </Typography>

          <Box component="form" onSubmit={signup}>
            <TextField
              fullWidth
              label="Full Name"
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
              label="Address"
              name="address"
              margin="normal"
              value={form.address}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, py: 1.5 }}
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  color="inherit"
                />
              ) : (
                "Create Account"
              )}
            </Button>

            <Typography mt={3} textAlign="center">
              Already have an account?{" "}
              <Link
                to="/"
                style={{
                  color: "#16a34a",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}