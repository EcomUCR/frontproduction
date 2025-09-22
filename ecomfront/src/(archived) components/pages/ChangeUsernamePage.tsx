import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../ui/NavBarAdmin';

const ChangeUsernamePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    // Opcional: cargar el username actual al abrir la página
    fetch(`/api/users/${userId}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setUsername(data.username || ""))
      .catch(err => console.error(err));
  }, [userId, navigate]);

  const handleUpdateUsername = async () => {
    setMessage("");

    if (!username.trim()) {
      setMessage("El nombre de usuario no puede estar vacío");
      return;
    }

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Nombre de usuario actualizado ✅");
        navigate("/profile");
      } else {
        setMessage("Error: " + (data.message || "No se pudo actualizar"));
      }
    } catch (err) {
      setMessage("Error de conexión");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-main animate-fade-in">
      <LandingHeader />
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="bg-blue-main w-full max-w-lg p-10 rounded-[2rem] text-center shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2">Actualizar nombre de usuario</h2>
          <p className="text-white mb-8">Escribe tu nuevo nombre de usuario</p>

          <div className="mb-8">
            <input
              className="w-full px-4 py-3 bg-transparent border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-opacity-75 transition-colors"
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          {message && <p className="mb-6 text-white">{message}</p>}

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/profile")}
              className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-200 transition"
            >
              Cancelar
            </button>

            <button
              onClick={handleUpdateUsername}
              className="bg-purple-main text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-purple-800 transition"
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUsernamePage;
