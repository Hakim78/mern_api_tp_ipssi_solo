import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import Navbar from "./Components/Navbar/Navbar";
import ProduitsClient from "./Components/Client/ProduitsClient";
import EditCustomers from "./Components/Admin/EditCustomers";
import AdminDashboard from "./Components/Admin/adminDashboard";
function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<EditCustomers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/boutique" element={<ProduitsClient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



