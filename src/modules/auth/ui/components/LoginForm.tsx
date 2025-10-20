import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../img/TukiLogo.png";
import { useAuth } from "../../../../hooks/context/AuthContext";

export default function LoginForm() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    
    const emailLower = email.toLowerCase();

    console.log("Email:", emailLower, "Password:", password);

   
    const success = await login(emailLower, password);
    if (!success) {
      setError("Usuario o contraseña incorrectos.");
    } else {
      navigate("/");
    }
  };


  return (
    <div className="flex flex-col items-center w-full justify-center">
      <img className="h-20" src={logo} alt="" />
      <p className="font-fugaz text-2xl">TukiShop</p>
      <div className="flex flex-col w-full items-center space-y-5 mt-10">
        <form
          className="flex flex-col items-center w-full space-y-5"
          onSubmit={handleSubmit}
        >
          <input
            className="border-2 border-contrast-secondary text-contrast-secondary rounded-full px-4 py-3 w-[65%] font-quicksand"
            placeholder="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border-2 border-contrast-secondary text-contrast-secondary rounded-full px-4 py-3 w-[65%] font-quicksand"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-contrast-secondary text-white rounded-full py-3 px-4 w-[30%] font-quicksand cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
        {error && <div className="text-red-500">{error}</div>}
        <Link to="/forgotPassword">
          <span className="text-main font-quicksand">
            ¿Olvidaste tu contraseña?
          </span>
        </Link>
      </div>
    </div>
  );
}
