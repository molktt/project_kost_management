import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  const menu = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/kamar", label: "Kamar", icon: "🛏️" },
    { path: "/admin/kost", label: "Kost", icon: "🏠" },
    { path: "/admin/penyewa", label: "Penyewa", icon: "👥" },
    { path: "/admin/booking", label: "Booking", icon: "📝" },
    { path: "/admin/pembayaran", label: "Pembayaran", icon: "💳" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800">
        {/* Brand / Logo */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
            K
          </div>
          <div>
            <h2 className="text-sm font-semibold leading-tight">
              Manajemen Kost
            </h2>
            <p className="text-[11px] text-slate-400">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer user info / logout placeholder */}
        <div className="px-4 py-3 border-t border-slate-800 text-xs text-slate-400">
          <p className="font-medium text-slate-200">Admin</p>
          <p>© {new Date().getFullYear()} Kost Manager</p>
        </div>
      </aside>

      {/* Konten utama */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
