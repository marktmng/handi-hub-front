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
import { jwtDecode } from "jwt-decode";
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
      console.log("🔐 Attempting login with:", formData);

      // Step 1: Login
      const response = await axios.post(ENDPOINTS.AUTH.LOGIN, {
        email: formData.email.trim(),
        password: formData.password,
      });

      const { token, refreshToken, userId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      // Extract userId from token if not included in response
      let finalUserId = userId;
      if (!finalUserId) {
        const decoded = jwtDecode(token);
        finalUserId = decoded.userId || decoded.sub;
      }

      if (finalUserId) {
        localStorage.setItem("userId", finalUserId);
      } else {
        throw new Error("User ID not found in token or response.");
      }

      // Step 2: Fetch full user data
      const userRes = await axios.get(ENDPOINTS.USER.GET_BY_ID(finalUserId), {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = Array.isArray(userRes.data)
        ? userRes.data[0]
        : userRes.data;

      // Store useful user data
      localStorage.setItem("role", userData?.role || "");
      localStorage.setItem("firstName", userData?.firstName || "");
      localStorage.setItem("lastName", userData?.lastName || "");

      alert("✅ Login successful!");
      window.dispatchEvent(new Event("loginStatusChanged"));
      setFormData({ email: "", password: "" });
      navigate("/profile");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";
      console.error("❌ Login error:", error.response || error);
      alert(`❌ ${message}`);
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
