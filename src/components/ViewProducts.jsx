import GradeIcon from "@mui/icons-material/Grade";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../Constant";

function ViewProducts() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Manual ID to name maps
  const categoryMap = {
    1: "Woodcraft and Carving",
    2: "Textiles and Weaving",
    3: "Pottery and Ceramics",
    4: "Jewelry and Accessories",
    5: "Metal Crafts",
    6: "Bamboo and Rattan Products",
    7: "Leather Goods",
    8: "Recycled and Upcycled Crafts",
  };

  const artistMap = {
    11: "Bob Smith",
    12: "Alice Johnson",
    13: "Carol Taylor",
    14: "David Brown",
    15: "Emily Davis",
    16: "Grace Lee",
    17: "Jack Allen",
    18: "Kara Young",
    19: "Liam King",
    20: "Noah Scott",
    21: "Olivia Green",
    22: "Paul Adams",
    23: "Quinn Baker",
    24: "Iris Maceda",
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const productRes = await axios.get(
        ENDPOINTS.PRODUCT.GET_BY_ID(productId)
      );
      const productData = Array.isArray(productRes.data)
        ? productRes.data[0]
        : productRes.data;
      setProduct(productData);
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Product not found.
      </Typography>
    );
  }

  const categoryName = categoryMap[product.categoryId] || "Unknown Category";
  const artistFullName = artistMap[product.artistId] || "Unknown Artist";

  return (
    <Container sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", md: 400 },
              height: { xs: 300, md: 400 },
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 2,
            }}
            image={product.productImage}
            alt={product.productName}
          />

          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {product.productName}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {product.productDesc}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: "wrap" }}>
              <Chip label={categoryName} />
              <Chip
                icon={<PersonIcon />}
                color="primary"
                label={artistFullName}
                sx={{ bgcolor: "#576b49ff" }}
              />
            </Stack>

            <Typography variant="h5" sx={{ mt: 2 }}>
              <del style={{ color: "gray", marginRight: 12 }}>
                ${product.actualPrice?.toFixed(2)}
              </del>
              <strong style={{ color: "#4CAF50", fontSize: "1.6rem" }}>
                ${product.sellingPrice?.toFixed(2)}
              </strong>
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>In Stock:</strong> {product.quantity}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                sx={{ bgcolor: "#576b49ff" }}
                variant="contained"
                startIcon={<ShoppingCartIcon />}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<GradeIcon />}
              >
                Add to Wishlist
              </Button>
            </Stack>
          </CardContent>
        </Box>
      </Paper>
    </Container>
  );
}

export default ViewProducts;
