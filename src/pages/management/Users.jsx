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

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sorting state for both tables
  const [orderDirectionArtist, setOrderDirectionArtist] = useState("asc");
  const [orderByArtist, setOrderByArtist] = useState("firstName");

  const [orderDirectionCustomer, setOrderDirectionCustomer] = useState("asc");
  const [orderByCustomer, setOrderByCustomer] = useState("firstName");

  // Pagination state for both tables
  const [pageArtist, setPageArtist] = useState(0);
  const [rowsPerPageArtist, setRowsPerPageArtist] = useState(10);

  const [pageCustomer, setPageCustomer] = useState(0);
  const [rowsPerPageCustomer, setRowsPerPageCustomer] = useState(10);

  // Fetch users
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

  // Sorting comparator (generic)
  const comparator = (a, b, orderBy, orderDirection) => {
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

  // Sorting handlers
  const handleSortRequestArtist = (cellId) => {
    const isAsc = orderByArtist === cellId && orderDirectionArtist === "asc";
    setOrderDirectionArtist(isAsc ? "desc" : "asc");
    setOrderByArtist(cellId);
  };

  const handleSortRequestCustomer = (cellId) => {
    const isAsc =
      orderByCustomer === cellId && orderDirectionCustomer === "asc";
    setOrderDirectionCustomer(isAsc ? "desc" : "asc");
    setOrderByCustomer(cellId);
  };

  // Pagination handlers
  const handleChangePageArtist = (event, newPage) => {
    setPageArtist(newPage);
  };

  const handleChangeRowsPerPageArtist = (event) => {
    setRowsPerPageArtist(parseInt(event.target.value, 10));
    setPageArtist(0);
  };

  const handleChangePageCustomer = (event, newPage) => {
    setPageCustomer(newPage);
  };

  const handleChangeRowsPerPageCustomer = (event) => {
    setRowsPerPageCustomer(parseInt(event.target.value, 10));
    setPageCustomer(0);
  };

  // Filter users by role
  const artists = users.filter((u) => u.role.toLowerCase() === "artist");
  const customers = users.filter((u) => u.role.toLowerCase() === "customer");

  // Sort users by role
  const sortedArtists = [...artists].sort((a, b) =>
    comparator(a, b, orderByArtist, orderDirectionArtist)
  );
  const sortedCustomers = [...customers].sort((a, b) =>
    comparator(a, b, orderByCustomer, orderDirectionCustomer)
  );

  // Paginate users by role
  const paginatedArtists = sortedArtists.slice(
    pageArtist * rowsPerPageArtist,
    pageArtist * rowsPerPageArtist + rowsPerPageArtist
  );

  const paginatedCustomers = sortedCustomers.slice(
    pageCustomer * rowsPerPageCustomer,
    pageCustomer * rowsPerPageCustomer + rowsPerPageCustomer
  );

  // Dummy handlers - replace with real logic
  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
    // navigate to edit page or open modal
  };

  const handleDelete = (userId) => {
    console.log("Delete user:", userId);
    // show confirmation and call API to delete
  };

  // Render table for given data and handlers
  const renderTable = (
    title,
    data,
    orderBy,
    orderDirection,
    onSort,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange
  ) => (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 900, margin: "auto", mt: 4, mb: 4 }}
    >
      <Typography variant="h5" sx={{ padding: 2 }}>
        {title}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : data.length === 0 ? (
        <Typography align="center" sx={{ p: 4 }}>
          No users found.
        </Typography>
      ) : (
        <>
          <Table aria-label={`${title} table`} sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {[
                  { id: "firstName", label: "First Name" },
                  { id: "lastName", label: "Last Name" },
                  { id: "email", label: "Email" },
                  { id: "phoneNumber", label: "Phone Number" },
                  { id: "role", label: "Role" },
                  { id: "bio", label: "Bio" },
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
                      onClick={() => onSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((user, index) => (
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
                  <TableCell>{user.bio}</TableCell>
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        </>
      )}
    </TableContainer>
  );

  return (
    <>
      {renderTable(
        "Artists",
        paginatedArtists,
        orderByArtist,
        orderDirectionArtist,
        handleSortRequestArtist,
        pageArtist,
        rowsPerPageArtist,
        handleChangePageArtist,
        handleChangeRowsPerPageArtist
      )}

      {renderTable(
        "Customers",
        paginatedCustomers,
        orderByCustomer,
        orderDirectionCustomer,
        handleSortRequestCustomer,
        pageCustomer,
        rowsPerPageCustomer,
        handleChangePageCustomer,
        handleChangeRowsPerPageCustomer
      )}
    </>
  );
}

export default Users;
