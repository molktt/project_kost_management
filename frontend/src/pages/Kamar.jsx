import { useEffect, useState } from "react";
import API from "../services/api";

export default function Kamar() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [kostList, setKostList] = useState([]);

  // state untuk form
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    nama_kamar: "",
    kost_id: "",
    kategori_id: "",
    harga: "",
    status: "Tersedia", // default sama dengan data di DB
  });

  // === LOAD DATA ===
  const load = async () => {
    try {
      setLoading(true);

      const [resKamar, resKost] = await Promise.all([
        API.get("/kamar"),
        API.get("/kost"),
      ]);

      setData(resKamar.data);
      setKostList(resKost.data); // asumsi backend: [{id, nama_kost, ...}]
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data kamar / kost");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value || 0);

  // === FORM HANDLER ===
  const openAddForm = () => {
    setIsEdit(false);
    setSelectedId(null);
    setForm({
      nama_kamar: "",
      kost_id: "",
      kategori_id: "",
      harga: "",
      status: "Tersedia",
    });
    setShowForm(true);
  };

  const openEditForm = (kamar) => {
    setIsEdit(true);
    setSelectedId(kamar.id);
    setForm({
      nama_kamar: kamar.nama_kamar || "",
      kost_id: kamar.kost_id || "",
      kategori_id: kamar.kategori_id || "",
      harga: kamar.harga || "",
      status: kamar.status || "Tersedia",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // === CREATE / UPDATE ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    // pastikan tipe angka dikirim sebagai number
    const payload = {
      ...form,
      kost_id: Number(form.kost_id),
      kategori_id: Number(form.kategori_id),
      harga: Number(form.harga),
    };

    try {
      if (isEdit) {
        await API.put(`/kamar/${selectedId}`, payload);
        alert("Kamar berhasil diupdate");
      } else {
        await API.post("/kamar", payload);
        alert("Kamar berhasil ditambahkan");
      }
      closeForm();
      load();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan kamar");
    }
  };

  // === DELETE ===
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kamar ini?")) return;
    try {
      await API.delete(`/kamar/${id}`);
      alert("Kamar berhasil dihapus");
      load();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus kamar");
    }
  };

  // helper: ambil nama kost dari id
  const getKostName = (kost_id) => {
    const k = kostList.find((item) => item.id === kost_id);
    return k ? k.nama_kost : `ID ${kost_id}`;
  };

  return (
    <div className="space-y-6">
      {/* Header Title + Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Kamar</h1>
          <p className="text-slate-500 text-sm">
            Daftar seluruh kamar yang tersedia di kost.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Tambah Kamar
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white p-5 rounded-xl shadow border border-slate-200 overflow-x-auto">
        {loading ? (
          <p className="text-sm text-slate-500">Memuat data...</p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="px-4 py-3 font-semibold">Nama Kamar</th>
                <th className="px-4 py-3 font-semibold">Kost</th>
                <th className="px-4 py-3 font-semibold">Kategori ID</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((k) => (
                <tr
                  key={k.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3">{k.nama_kamar}</td>
                  <td className="px-4 py-3">{getKostName(k.kost_id)}</td>
                  <td className="px-4 py-3">{k.kategori_id}</td>
                  <td className="px-4 py-3">{formatRupiah(k.harga)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          k.status === "Tersedia"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {k.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => openEditForm(k)}
                      className="px-3 py-1 rounded-lg border border-slate-300 text-xs hover:bg-slate-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(k.id)}
                      className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs hover:bg-red-700 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}

              {data.length === 0 && !loading && (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-slate-500">
                    Tidak ada data kamar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal / Form Tambah & Edit */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {isEdit ? "Edit Kamar" : "Tambah Kamar"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama kamar */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nama Kamar
                </label>
                <input
                  name="nama_kamar"
                  value={form.nama_kamar}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Kost & Kategori */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Kost
                  </label>
                  <select
                    name="kost_id"
                    value={form.kost_id}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">-- Pilih Kost --</option>
                    {kostList.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.nama_kost}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Kategori ID
                  </label>
                  <input
                    name="kategori_id"
                    value={form.kategori_id}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Harga */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Harga
                </label>
                <input
                  type="number"
                  name="harga"
                  value={form.harga}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tersedia">Tersedia</option>
                  <option value="Terisi">Terisi</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isEdit ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
