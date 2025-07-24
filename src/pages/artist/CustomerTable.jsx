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

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(ENDPOINTS.CUSTOMER.GET_ALL);
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (customerId) => {
    if (!customerId) {
      alert("Invalid customer ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      await axios.delete(ENDPOINTS.CUSTOMER.DELETE(customerId), {});
      alert("✅ Customer deleted successfully!");
      fetchCustomers();
    } catch (error) {
      console.error("❌ Delete failed", error.response || error.message);
      alert(
        error.response?.data ||
          "❌ Failed to delete customer. Please try again later."
      );
    }
  };

  const handleEdit = (customerId) => {
    navigate(`/edit-customer/${customerId}`);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 4, maxWidth: 1000, margin: "auto" }}
    >
      <Typography variant="h5" sx={{ padding: 2 }}>
        Manage Customers
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : customers.length === 0 ? (
        <Typography align="center" sx={{ p: 4 }}>
          No customers found.
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {customers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer) => (
                  <TableRow
                    key={customer.customerId}
                    sx={{
                      "&:hover": { bgcolor: "grey.100" },
                    }}
                  >
                    <TableCell>{customer.firstName}</TableCell>
                    <TableCell>{customer.lastName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleEdit(customer.customerId)}
                        size="small"
                        variant="outlined"
                        color="#576b49ff"
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(customer.customerId)}
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
            count={customers.length}
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

export default CustomerTable;
