import { Alert, Box, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../Constant";
import UserCard from "../../components/UserCard";

function ArtistCustomerView() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchArtists = async () => {
    setLoading(true);
    try {
      const res = await axios.get(ENDPOINTS.ARTIST.GET_ALL);
      setArtists(res.data);
    } catch (err) {
      setError("Failed to fetch artists");
      console.error("Failed to fetch artists", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{ textAlign: "center", color: "#576b49ff", fontWeight: 700 }}
        variant="h4"
        gutterBottom
      >
        Meet Our Artists
      </Typography>
      <Grid sx={{ mt: 2, justifyContent: "center" }} container spacing={3}>
        {artists.map((artist) => (
          <Grid item xs={12} sm={6} md={4} key={artist.userName}>
            <UserCard user={artist} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ArtistCustomerView;
