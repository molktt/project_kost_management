import { useEffect, useState } from "react";
import API from "../services/api";

export default function Pembayaran() {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await API.get("/pembayaran"); // sesuaikan endpoint backend
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);

  const formatDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Pembayaran</h1>
          <p className="text-slate-500 text-sm">
            Kelola transaksi pembayaran kost.
          </p>
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          + Tambah Pembayaran
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white p-5 rounded-xl shadow border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="px-4 py-3 font-semibold">Nama Penyewa</th>
              <th className="px-4 py-3 font-semibold">Kamar</th>
              <th className="px-4 py-3 font-semibold">Jumlah</th>
              <th className="px-4 py-3 font-semibold">Tanggal</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="border-b hover:bg-slate-50 transition">
                <td className="px-4 py-3">{p.nama_penyewa}</td>
                <td className="px-4 py-3">{p.nama_kamar}</td>
                <td className="px-4 py-3">{formatRupiah(p.jumlah)}</td>
                <td className="px-4 py-3">{formatDate(p.tanggal)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        p.status === "Lunas"
                          ? "bg-green-100 text-green-700"
                          : p.status === "Tertunda"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700 transition">
                    Detail
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-slate-300 text-xs hover:bg-slate-50 transition">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-5 text-slate-500">
                  Belum ada data pembayaran.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
