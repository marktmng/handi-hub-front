import { Login as LoginIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✔️ Use named import
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../Constant";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/profile" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Step 1: Login to get token, refreshToken, and userId
      const response = await axios.post(ENDPOINTS.AUTH.LOGIN, formData);
      const { token, refreshToken } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      // Extract or set userId
      let userId = response.data.userId;
      if (!userId) {
        const decoded = jwtDecode(token);
        userId = decoded.userId || decoded.sub;
      }
      if (userId) localStorage.setItem("userId", userId);

      // Step 2: Fetch user details (including role)
      const userRes = await axios.get(ENDPOINTS.USER.GET_BY_ID(userId), {
        headers: { Authorization: `Bearer ${token}` },
      });

      // The API returns array or object? Adjust accordingly:
      const userData = Array.isArray(userRes.data)
        ? userRes.data[0]
        : userRes.data;

      if (userData?.role) {
        localStorage.setItem("role", userData.role);
      } else {
        localStorage.setItem("role", ""); // fallback or handle no role scenario
      }
      if (userData?.firstName) {
        localStorage.setItem("firstName", userData.firstName);
      } else {
        localStorage.setItem("firstName", ""); // fallback or handle no first name scenario
      }

      alert("✅ Login successful!");
      window.dispatchEvent(new Event("loginStatusChanged"));
      setFormData({ email: "", password: "" });
      navigate("/profile");
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 6 }}>
      <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#2c3e50",
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Login
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            name="email"
            label="Email"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            startIcon={<LoginIcon />}
            sx={{ backgroundColor: "#576b49ff", mt: 3 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
