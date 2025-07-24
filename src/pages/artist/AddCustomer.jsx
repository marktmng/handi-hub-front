import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../Constant";

const AddCustomer = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(""); // store as number or null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(ENDPOINTS.USER.GET_ALL);
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (selectedUserId === null) {
      alert("Please select a user.");
      return;
    }

    // Find the full user object
    const selectedUser = users.find((user) => user.userId === selectedUserId);

    if (!selectedUser) {
      alert("Selected user not found.");
      return;
    }

    // Create payload matching Swagger format
    const payload = {
      customerId: 0,
      userId: selectedUser.userId, // top-level userId
      user: {
        // nested user object
        ...selectedUser,
        userId: selectedUser.userId, // ensure userId is included here too
      },
    };

    try {
      setLoading(true);
      await axios.post(ENDPOINTS.CUSTOMER.UPSERT, payload);
      alert("Customer added successfully");
      setSelectedUserId(null);
    } catch (error) {
      console.error("Failed to add customer:", error.response?.data || error);
      alert("Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Add Customer
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel>Select User</InputLabel>
          <Select
            labelId="userId"
            value={selectedUserId}
            label="Select User"
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
          >
            <MenuItem value="" disabled>
              Select a Customer
            </MenuItem>
            {users
              .filter((user) => user.role === "Customer")
              .map((user, idx) => (
                <MenuItem
                  key={user.userId || idx}
                  value={(user.userId || idx).toString()}
                >
                  {user.firstName} {user.lastName} ({user.email})
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Box textAlign="center">
          <Button
            sx={{ backgroundColor: "#576b49ff", mt: 2 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Customer"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddCustomer;
