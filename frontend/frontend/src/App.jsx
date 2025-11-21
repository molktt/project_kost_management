import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Kamar from "./pages/Kamar.jsx";
import Kost from "./pages/Kost.jsx";
import Penyewa from "./pages/Penyewa.jsx";
import Booking from "./pages/Booking.jsx";
import Pembayaran from "./pages/Pembayaran.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="kamar" element={<Kamar />} />
          <Route path="kost" element={<Kost />} />
          <Route path="penyewa" element={<Penyewa />} />
          <Route path="booking" element={<Booking />} />
          <Route path="pembayaran" element={<Pembayaran />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;