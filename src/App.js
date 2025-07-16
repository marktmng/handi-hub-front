import "./App.css";
import Product from "./pages/customer/Product";
import ProductManagement from "./pages/management/ProductManagement";

function App() {
  return (
    <div className="App">
      <ProductManagement />
      <Product />
      {/* <ManagementDashBoard /> */}
    </div>
  );
}

export default App;
