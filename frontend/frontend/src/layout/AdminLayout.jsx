import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Manajemen Kost</h2>
        <nav className="space-y-2">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/kamar">Kamar</Link>
          <Link to="/admin/kost">Kost</Link>
          <Link to="/admin/penyewa">Penyewa</Link>
          <Link to="/admin/booking">Booking</Link>
          <Link to="/admin/pembayaran">Pembayaran</Link>
        </nav>
      </aside>

      {/* Halaman konten */}
      <main className="flex-1 p-6">
        <Outlet />   {/* ⬅ WAJIB ADA */}
      </main>

    </div>
  );
}