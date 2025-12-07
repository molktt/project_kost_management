import { useEffect, useState } from "react";
import API from "../services/api";

export default function Kost() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // state form
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    nama_kost: "",
    alamat: "",
    keterangan: "",
    lantai: "",
  });

  // === LOAD DATA ===
  const load = async () => {
    try {
      setLoading(true);
      const res = await API.get("/kost");
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data kost");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // === FORM HANDLER ===
  const openAddForm = () => {
    setIsEdit(false);
    setSelectedId(null);
    setForm({
      nama_kost: "",
      alamat: "",
      keterangan: "",
      lantai: "",
    });
    setShowForm(true);
  };

  const openEditForm = (kost) => {
    setIsEdit(true);
    setSelectedId(kost.id);
    setForm({
      nama_kost: kost.nama_kost || "",
      alamat: kost.alamat || "",
      keterangan: kost.keterangan || "",
      lantai: kost.lantai || "",
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

    const payload = {
      ...form,
      lantai: form.lantai === "" ? null : Number(form.lantai),
    };

    try {
      if (isEdit) {
        await API.put(`/kost/${selectedId}`, payload);
        alert("Kost berhasil diupdate");
      } else {
        await API.post("/kost", payload);
        alert("Kost berhasil ditambahkan");
      }
      closeForm();
      load();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan kost");
    }
  };

  // === DELETE ===
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kost ini?")) return;
    try {
      await API.delete(`/kost/${id}`);
      alert("Kost berhasil dihapus");
      load();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus kost");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Kost</h1>
          <p className="text-slate-500 text-sm">
            Daftar semua kost yang terdaftar dalam sistem.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Tambah Kost
        </button>
      </div>

      {/* List Kost */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading && (
          <p className="text-sm text-slate-500 col-span-full">
            Memuat data kost...
          </p>
        )}

        {!loading &&
          data.map((k) => (
            <div
              key={k.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    {k.nama_kost}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">{k.alamat}</p>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                  {k.kota || "Kota tidak diketahui"}
                </span>
              </div>

              {/* Info tambahan */}
              <div className="text-xs text-slate-600 space-y-1 mt-2">
                <p>
                  <span className="font-semibold text-slate-700">Lantai: </span>
                  {k.lantai ?? "-"}
                </p>
                {k.keterangan && (
                  <p>
                    <span className="font-semibold text-slate-700">
                      Keterangan:{" "}
                    </span>
                    {k.keterangan}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 mt-3">
                <div>
                  <p className="font-semibold text-slate-700">Total kamar</p>
                  <p>{k.total_kamar ?? "-"} kamar</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-700">Terisi</p>
                  <p>{k.kamar_terisi ?? "-"} kamar</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-700">Pemilik</p>
                  <p>{k.pemilik || "-"}</p>
                </div>
              </div>

              {/* Aksi */}
              <div className="flex gap-2 mt-4 text-xs">
                <button
                  onClick={() => openEditForm(k)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(k.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

        {!loading && data.length === 0 && (
          <p className="text-sm text-slate-500 col-span-full">
            Belum ada data kost yang tersimpan.
          </p>
        )}
      </div>

      {/* Modal Form Tambah / Edit */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {isEdit ? "Edit Kost" : "Tambah Kost"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nama Kost
                </label>
                <input
                  name="nama_kost"
                  value={form.nama_kost}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Alamat
                </label>
                <textarea
                  name="alamat"
                  value={form.alamat}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Keterangan
                </label>
                <textarea
                  name="keterangan"
                  value={form.keterangan}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Misal: Kost khusus putri, include listrik, dll (opsional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Jumlah Lantai
                </label>
                <input
                  type="number"
                  name="lantai"
                  value={form.lantai}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 2"
                />
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
