const pool = require("../db");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await pool.query(
    "SELECT * FROM admin WHERE username = ?",
    [username]
  );

  if (rows.length === 0) {
    return res.status(400).json({ message: "Username tidak ditemukan" });
  }

  const admin = rows[0];

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    return res.status(400).json({ message: "Password salah" });
  }

  res.json({ message: "Login berhasil", adminId: admin.id });
};
