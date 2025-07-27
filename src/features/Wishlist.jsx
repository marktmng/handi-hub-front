import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../components/WishListContext.jsx";

function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Block access if not logged in
  if (!token || userRole !== "Customer") {
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          🚫 Access Denied
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please log in as a Customer to access the wishlist cart.
        </Typography>
        <Button
          sx={{ bgcolor: "#576b49ff" }}
          variant="contained"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        ⭐ Your Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Typography variant="body1">No items in your wishlist.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {wishlist.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.productId}>
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: 3,
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 2, width: 250, height: 300 }}>
                    <Box sx={{ height: 180, overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={item.productImage}
                        alt={item.productName}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      {item.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${item.sellingPrice.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, height: 50, overflow: "hidden" }}
                    >
                      Description: {item.productDesc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => removeFromWishlist(item.productId)}
                    >
                      Remove
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ bgcolor: "#576b49ff" }}
                      onClick={() =>
                        navigate(`/view-product/${item.productId}`)
                      }
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="error"
              onClick={clearWishlist}
              size="small"
            >
              Clear Wishlist
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Wishlist;
