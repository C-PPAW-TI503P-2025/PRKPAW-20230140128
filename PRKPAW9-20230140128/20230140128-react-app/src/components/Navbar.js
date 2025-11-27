import { useNavigate } from "react-router-dom";
import { decodeToken, removeToken, isAdmin } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const user = decodeToken();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Sistem Presensi</h1>
          </div>

          {/* Menu Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-lg hover:bg-white/20 transition"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/presensi")}
              className="px-4 py-2 rounded-lg hover:bg-white/20 transition"
            >
              Presensi
            </button>

            {/* Menu Laporan - Hanya untuk Admin */}
            {isAdmin() && (
              <button
                onClick={() => navigate("/reports")}
                className="px-4 py-2 rounded-lg hover:bg-white/20 transition"
              >
                Laporan Admin
              </button>
            )}

            {/* User Info & Logout */}
            <div className="flex items-center space-x-3 border-l border-white/30 pl-4">
              <span className="text-sm font-medium">
                {user ? user.nama : "User"}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition shadow"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}