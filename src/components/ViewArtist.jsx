import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../Constant";

const ViewArtist = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchArtist = async () => {
    try {
      const res = await axios.get(ENDPOINTS.ARTIST.GET_BY_ID(artistId));
      console.log("Fetched artist data:", res.data);
      setArtist(res.data); // or res.data.artist if nested
    } catch (err) {
      console.error("Failed to fetch artist", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (artistId) {
      fetchArtist();
    }
  }, [artistId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!artist) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Artist not found.
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Card>
        {artist.profileImage && (
          <CardMedia
            component="img"
            height="300"
            image={artist.profileImage}
            alt={artist.name}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {artist.name || `${artist.firstName} ${artist.lastName}`}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {artist.bio || "No bio available."}
          </Typography>
          <Typography variant="body2">Email: {artist.email}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ViewArtist;
