const pool = require("../db");

exports.getKategori = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM kategori");
    res.json(rows);
};

exports.createKategori = async (req, res) => {
    const { nama_kategori, deskripsi } = req.body;      
    await pool.query(
        "INSERT INTO kategori(nama_kategori) VALUES (?,?)",
        [nama_kategori]
    );
    res.json({ message: "Kategori ditambahkan" });
};

exports.updateKategori = async (req, res) => {
    const { nama_kategori } = req.body;      
    await pool.query(
        "UPDATE kategori SET nama_kategori=?, deskripsi=? WHERE id=?",
        [nama_kategori, req.params.id]
    );
    res.json({ message: "Kategori diupdate" });
};              
exports.deleteKategori = async (req, res) => {
    await pool.query("DELETE FROM kategori WHERE id=?", [req.params.id]);
    res.json({ message: "Kategori dihapus" });
};