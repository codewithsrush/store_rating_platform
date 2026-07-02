import { useState, useContext } from "react";
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
  Storefront,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.data.user.role === "owner") {
        navigate("/owner/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
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
        <Storefront sx={{ fontSize: 120 }} />

        <Typography
          variant="h3"
          fontWeight="bold"
          mt={2}
        >
          Store Rating Platform
        </Typography>

        <Typography mt={2}>
          Rate • Review • Discover
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: "#f5f7fb",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: 450,
            p: 5,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={4}
            textAlign="center"
          >
            Welcome Back 👋
          </Typography>

          <Box
            component="form"
            onSubmit={login}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
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
              sx={{
                mt: 3,
                py: 1.5,
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  color="inherit"
                />
              ) : (
                "Login"
              )}
            </Button>

            <Typography
              mt={3}
              textAlign="center"
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#16a34a",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}