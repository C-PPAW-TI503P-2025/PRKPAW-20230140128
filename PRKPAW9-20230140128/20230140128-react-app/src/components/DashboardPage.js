import Navbar from "./Navbar";
import { decodeToken } from "../utils/auth";

export default function DashboardPage() {
  const user = decodeToken();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-10">
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-10 text-center border border-white/40">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
            Dashboard ✨
          </h1>

          <p className="text-gray-700 text-lg mb-4">
            Selamat datang, <strong>{user ? user.nama : "User"}</strong>!
          </p>

          <p className="text-gray-600 mb-10">
            Role: <span className="font-semibold">{user ? user.role : "N/A"}</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-100 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-green-800">Presensi</h3>
              <p className="text-gray-700 mt-2">Lakukan check-in dan check-out</p>
            </div>

            {user && user.role === "admin" && (
              <div className="bg-blue-100 p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold text-blue-800">Laporan Admin</h3>
                <p className="text-gray-700 mt-2">Lihat laporan presensi harian</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}