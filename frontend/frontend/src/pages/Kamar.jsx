import { useEffect, useState } from "react";
import API from "../services/api";

export default function Kamar() {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await API.get("/kamar");
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Kamar</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama</th>
            <th className="border p-2">Harga</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((k) => (
            <tr key={k.id}>
              <td className="border p-2">{k.nama_kamar}</td>
              <td className="border p-2">{k.harga}</td>
              <td className="border p-2">{k.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}