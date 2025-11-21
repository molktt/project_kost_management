const pool = require("../db");

exports.getBooking = async (req, res) => {
    const [rows] = await pool.query(`
        SELECT booking.*, penyewa.nama, kamar.nama_kamar 
        FROM booking
        LEFT JOIN penyewa ON penyewa.id = booking.penyewa_id
        LEFT JOIN kamar ON kamar.id = booking.kamar_id
    `);
    res.json(rows);
};

exports.createBooking = async (req, res) => {
    const { penyewa_id, kamar_id, durasi_bulan, tanggal_mulai } = req.body;

    const start = new Date(tanggal_mulai);
    const end = new Date(start);
    end.setMonth(end.getMonth() + Number(durasi_bulan));

    await pool.query(
        "INSERT INTO booking(penyewa_id, kamar_id, durasi_bulan, tanggal_mulai, tanggal_selesai) VALUES (?,?,?,?,?)",
        [penyewa_id, kamar_id, durasi_bulan, tanggal_mulai, end]
    );

    await pool.query("UPDATE kamar SET status='Terisi' WHERE id=?", [kamar_id]);

    res.json({ message: "Booking dibuat" });
};

exports.deleteBooking = async (req, res) => {
    await pool.query("DELETE FROM booking WHERE id=?", [req.params.id]);
    res.json({ message: "Booking dihapus" });
};