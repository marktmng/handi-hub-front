import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { ENDPOINTS } from "../../Constant"; // Adjust the path as needed

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = {
        categoryId: 0, // Always 0 for new entries
        categoryName,
      };

      await axios.post(ENDPOINTS.CATEGORY.UPSERT, payload);

      setSuccessMsg("Category added successfully!");
      setCategoryName("");
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          margin="normal"
        />
        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ mt: 2, bgcolor: "#576b49ff" }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Category"}
        </Button>
      </form>
    </Box>
  );
}

export default AddCategory;
