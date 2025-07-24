import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useCart } from "./CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🛒 Your Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1">No items in the cart.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.productId}>
                <Card sx={{ height: "100%", boxShadow: 3, borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {item.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${item.sellingPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      Subtotal: $
                      {(item.sellingPrice * item.quantity).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="h5" fontWeight="bold">
              🧾 Total: ${total.toFixed(2)}
            </Typography>
            <Grid sx={{ display: "flex", gap: 5 }}>
              <Button
                variant="contained"
                color="error"
                onClick={clearCart}
                size="small"
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  alert("Checkout functionality not implemented yet")
                }
                size="small"
                sx={{ bgcolor: "#576b49ff" }}
              >
                Checkout
              </Button>
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Cart;
