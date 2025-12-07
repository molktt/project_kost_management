import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      alert("Login gagal, periksa kembali username & password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-slate-100 to-indigo-100">
      <div className="w-full max-w-md px-4">
        <div className="relative bg-white rounded-[32px] shadow-[0_25px_60px_rgba(15,23,42,0.25)] overflow-hidden">

          {/* Header biru */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-8 pt-10 pb-8 text-center relative">
            {/* Logo bulat */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                <span className="text-xl font-semibold text-indigo-600">K</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mt-4">
              Admin Panel
            </h1>
            <p className="text-sm text-sky-100 mt-1">
              Kelola data kost dengan mudah
            </p>
          </div>

          {/* Form */}
          <form onSubmit={login} className="px-8 pt-6 pb-7 space-y-4">
            {/* Username */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-700">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  {/* ikon user sederhana */}
                  👤
                </span>
                <input
                  className="w-full rounded-full border border-slate-300 bg-slate-50 px-10 py-2.5 text-sm text-slate-800 
                             placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan Username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  🔒
                </span>
                <input
                  type="password"
                  className="w-full rounded-full border border-slate-300 bg-slate-50 px-10 py-2.5 text-sm text-slate-800 
                             placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Kalau mau icon eye beneran tinggal ganti di sini */}
              </div>
            </div>

            {/* Ingat saya + Lupa password */}
            <div className="flex items-center justify-between text-xs mt-1">
              <label className="inline-flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Ingat saya
              </label>
              <button
                type="button"
                className="text-blue-600 hover:underline font-medium"
              >
                Lupa password?
              </button>
            </div>

            {/* Tombol */}
            <button
              type="submit"
              className="w-full mt-1 rounded-full bg-blue-600 hover:bg-blue-700 py-2.5 text-sm font-semibold text-white 
                         shadow-md transition-colors"
            >
              Masuk Sekarang
            </button>
          </form>

          {/* Footer */}
          <div className="pb-4">
            <p className="text-[11px] text-center text-slate-400">
              © {new Date().getFullYear()} Admin Panel Kost. Hak cipta dilindungi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
