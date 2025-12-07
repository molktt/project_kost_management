import { useEffect, useState } from "react";
import API from "../services/api";

export default function Booking() {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await API.get("/booking"); // sesuaikan endpoint jika beda
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
          <h1 className="text-2xl font-bold text-slate-800">Data Booking</h1>
          <p className="text-slate-500 text-sm">
            Daftar permintaan booking kamar kost.
          </p>
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          + Tambah Booking
        </button>
      </div>

      {/* Tabel Booking */}
      <div className="bg-white p-5 rounded-xl shadow border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="px-4 py-3 font-semibold">Nama Penyewa</th>
              <th className="px-4 py-3 font-semibold">Kamar</th>
              <th className="px-4 py-3 font-semibold">Tanggal Booking</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((b) => (
              <tr
                key={b.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3">{b.nama_penyewa}</td>
                <td className="px-4 py-3">{b.nama_kamar}</td>
                <td className="px-4 py-3">{formatDate(b.tanggal)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        b.status === "Disetujui"
                          ? "bg-green-100 text-green-700"
                          : b.status === "Ditolak"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {b.status}
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
                <td colSpan="5" className="text-center py-5 text-slate-500">
                  Belum ada data booking.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
