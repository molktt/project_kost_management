import React from "react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Selamat datang di sistem manajemen kost
        </p>
      </div>

      {/* Card Statistic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition">
          <h3 className="text-sm font-medium text-slate-500">Total Kamar</h3>
          <p className="text-3xl font-bold text-slate-800 mt-1">32</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition">
          <h3 className="text-sm font-medium text-slate-500">Total Penyewa</h3>
          <p className="text-3xl font-bold text-slate-800 mt-1">27</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition">
          <h3 className="text-sm font-medium text-slate-500">Pembayaran Berjalan</h3>
          <p className="text-3xl font-bold text-slate-800 mt-1">Rp 12.250.000</p>
        </div>

      </div>

      {/* Extra Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Ringkasan Aktivitas</h2>
        <p className="text-slate-500 text-sm">Grafik dan aktivitas terbaru akan ditampilkan di sini.</p>
      </div>

    </div>
  );
}
