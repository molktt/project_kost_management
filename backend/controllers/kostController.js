const pool = require("../db");

exports.getKost = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM kost");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching kost" });
    }
};

exports.getKostById = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM kost WHERE id=?", [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching kost by id" });
    }
};

exports.createKost = async (req, res) => {
    try {
        const { nama_kost, alamat, keterangan, lantai } = req.body;
        await pool.query(
            "INSERT INTO kost(nama_kost, alamat, keterangan, lantai) VALUES (?,?,?,?)",
            [nama_kost, alamat, keterangan, lantai]
        );
        res.json({ message: "Kost ditambahkan" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating kost" });
    }
};

exports.updateKost = async (req, res) => {
    try {
        const { nama_kost, alamat, keterangan, lantai } = req.body;
        await pool.query(
            "UPDATE kost SET nama_kost=?, alamat=?, keterangan=?, lantai=? WHERE id=?",
            [nama_kost, alamat, keterangan, lantai, req.params.id]
        );
        res.json({ message: "Kost diupdate" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating kost" });
    }
};

exports.deleteKost = async (req, res) => {
    try {
        await pool.query("DELETE FROM kost WHERE id=?", [req.params.id]);
        res.json({ message: "Kost dihapus" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting kost" });
    }
};