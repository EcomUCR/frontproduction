import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import NavBar from "../../../components/layout/NavBar";
import Footer from "../../../components/layout/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";


export default function LoginRegisterPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // 🔹 Determinar modo inicial según la URL
    const initialMode =
        searchParams.get("mode") === "register" ? "register" : "login";
    const [mode, setMode] = useState<"login" | "register">(initialMode);

    // 🔹 Escuchar cambios en la URL (si el usuario entra desde Navbar)
    useEffect(() => {
        const m = searchParams.get("mode");
        setMode(m === "register" ? "register" : "login");
    }, [searchParams]);

    // 🔹 Cambiar modo desde botones del panel izquierdo y actualizar la URL
    const goMode = (next: "login" | "register") => {
        setMode(next);
        const qs = new URLSearchParams(searchParams);
        qs.set("mode", next);
        navigate(`/loginRegister?${qs.toString()}`, { replace: true });
    };

    return (
        <div>
            <NavBar />

            <section className="flex justify-center items-center h-[90vh]">
                {/* PANEL IZQUIERDO con gradiente pegado a la izquierda */}
                <div className="flex justify-end items-center bg-gradient-to-br from-contrast-main via-contrast-secondary to-main h-[90vh] w-[35%] relative">

                    {/* Lista de botones pegada al borde derecho del gradiente */}
                    <ul className="flex flex-col items-end pr-10 gap-20 relative">

                        {/* Fondo animado del selector */}
                        <div
                            className={`bg-white absolute right-0 z-0 h-30 w-55 rounded-l-full transform transition-all duration-300 ${mode === 'login' ? '-top-6' : 'translate-y-30'
                                }`}
                        >
                            <div className="-rotate-90 absolute w-10 h-10 -top-6 -right-4 bg-transparent flex items-center justify-center rounded-2xl">
                                <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]"></div>
                            </div>
                            <div className="-rotate-180 absolute w-10 h-10 -bottom-6 -right-4 bg-transparent flex items-center justify-center rounded-2xl">
                                <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]"></div>
                            </div>
                        </div>

                        {/* Botones */}
                        <li className="relative flex items-center font-quicksand">
                            <button
                                className={`z-10 text-xl font-semibold py-5 rounded-full transition ${mode === 'login' ? 'text-contrast-secondary' : 'text-white'
                                    }`}
                                onClick={() => goMode("login")}
                            >
                                Iniciar sesión
                            </button>
                        </li>

                        <li className="relative flex items-center font-quicksand">
                            <button
                                className={`z-10 text-xl font-semibold py-5 rounded-full transition ${mode === 'register' ? 'text-contrast-secondary' : 'text-white'
                                    }`}
                                onClick={() => goMode("register")}
                            >
                                Registrarse
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Panel derecho: cambia entre los formularios */}
                <div className="flex flex-col items-center  justify-center px-30  w-[65%]">
                    {mode === "login" ? <LoginForm /> : <RegisterForm onRegisterSuccess={()=> setMode('login')} />}
                </div>

            </section>

            <Footer />
        </div>
    );
}
