import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LeftDrawer from "./components/Navbar/LeftDrawer";
import ProductManagement from "./pages/artist/AddProduct";
import EditProductForm from "./pages/artist/EditProductForm";
import ProductTable from "./pages/artist/ProductTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeftDrawer />}>
          <Route path="add-product" element={<ProductManagement />} />
          <Route path="manage-product" element={<ProductTable />} />
          <Route path="edit-product/:productId" element={<EditProductForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
