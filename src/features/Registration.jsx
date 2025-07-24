import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { ENDPOINTS } from "../Constant";

function Registration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    role: "Customer",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.userName.trim()) newErrors.userName = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.passwordConfirm)
      newErrors.passwordConfirm = "Passwords do not match";
    if (formData.role === "Artist" && !formData.bio.trim()) {
      newErrors.bio = "Bio is required for artists";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(ENDPOINTS.AUTH.REGISTER, formData);
      setSuccess(true);
      alert("✅ Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        role: "Customer",
        Bio: "",
        password: "",
        passwordConfirm: "",
      });
      setErrors({});
    } catch (error) {
      console.error("❌ Registration error:", error);
      alert("❌ Registration failed.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Paper elevation={4} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#576b49ff",
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          User Registration
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                required
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                required
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="userName"
                label="Username"
                fullWidth
                required
                value={formData.userName}
                onChange={handleChange}
                error={!!errors.userName}
                helperText={errors.userName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                component="fieldset"
                fullWidth
                required
                error={!!errors.role}
              >
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Select Role
                </Typography>
                <RadioGroup
                  row
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Customer"
                    control={<Radio />}
                    label="Customer"
                  />
                  <FormControlLabel
                    value="Artist"
                    control={<Radio />}
                    label="Artist"
                  />
                </RadioGroup>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>
            </Grid>

            {formData.role === "Artist" && (
              <Grid item xs={12}>
                <TextField
                  name="bio"
                  label="Artist Bio"
                  fullWidth
                  required
                  multiline
                  minRows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  error={!!errors.bio}
                  helperText={errors.bio}
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                fullWidth
                required
                value={formData.passwordConfirm}
                onChange={handleChange}
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save />}
                sx={{ backgroundColor: "#576b49ff", mt: 2 }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Registration;
