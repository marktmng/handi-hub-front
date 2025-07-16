import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../Constant";

import {
  Box,
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

function ManagementDashBoard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sorting state
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Adjust default rows per page

  // Fetch users function
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(ENDPOINTS.USER.GET_ALL);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Sorting handler
  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  // Comparator for sorting
  const comparator = (a, b) => {
    if (!a[orderBy]) return 1;
    if (!b[orderBy]) return -1;
    if (
      a[orderBy].toString().toLowerCase() < b[orderBy].toString().toLowerCase()
    ) {
      return orderDirection === "asc" ? -1 : 1;
    }
    if (
      a[orderBy].toString().toLowerCase() > b[orderBy].toString().toLowerCase()
    ) {
      return orderDirection === "asc" ? 1 : -1;
    }
    return 0;
  };

  const sortedUsers = [...users].sort(comparator);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 whenever rowsPerPage changes
  };

  // Calculate sliced data to show on current page
  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 900, margin: "auto", mt: 4 }}
    >
      <Typography variant="h5" sx={{ padding: 2 }}>
        Management Dashboard - Users
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : users.length === 0 ? (
        <Typography align="center" sx={{ p: 4 }}>
          No users found.
        </Typography>
      ) : (
        <>
          <Table aria-label="users table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {[
                  { id: "firstName", label: "First Name" },
                  { id: "lastName", label: "Last Name" },
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
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedUsers.map((user, index) => (
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
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[10, 15, 25]}
            component="div"
            count={users.length}
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

export default ManagementDashBoard;
