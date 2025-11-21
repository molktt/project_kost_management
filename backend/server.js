const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const adminRoutes = require("./routes/adminRoutes");
const kamarRoutes = require("./routes/kamarRoutes");
const kostRoutes = require("./routes/kostRoutes");
const penyewaRoutes = require("./routes/penyewaRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const pembayaranRoutes = require("./routes/pembayaranRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Optional: root test
app.get("/", (req, res) => res.send("API Kost Management Running ✔"));

app.use("/api/admin", adminRoutes);
app.use("/api/kamar", kamarRoutes);
app.use("/api/kost", kostRoutes);
app.use("/api/penyewa", penyewaRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/pembayaran", pembayaranRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
	try {
		await pool.query("SELECT 1");
		console.log("Connected to database");
	} catch (err) {
		console.error("Database connection failed:", err.message || err);
	}

	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();
