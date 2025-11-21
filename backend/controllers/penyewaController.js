const pool = require("../db");

exports.getPenyewa = async (req, res) => {
    const [rows] = await pool.query(`
        SELECT penyewa.*, kamar.nama_kamar 
        FROM penyewa
        LEFT JOIN kamar ON kamar.id = penyewa.kamar_id
    `);
    res.json(rows);
};

exports.createPenyewa = async (req, res) => {
    const { nama, no_telp, nik, kamar_id, tanggal_masuk, tanggal_keluar } = req.body;

    await pool.query(
        "INSERT INTO penyewa(nama, no_telp, nik, kamar_id, tanggal_masuk, tanggal_keluar) VALUES (?,?,?,?,?,?)",
        [nama, no_telp, nik, kamar_id, tanggal_masuk, tanggal_keluar]
    );

    res.json({ message: "Penyewa ditambahkan" });
};

exports.updatePenyewa = async (req, res) => {
    const { nama, no_telp, nik, kamar_id, tanggal_masuk, tanggal_keluar } = req.body;

    await pool.query(
        "UPDATE penyewa SET nama=?, no_telp=?, nik=?, kamar_id=?, tanggal_masuk=?, tanggal_keluar=? WHERE id=?",
        [nama, no_telp, nik, kamar_id, tanggal_masuk, tanggal_keluar, req.params.id]
    );

    res.json({ message: "Penyewa diperbarui" });
};

exports.deletePenyewa = async (req, res) => {
    await pool.query("DELETE FROM penyewa WHERE id=?", [req.params.id]);
    res.json({ message: "Penyewa dihapus" });
};