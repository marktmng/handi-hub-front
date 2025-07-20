import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LeftDrawer from "./components/Navbar/Navigation";
import About from "./features/About";
import Contact from "./features/Contact";
import Login from "./features/Login";
import Profile from "./features/Profile";
import Registration from "./features/Registration";
import AddCustomer from "./pages/artist/AddCustomer";
import ProductManagement from "./pages/artist/AddProduct";
import CustomerTable from "./pages/artist/CustomerTable";
import EditCustomer from "./pages/artist/EditCustomer";
import EditProductForm from "./pages/artist/EditProductForm";
import ProductTable from "./pages/artist/ProductTable";
import Product from "./pages/customer/Product";
import Artist from "./pages/management/Artist";
import EditArtist from "./pages/management/EditArtist";
import Users from "./pages/management/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeftDrawer />}>
          {/* This section for all users */}
          <Route path="aboutus" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          {/* This shows Product on for customer "/" */}
          <Route index element={<Product />} />{" "}
          {/* This section for product management for artist "/artist" */}
          <Route path="add-product" element={<ProductManagement />} />
          <Route path="manage-product" element={<ProductTable />} />
          <Route path="edit-product/:productId" element={<EditProductForm />} />
          {/* This section for customer management for artist */}
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="manage-customer" element={<CustomerTable />} />
          <Route path="edit-customer/:customerId" element={<EditCustomer />} />
          {/* This section for admin dashboard */}
          <Route path="artists" element={<Artist />} />
          <Route path="edit-artist/:artistId" element={<EditArtist />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
