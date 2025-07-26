import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ENDPOINTS } from "../../Constant";

function EditArtist() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchCustomer = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(ENDPOINTS.USER.GET_BY_ID(userId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = res.data[0]; // assuming array
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userName: user.userName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        role: user.role || "",
      });
    } catch (err) {
      console.error("Failed to load customer", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setSubmitting(true);

    const payload = {
      UserId: parseInt(userId),
      FirstName: formData.firstName.trim(),
      LastName: formData.lastName.trim(),
      UserName: formData.userName.trim(),
      Email: formData.email.trim(),
      PhoneNumber: formData.phoneNumber.trim(),
      Role: formData.role,
    };

    console.log("Submitting payload:", payload);

    try {
      await axios.put(ENDPOINTS.USER.UPDATE(userId), payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Artist updated successfully.");
      navigate("/artists");
    } catch (err) {
      console.error(
        "Failed to update artist",
        err.response?.data || err.message
      );
      alert("Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ maxWidth: 500, margin: "auto", mt: 4, p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Update Artist
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
        />

        <TextField
          label="Username"
          name="userName"
          fullWidth
          margin="normal"
          value={formData.userName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          margin="normal"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        {/* ✅ Radio Buttons for Role */}
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Role</FormLabel>
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
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={submitting}
          sx={{ mt: 3, backgroundColor: "#576b49ff" }}
        >
          {submitting ? "Saving..." : "Update Artist"}
        </Button>
      </form>
    </Paper>
  );
}

export default EditArtist;
