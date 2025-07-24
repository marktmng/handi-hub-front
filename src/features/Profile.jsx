import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../Constant";

const UserProfile = () => {
  const token = localStorage.getItem("token"); // ← Check token
  const userId = localStorage.getItem("userId");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    role: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(ENDPOINTS.USER.GET_BY_ID(userId), {
          headers: {
            Authorization: `Bearer ${token}`, // <-- add token here
          },
        });

        const data = Array.isArray(res.data) ? res.data[0] : res.data;

        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          userName: data.userName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          role: data.role || "",
          password: "",
        });
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (!userId) return;

    try {
      await axios.put(
        ENDPOINTS.USER.UPDATE(userId),
        { ...userData, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // <-- add token here as well
          },
        }
      );

      alert("✅ Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("❌ Update failed:", error);
      alert("Failed to update profile.");
    }
  };

  // ✅ Redirect if not logged in
  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            🔒 Please login to view your profile.
          </Typography>
          <Button
            variant="contained"
            href="/login"
            sx={{ backgroundColor: "#576b49ff", mt: 2 }}
          >
            Go to Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          {/* First Name */}
          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField
                label="First Name"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography>
                <strong>First Name:</strong> {userData.firstName}
              </Typography>
            )}
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            {isEditing ? (
              <TextField
                label="Last Name"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography>
                <strong>Last Name:</strong> {userData.lastName}
              </Typography>
            )}
          </Grid>

          {/* Username */}
          <Grid item xs={12}>
            {isEditing ? (
              <TextField
                label="Username"
                name="userName"
                value={userData.userName}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography>
                <strong>Username:</strong> {userData.userName}
              </Typography>
            )}
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            {isEditing ? (
              <TextField
                label="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography>
                <strong>Email:</strong> {userData.email}
              </Typography>
            )}
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12}>
            {isEditing ? (
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography>
                <strong>Phone:</strong> {userData.phoneNumber}
              </Typography>
            )}
          </Grid>

          {/* Role */}
          <Grid item xs={12}>
            <Typography>
              <strong>Role:</strong> {userData.role}
            </Typography>
          </Grid>

          {/* Password */}
          {isEditing && (
            <Grid item xs={12}>
              <TextField
                label="New Password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          )}
        </Grid>

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            color={isEditing ? "warning" : "#"}
            onClick={handleEditToggle}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
          {isEditing && (
            <Button
              sx={{ ml: 2, backgroundColor: "#576b49ff" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;
