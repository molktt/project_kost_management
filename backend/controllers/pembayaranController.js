const pool = require("../db");

exports.getPembayaran = async (req, res) => {
    const [rows] = await pool.query(`
        SELECT pembayaran.*, penyewa.nama 
        FROM pembayaran
        LEFT JOIN penyewa ON penyewa.id = pembayaran.penyewa_id
    `);
    res.json(rows);
};

exports.createPembayaran = async (req, res) => {
    const { penyewa_id, bulan, tahun, jumlah, status, tanggal_bayar } = req.body;

    await pool.query(
        "INSERT INTO pembayaran(penyewa_id, bulan, tahun, jumlah, status, tanggal_bayar) VALUES (?,?,?,?,?,?)",
        [penyewa_id, bulan, tahun, jumlah, status, tanggal_bayar]
    );

    res.json({ message: "Pembayaran ditambah" });
};

exports.updatePembayaran = async (req, res) => {
    const { penyewa_id, bulan, tahun, jumlah, status, tanggal_bayar } = req.body;

    await pool.query(
        "UPDATE pembayaran SET penyewa_id=?, bulan=?, tahun=?, jumlah=?, status=?, tanggal_bayar=? WHERE id=?",
        [penyewa_id, bulan, tahun, jumlah, status, tanggal_bayar, req.params.id]
    );

    res.json({ message: "Pembayaran diupdate" });
};

exports.deletePembayaran = async (req, res) => {
    await pool.query("DELETE FROM pembayaran WHERE id=?", [req.params.id]);
    res.json({ message: "Pembayaran dihapus" });
};