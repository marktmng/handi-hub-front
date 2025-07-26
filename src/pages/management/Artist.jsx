import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../Constant";

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
  TableSortLabel,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function ArtistTable() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(ENDPOINTS.USER.GET_ALL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const artistUsers = res.data.filter(
        (u) => u.role?.toLowerCase() === "artist"
      );
      setArtists(artistUsers);
    } catch (err) {
      console.error("Failed to fetch artists", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const comparator = (a, b, orderBy, orderDirection) => {
    if (!a[orderBy]) return 1;
    if (!b[orderBy]) return -1;
    const aVal = a[orderBy].toString().toLowerCase();
    const bVal = b[orderBy].toString().toLowerCase();
    if (aVal < bVal) return orderDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return orderDirection === "asc" ? 1 : -1;
    return 0;
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (userId) => {
    navigate(`/update-artist/${userId}`);
  };

  const handleDelete = (userId) => {
    console.log("Delete user:", userId);
    // Implement delete logic
  };

  const sortedArtists = [...artists].sort((a, b) =>
    comparator(a, b, orderBy, orderDirection)
  );

  const paginatedArtists = sortedArtists.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 1050, margin: "auto", mt: 4, mb: 4 }}
    >
      <Typography variant="h5" sx={{ padding: 2 }}>
        Artists
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : paginatedArtists.length === 0 ? (
        <Typography align="center" sx={{ p: 4 }}>
          No artists found.
        </Typography>
      ) : (
        <>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {[
                  { id: "firstName", label: "First Name" },
                  { id: "lastName", label: "Last Name" },
                  { id: "username", label: "username" },
                  { id: "email", label: "Email" },
                  { id: "phoneNumber", label: "Phone Number" },
                  { id: "role", label: "Role" },
                ].map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={
                      orderBy === headCell.id ? orderDirection : false
                    }
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={
                        orderBy === headCell.id ? orderDirection : "asc"
                      }
                      onClick={() => handleSortRequest(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedArtists.map((user, index) => (
                <TableRow
                  key={user.userId}
                  sx={{
                    bgcolor:
                      index % 2 === 0 ? "action.hover" : "background.paper",
                    "&:hover": { bgcolor: "grey.100" },
                  }}
                >
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      color="#576b49ff"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(user.userId)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(user.userId)}
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
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </TableContainer>
  );
}

export default ArtistTable;
