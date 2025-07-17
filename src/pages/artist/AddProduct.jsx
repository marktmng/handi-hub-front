import { Save } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../Constant";

function AddProduct() {
  const [product, setProduct] = useState({
    productId: 0,
    productName: "",
    categoryId: "",
    productDesc: "",
    actualPrice: 0,
    sellingPrice: 0,
    quantity: 0,
    artistId: "",
  });

  const [categories, setCategories] = useState([]);
  const [artists, setArtists] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, artistRes] = await Promise.all([
          axios.get(ENDPOINTS.CATEGORY.GET_ALL),
          axios.get(ENDPOINTS.ARTIST.GET_ALL),
        ]);

        console.log("📦 Categories:", catRes.data);
        console.log("🎨 Artists:", artistRes.data);

        setCategories(catRes.data || []);
        setArtists(artistRes.data || []);
      } catch (error) {
        console.error("❌ Failed to fetch categories or artists", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (["actualPrice", "sellingPrice", "quantity"].includes(name)) {
      setProduct((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.productName.trim())
      newErrors.productName = "Product name is required";
    if (!product.productDesc.trim())
      newErrors.productDesc = "Product description is required";
    if (!selectedFile) newErrors.productImage = "Product image is required";
    if (product.actualPrice <= 0)
      newErrors.actualPrice = "Price must be greater than 0";
    if (product.sellingPrice <= 0)
      newErrors.sellingPrice = "Price must be greater than 0";
    if (product.quantity < 0)
      newErrors.quantity = "Quantity cannot be negative";
    if (!product.categoryId) newErrors.categoryId = "Please select a category";
    if (!product.artistId) newErrors.artistId = "Please select an artist";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("ProductId", product.productId);
    formData.append("ProductName", product.productName);
    formData.append("ProductDesc", product.productDesc);
    formData.append("ActualPrice", product.actualPrice);
    formData.append("SellingPrice", product.sellingPrice);
    formData.append("Quantity", product.quantity);
    formData.append("CategoryId", Number(product.categoryId));
    formData.append("ArtistId", Number(product.artistId));

    if (selectedFile) {
      formData.append("ProductImageFile", selectedFile);
      // Send a non-empty placeholder string here to satisfy backend validation
      formData.append("ProductImage", "temp");
    } else if (product.productImage && product.productImage.trim() !== "") {
      formData.append("ProductImage", product.productImage);
    } else {
      // Send empty string if no image at all, so frontend validation should catch this first
      formData.append("ProductImage", "");
    }

    try {
      const response = await axios.post(ENDPOINTS.PRODUCT.UPSERT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Product added successfully!");
      // reset form...
      setProduct({
        productId: 0,
        productName: "",
        categoryId: "",
        productDesc: "",
        actualPrice: 0,
        sellingPrice: 0,
        quantity: 0,
        artistId: "",
      });
      setSelectedFile(null);
      setImagePreview("");
      setErrors({});
    } catch (error) {
      console.error("⚠️ Upload failed:", error.response?.data || error);
      alert(
        error?.response?.data?.message ||
          "Upload failed. Check console for details."
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
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
          Add Product
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="productName"
                label="Product Name"
                value={product.productName}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.productName}
                helperText={errors.productName}
                sx={{ mb: 2 }}
              />

              <TextField
                name="productDesc"
                label="Product Description"
                value={product.productDesc}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
                error={!!errors.productDesc}
                helperText={errors.productDesc}
                sx={{ mb: 2 }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="actualPrice"
                    label="Actual Price ($)"
                    type="number"
                    value={product.actualPrice}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.actualPrice}
                    helperText={errors.actualPrice}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="sellingPrice"
                    label="Selling Price ($)"
                    type="number"
                    value={product.sellingPrice}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.sellingPrice}
                    helperText={errors.sellingPrice}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="quantity"
                    label="Quantity in Stock"
                    type="number"
                    value={product.quantity}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.quantity}
                    helperText={errors.quantity}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Product Image</Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginTop: 8 }}
                />
                {errors.productImage && (
                  <FormHelperText error>{errors.productImage}</FormHelperText>
                )}
              </Box>

              {imagePreview && (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    width: "50%",
                    height: "50%",
                    maxHeight: 70,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: "1px solid #ddd",
                    mt: 1,
                    bgcolor: "#f0f0f0",
                  }}
                />
              )}

              <FormControl
                fullWidth
                required
                error={!!errors.categoryId}
                sx={{ mt: 3 }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={product.categoryId}
                  onChange={handleChange}
                  label="Category"
                  width="50%"
                >
                  <MenuItem value="">Select a category</MenuItem>
                  {categories.map((cat, idx) => (
                    <MenuItem
                      key={cat?.categoryId || idx}
                      value={(cat?.categoryId || idx).toString()}
                    >
                      {cat?.categoryName || "Unnamed Category"}
                    </MenuItem>
                  ))}
                </Select>
                {errors.categoryId && (
                  <FormHelperText>{errors.categoryId}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                required
                error={!!errors.artistId}
                sx={{ mt: 3 }}
              >
                <InputLabel>Artist</InputLabel>
                <Select
                  name="artistId"
                  value={product.artistId}
                  onChange={handleChange}
                  label="Artist"
                  width="50%"
                >
                  <MenuItem value="">Select an artist</MenuItem>
                  {artists.map((artist, idx) => {
                    const artistId = artist?.artistId || idx;
                    const firstName = artist?.firstName;
                    const lastName = artist?.lastName;
                    const fullName =
                      firstName && lastName
                        ? `${firstName} ${lastName}`
                        : "Unnamed Artist";

                    return (
                      <MenuItem key={artistId} value={artistId.toString()}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                            {firstName?.[0] || "?"}
                            {lastName?.[0] || ""}
                          </Avatar>
                          {fullName}
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Select>
                {errors.artistId && (
                  <FormHelperText>{errors.artistId}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save />}
                sx={{ backgroundColor: "#928371ff", mt: 2 }}
              >
                Save Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddProduct;
