import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const brandColor = "#576b49";

function Contact() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, color: brandColor }}
      >
        Contact Us
      </Typography>

      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        We'd love to hear from you! Whether you're a customer, artist, or
        partner—reach out anytime.
      </Typography>

      <Grid container spacing={4} justifyContent="center" mt={3}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: brandColor }}>
              Send us a message
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: brandColor,
                  "&:hover": { backgroundColor: "#465b3b" },
                }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={5}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom sx={{ color: brandColor }}>
              Get in touch
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              📍 Address: 123 Artisan Street, Auckland, NZ
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              📧 Email: support@handihub.co.nz
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              ☎ Phone: +64 21 123 4567
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Our support team is available Monday to Friday, 9 AM - 5 PM NZT.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contact;
