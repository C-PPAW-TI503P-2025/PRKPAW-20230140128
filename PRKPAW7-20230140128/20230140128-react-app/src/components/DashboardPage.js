import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-10">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-10 text-center border border-white/40">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          Dashboard ✨
        </h1>

        <p className="text-gray-700 text-lg mb-10">
          Selamat datang! Kamu berhasil login dengan JWT Authentication.
        </p>

        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
