import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../Constant";

function ArtistTable() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const fetchArtists = async () => {
    setLoading(true);
    try {
      const res = await axios.get(ENDPOINTS.ARTIST.GET_ALL);
      setArtists(res.data);
    } catch (err) {
      console.error("Failed to fetch artists", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleDelete = async (artistId) => {
    if (!artistId) {
      alert("Invalid artist ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this artist?")) return;

    try {
      await axios.delete(ENDPOINTS.ARTIST.DELETE(artistId), {});
      alert("✅ Artist deleted successfully!");
      fetchArtists();
    } catch (error) {
      console.error("❌ Delete failed", error.response || error.message);
      alert(
        error.response?.data ||
          "❌ Failed to delete artist. Please try again later."
      );
    }
  };

  const handleEdit = (artistId) => {
    navigate(`/edit-artist/${artistId}`);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 4, maxWidth: 1000, margin: "auto" }}
    >
      <Typography variant="h5" sx={{ padding: 2 }}>
        Manage Artists
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : artists.length === 0 ? (
        <Typography align="center" sx={{ p: 4 }}>
          No artists found.
        </Typography>
      ) : (
        <>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Bio</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {artists
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((artist) => (
                  <TableRow
                    key={artist.artistId}
                    sx={{
                      "&:hover": { bgcolor: "grey.100" },
                    }}
                  >
                    <TableCell>{artist.firstName}</TableCell>
                    <TableCell>{artist.lastName}</TableCell>
                    <TableCell>{artist.email}</TableCell>
                    <TableCell>{artist.phoneNumber}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 250,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {artist.bio}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleEdit(artist.artistId)}
                        size="small"
                        variant="outlined"
                        color="#576b49ff"
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(artist.artistId)}
                        size="small"
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[10, 15, 25]}
            component="div"
            count={artists.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </>
      )}
    </TableContainer>
  );
}

export default ArtistTable;
