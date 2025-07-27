import { Box, Typography } from "@mui/material";
export default function Cancel() {
  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" color="error">
        ❌ Payment Cancelled.
      </Typography>
    </Box>
  );
}
