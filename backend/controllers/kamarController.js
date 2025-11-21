const pool = require("../db");

exports.getKamar = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM kamar");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching kamar" });
    }
};

exports.createKamar = async (req, res) => {
    try {
        const { nama_kamar, kost_id, kategori_id, harga, status } = req.body;
        await pool.query(
            "INSERT INTO kamar(nama_kamar, kost_id, kategori_id, harga, status) VALUES (?,?,?,?,?)",
            [nama_kamar, kost_id, kategori_id, harga, status]
        );
        res.json({ message: "Kamar ditambahkan" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating kamar" });
    }
};

exports.updateKamar = async (req, res) => {
    try {
        const { nama_kamar, kost_id, kategori_id, harga, status } = req.body;
        await pool.query(
            "UPDATE kamar SET nama_kamar=?, kost_id=?, kategori_id=?, harga=?, status=? WHERE id=?",
            [nama_kamar, kost_id, kategori_id, harga, status, req.params.id]
        );
        res.json({ message: "Kamar diupdate" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating kamar" });
    }
};

exports.deleteKamar = async (req, res) => {
    try {
        await pool.query("DELETE FROM kamar WHERE id=?", [req.params.id]);
        res.json({ message: "Kamar dihapus" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting kamar" });
    }
};