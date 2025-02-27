import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashBoardPage from "./pages/Admin/AdminDashBoardPage";
import CreateProductPage from "./pages/Admin/CreateProductPage";
import AllOrdersPage from "./pages/Admin/AllOrdersPage";
import AllProductsPage from "./pages/Admin/AllProductsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/product/:id' element={<ProductDetailsPage />}></Route>
          <Route path="/admin" element={<AdminDashBoardPage />} />
          <Route path="/admin/create-product" element={<CreateProductPage />} />
          <Route path="/admin/orders" element={<AllOrdersPage />} />
          <Route path="/admin/product" element={<AllProductsPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
