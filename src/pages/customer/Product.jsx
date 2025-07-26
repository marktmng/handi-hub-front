import GradeIcon from "@mui/icons-material/Grade";
import PersonIcon from "@mui/icons-material/Person";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
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
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../Constant";
import { useCart } from "../../components/CartContext";
import { useWishlist } from "../../components/WishListContext";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Access the addToCart function
  const { addToWishlist } = useWishlist(); // Access the addToWishlist function
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search");
  const categoryId = queryParams.get("categoryId");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = ENDPOINTS.PRODUCT.GET_ALL;

      if (searchTerm) {
        url = ENDPOINTS.PRODUCT.SEARCH({ searchTerm });
      } else if (categoryId) {
        url = ENDPOINTS.PRODUCT.SEARCH({ categoryId });
      }

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, categoryId]);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ width: "100%", textAlign: "center", mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Explore Our Products
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.productId}>
              <Card
                sx={{
                  height: "100%",
                  width: "250px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  "&:hover .hover-actions": {
                    opacity: 1,
                    visibility: "visible",
                  },
                }}
              >
                <Box sx={{ height: 180, overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.productImage}
                    alt={product.productName}
                    sx={{ width: "100%", objectFit: "cover" }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
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
                </CardContent>

                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    px: 2,
                    py: 1,
                    backgroundColor: "#576b49ff",
                    zIndex: 1,
                  }}
                >
                  <Typography variant="subtitle1">
                    <del style={{ color: "white", marginRight: 8 }}>
                      ${product.actualPrice?.toFixed(2)}
                    </del>
                    <strong style={{ color: "yellow" }}>
                      ${product.sellingPrice?.toFixed(2)}
                    </strong>
                  </Typography>
                  <Typography style={{ color: "white" }} variant="body2">
                    In Stock: {product.quantity}
                  </Typography>
                </CardActions>

                <CardActions
                  className="hover-actions"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#576b49ff",
                    justifyContent: "center",
                    opacity: 0,
                    visibility: "hidden",
                    transition: "all 0.3s ease",
                    zIndex: 2,
                  }}
                >
                  <Tooltip
                    title="VIEW PRODUCT"
                    arrow
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: "#8ba57d",
                          color: "white",
                          fontSize: "0.7rem",
                        },
                      },
                    }}
                  >
                    <Button
                      sx={{ color: "white" }}
                      size="small"
                      onClick={() =>
                        navigate("/view-product/" + product.productId)
                      }
                    >
                      <RemoveRedEyeIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    title="ARTIST"
                    arrow
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: "#8ba57d",
                          color: "white",
                          fontSize: "0.7rem",
                        },
                      },
                    }}
                  >
                    <Button
                      sx={{ color: "white" }}
                      size="small"
                      onClick={() =>
                        navigate("/view-artist/" + product.artistId)
                      }
                    >
                      <PersonIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    title="ADD TO CART"
                    arrow
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: "#8ba57d",
                          color: "white",
                          fontSize: "0.7rem",
                        },
                      },
                    }}
                  >
                    <Button
                      sx={{ color: "white" }}
                      size="small"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCartSharpIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    title="ADD TO WISHLIST"
                    arrow
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: "#8ba57d",
                          color: "white",
                          fontSize: "0.7rem",
                        },
                      },
                    }}
                  >
                    <Button
                      sx={{ color: "white" }}
                      size="small"
                      onClick={() => addToWishlist(product)}
                    >
                      <GradeIcon />
                    </Button>
                  </Tooltip>
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
