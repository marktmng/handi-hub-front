import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../Constant";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(ENDPOINTS.PRODUCT.GET_ALL);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const productUpdated = localStorage.getItem("productUpdated");
    if (productUpdated === "true") {
      fetchProducts();
      localStorage.removeItem("productUpdated");
    } else {
      fetchProducts();
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Explore Our Products
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          No products available at the moment.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.productName}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "250px",
                  height: "100%",
                }}
              >
                {/* 🔧 Fixed-height image container */}
                <Box
                  sx={{
                    height: 180,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.productImage}
                    alt={product.productName}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Product Info */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.productName}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {product.productDesc}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    <del style={{ color: "#888", marginRight: 8 }}>
                      ${product.actualPrice?.toFixed(2)}
                    </del>
                    <strong style={{ color: "#d32f2f" }}>
                      ${product.sellingPrice?.toFixed(2)}
                    </strong>
                  </Typography>
                </CardContent>

                {/* Actions */}
                <CardActions
                  sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                >
                  <Typography variant="body2">
                    In Stock: {product.quantity}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ bgcolor: "#928371ff" }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Product;
