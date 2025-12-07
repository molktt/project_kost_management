import { useEffect, useState } from "react";
import API from "../services/api";

export default function Penyewa() {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await API.get("/penyewa"); // sesuaikan endpoint kalau beda
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

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
          <h1 className="text-2xl font-bold text-slate-800">Data Penyewa</h1>
          <p className="text-slate-500 text-sm">
            Daftar penghuni kost yang terdaftar di sistem.
          </p>
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          + Tambah Penyewa
        </button>
      </div>

      {/* Tabel Penyewa */}
      <div className="bg-white p-5 rounded-xl shadow border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="px-4 py-3 font-semibold">Nama</th>
              <th className="px-4 py-3 font-semibold">Kamar</th>
              <th className="px-4 py-3 font-semibold">No. HP</th>
              <th className="px-4 py-3 font-semibold">Mulai Sewa</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((p) => (
              <tr
                key={p.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700">
                      {p.nama?.charAt(0)?.toUpperCase() || "P"}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{p.nama}</p>
                      <p className="text-[11px] text-slate-500">{p.email || "-"}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{p.nama_kamar || p.kamar || "-"}</td>
                <td className="px-4 py-3">{p.no_hp || "-"}</td>
                <td className="px-4 py-3">{formatDate(p.tanggal_masuk || p.tgl_masuk)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        p.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : p.status === "Selesai"
                          ? "bg-slate-100 text-slate-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {p.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-5 text-slate-500">
                  Belum ada data penyewa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
