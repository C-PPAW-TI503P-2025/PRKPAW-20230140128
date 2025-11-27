import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import Navbar from "./Navbar";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix untuk icon marker Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function PresensiPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [coords, setCoords] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoadingLocation(false);
          setError("");
        },
        (error) => {
          setError("Gagal mendapatkan lokasi: " + error.message);
          setLoadingLocation(false);
        }
      );
    } else {
      setError("Geolocation tidak didukung oleh browser ini.");
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleCheckIn = async () => {
    if (!coords) {
      setError("Lokasi belum didapatkan. Mohon izinkan akses lokasi.");
      return;
    }

    setError("");
    setMessage("");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const response = await axios.post(
        "http://localhost:3001/api/presensi/checkin",
        {
          latitude: coords.lat,
          longitude: coords.lng
        },
        config
      );

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Check-in gagal");
    }
  };

  const handleCheckOut = async () => {
    setError("");
    setMessage("");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const response = await axios.post(
        "http://localhost:3001/api/presensi/checkout",
        {},
        config
      );

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Check-out gagal");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Lakukan Presensi
          </h2>

          {loadingLocation && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-center">
              <p className="text-gray-600">Mengambil lokasi Anda...</p>
            </div>
          )}

          {coords && (
            <div className="mb-6 border rounded-lg overflow-hidden shadow-md">
              <MapContainer 
                center={[coords.lat, coords.lng]} 
                zoom={15} 
                style={{ height: '300px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[coords.lat, coords.lng]}>
                  <Popup>
                    <div className="text-center">
                      <strong>Lokasi Presensi Anda</strong>
                      <br />
                      Lat: {coords.lat.toFixed(6)}
                      <br />
                      Lng: {coords.lng.toFixed(6)}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )}

          <div className="bg-white p-8 rounded-lg shadow-md">
            {message && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                {message}
              </div>
            )}
            
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {coords && (
              <div className="mb-4 p-3 bg-blue-50 rounded-md text-sm text-gray-700">
                <strong>Koordinat Anda:</strong>
                <br />
                Latitude: {coords.lat.toFixed(6)} | Longitude: {coords.lng.toFixed(6)}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleCheckIn}
                disabled={!coords}
                className={`w-full py-3 px-4 font-semibold rounded-md shadow-sm ${
                  coords
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Check-In
              </button>

              <button
                onClick={handleCheckOut}
                className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700"
              >
                Check-Out
              </button>
            </div>

            {!coords && (
              <button
                onClick={getLocation}
                className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
              >
                Coba Ambil Lokasi Lagi
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PresensiPage;