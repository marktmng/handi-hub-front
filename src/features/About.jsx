import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

const brandColor = "#576b49";

function About() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, color: brandColor }}
      >
        About Us
      </Typography>

      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        Empowering Local Artists through Modern E-commerce
      </Typography>

      <Divider sx={{ my: 4, borderColor: brandColor }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ color: brandColor }}>
            What is HandiHub?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            HandiHub is a modern e-commerce platform designed to connect
            talented local artisans with customers who value handcrafted,
            authentic products. We aim to enhance accessibility and exposure for
            artists while delivering a seamless shopping experience for
            customers.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ color: brandColor }}>
            Our Mission
          </Typography>
          <Typography variant="body1" color="text.secondary">
            To bridge the gap between traditional craftsmanship and modern
            consumers by building a scalable and intuitive platform powered by
            RESTful APIs, reusable components, and secure infrastructure.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ color: brandColor }}>
            Why Component-Based?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Our frontend is built using reusable React components that ensure
            faster development, easy maintenance, and consistent user experience
            across devices. Each feature—like the cart, authentication, or
            artist portal—is modular and efficient.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ color: brandColor }}>
            RESTful API Integration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            HandiHub’s backend uses RESTful APIs to allow smooth communication
            between frontend and server. This architecture supports scalability,
            mobile integration, and third-party services in the future.
          </Typography>
        </Grid>
      </Grid>

      <Box mt={6}>
        <Card elevation={3} sx={{ borderLeft: `6px solid ${brandColor}` }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: brandColor }}>
              Want to learn more or get involved?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Whether you're an artist looking to join, a developer interested
              in our architecture, or a customer wanting authentic handmade
              products — HandiHub welcomes you. Let's grow together.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default About;
