import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/Navbar/Navigation";
import About from "./features/About";
import Contact from "./features/Contact";
import Login from "./features/Login";
import Profile from "./features/Profile";
import Registration from "./features/Registration";
import Wishlist from "./features/Wishlist";

import AddCategory from "./pages/artist/AddCategory";
import AddCustomer from "./pages/artist/AddCustomer";
import ProductManagement from "./pages/artist/AddProduct";
import CustomerTable from "./pages/artist/CustomerTable";
import EditCustomer from "./pages/artist/EditCustomer";
import EditProductForm from "./pages/artist/EditProductForm";
import ProductTable from "./pages/artist/ProductTable";
import Product from "./pages/customer/Product";
import Artist from "./pages/management/Artist";
import EditArtist from "./pages/management/EditArtist";

import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishListContext";

import Categories from "./components/Categories";
import ViewArtist from "./components/ViewArtist";
import ViewProducts from "./components/ViewProducts";

import Cart from "./features/Cart";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigation />}>
              {/* Public routes which is "Customer" */}
              <Route index element={<Product />} />
              <Route path="home" element={<Product />} />
              <Route path="aboutus" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Registration />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />

              <Route
                path="view-product/:productId"
                element={<ViewProducts />}
              />
              <Route path="view-artist/:artistId" element={<ViewArtist />} />
              <Route path="categories/:categoryId" element={<Categories />} />

              {/* Artist */}
              <Route path="add-product" element={<ProductManagement />} />
              <Route path="manage-product" element={<ProductTable />} />
              <Route
                path="edit-product/:productId"
                element={<EditProductForm />}
              />
              <Route path="add-customer" element={<AddCustomer />} />
              <Route path="customers" element={<CustomerTable />} />
              <Route
                path="update-customer/:userId"
                element={<EditCustomer />}
              />
              <Route path="add-category" element={<AddCategory />} />

              {/* Admin */}
              <Route path="artists" element={<Artist />} />
              <Route path="update-artist/:userId" element={<EditArtist />} />
            </Route>
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
