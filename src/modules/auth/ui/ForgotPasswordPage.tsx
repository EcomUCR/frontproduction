import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import logo from "../../../img/TukiLogo.png";
import React, { useState } from "react";
import { useAuth } from "../infrastructure/useAuth";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const { forgotPassword, loading, error, success } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await forgotPassword(email);
    };

    return (
        <div>
            <NavBar />
            <section className='flex justify-center items-center'>
                <div className="relative  flex flex-col justify-center bg-gradient-to-br from-contrast-main via-contrast-secondary to-main h-[90vh] w-[35%] gap-4">
                    <div className={`bg-white absolute right-0 top-40 z-1 h-30 w-80 rounded-l-full transform transition-all duration-300 `}>
                        <div className="-rotate-90 absolute w-10 h-10 -top-6 -right-4 bg-transparent flex items-center justify-center rounded-2xl">
                            <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]"></div>
                        </div>
                        <div className="-rotate-180 absolute w-10 h-10 -bottom-6 -right-4 bg-transparent flex items-center justify-center rounded-2xl">
                            <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]"></div>
                        </div>
                        <p className={`font-quicksand z-10 text-xl font-semibold py-11 rounded-full absolute text-contrast-secondary right-10`}>
                            Recuperar contraseña
                        </p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-[65%]'>
                    <div className="flex flex-col items-center w-full justify-center">
                        <img className='h-20' src={logo} alt="" />
                        <p className='font-fugaz text-2xl'>TukiShop</p>
                        <div className='flex flex-col w-full items-center space-y-5 mt-10'>
                            {/* Formulario de recuperación */}
                            <form className="flex flex-col items-center w-full space-y-5" onSubmit={handleSubmit}>
                                <input
                                    className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand'
                                    placeholder='Correo Electrónico'
                                    type="text"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <button
                                    className='bg-main text-white rounded-full py-3 px-4 w-[40%] font-quicksand'
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Enviando..." : "Enviar correo de recuperación"}
                                </button>
                                {error && <p className="text-red-500">{error}</p>}
                                {success && <p className="text-green-600">{success}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}