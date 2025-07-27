import { Box, Typography } from "@mui/material";
export default function Success() {
  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" color="green">
        ✅ Payment Successful!
      </Typography>
    </Box>
  );
}
