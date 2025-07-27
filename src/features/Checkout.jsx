import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("Visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  // Regex patterns for validation
  const expiryRegex = /^(0[1-9]|1[0-2])[\/-]\d{2}$/; // MM/YY or MM-YY
  const cvcRegex = /^\d{3}$/; // exactly 3 digits

  const handleFakePayment = () => {
    if (paymentMethod !== "Cash") {
      // Validate all fields present
      if (!cardNumber || !cardName || !cardExpiry || !cardCVC) {
        alert("Please fill out all payment fields.");
        navigate("/cancel");
        return;
      }

      // Validate expiry format
      if (!expiryRegex.test(cardExpiry)) {
        alert("Expiry date format is invalid. Use MM/YY.");
        return;
      }

      // Validate CVC format
      if (!cvcRegex.test(cardCVC)) {
        alert("CVC must be exactly 3 digits.");
        return;
      }
    }

    alert("Simulated payment success! 🎉");
    clearCart();
    navigate("/success");
  };

  return (
    <Box sx={{ p: 5, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        🧾 Checkout
      </Typography>

      <Paper sx={{ p: 3, mb: 4, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          🛍️ Order Summary
        </Typography>
        <List>
          {cart.map((item) => (
            <ListItem key={item.productId} sx={{ py: 1 }}>
              <ListItemText
                primary={`${item.productName} x${item.quantity}`}
                secondary={`$${item.sellingPrice.toFixed(2)} each`}
              />
              <Typography variant="body2">
                ${(item.sellingPrice * item.quantity).toFixed(2)}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      </Paper>

      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          💳 Payment Information
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={paymentMethod}
            label="Payment Method"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="Visa">Visa</MenuItem>
            <MenuItem value="Mastercard">Mastercard</MenuItem>
            <MenuItem value="Cash">Cash on Delivery</MenuItem>
          </Select>
        </FormControl>

        {paymentMethod !== "Cash" && (
          <>
            <TextField
              fullWidth
              label="Card Number"
              variant="outlined"
              sx={{ mb: 2 }}
              value={cardNumber}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                setCardNumber(onlyDigits);
              }}
              inputProps={{ maxLength: 16 }}
            />

            <TextField
              fullWidth
              label="Cardholder Name"
              variant="outlined"
              sx={{ mb: 2 }}
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Expiry (MM/YY)"
                placeholder="MM/YY"
                variant="outlined"
                value={cardExpiry}
                onChange={(e) => {
                  let value = e.target.value;

                  // Allow only digits and "/"
                  value = value.replace(/[^0-9/]/g, "");

                  // Auto-insert "/" after 2 digits if not already there
                  if (value.length === 2 && !value.includes("/")) {
                    value = value + "/";
                  }

                  // Enforce MM/YY format: max length 5 and valid month
                  if (value.length <= 5) {
                    const [mm, yy] = value.split("/");

                    // Only allow months 01–12
                    if (mm && mm.length === 2) {
                      const month = parseInt(mm);
                      if (month < 1 || month > 12) return;
                    }

                    setCardExpiry(value);
                  }
                }}
                inputProps={{ maxLength: 5 }}
              />

              <TextField
                label="CVC"
                placeholder="123"
                variant="outlined"
                value={cardCVC}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                  setCardCVC(onlyDigits);
                }}
                inputProps={{ maxLength: 3 }}
              />
            </Box>
          </>
        )}

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleFakePayment}
          disabled={cart.length === 0}
        >
          Confirm Payment - ${total.toFixed(2)}
        </Button>
      </Paper>
    </Box>
  );
}
