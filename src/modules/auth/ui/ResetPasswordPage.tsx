import logo from "../../../img/TukiLogo.png";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../infrastructure/useAuth";

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const { resetPassword, loading, error, success } = useAuth();

    // Laravel envía por email ?token=xxx&email=yyy
    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await resetPassword({
            token,
            email,
            password,
            password_confirmation: confirm
        });
    };

    return (
        <div>
            <section className='flex justify-center items-center'>
                <div className="relative  flex flex-col justify-center bg-gradient-to-br from-contrast-main via-contrast-secondary to-main h-[100vh] w-[35%] gap-4">
                    <div className={`bg-white absolute right-0 top-40 z-1 h-30 w-75 rounded-l-full transform transition-all duration-300 `}>
                        <div className="-rotate-90 absolute w-10 h-10 -top-6 -right-4 bg-transparent flex items-center justify-center rounded-2xl">
                            <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]"></div>
                        </div>
                        <div className="-rotate-180 absolute w-10 h-10 -bottom-6 -right-4 bg-transparent flex items-center justify-center rounded-2xl">
                            <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]"></div>
                        </div>
                        <p className={`font-quicksand z-10 text-xl font-semibold py-11 rounded-full absolute text-contrast-secondary right-10`}>
                            Actualizar contraseña
                        </p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center h-[100vh] w-[65%]'>
                    <div className="flex flex-col items-center w-full justify-center">
                        <img className='h-20' src={logo} alt="" />
                        <p className='font-fugaz text-2xl'>TukiShop</p>
                        <div className='flex flex-col w-full items-center space-y-5 mt-10'>
                            {/* Formulario de actualización */}
                            <form className="flex flex-col items-center w-full space-y-5" onSubmit={handleSubmit}>
                                <input
                                    className='border-2 border-contrast-secondary text-contrast-secondary rounded-full px-4 py-3 w-[45%] font-quicksand'
                                    placeholder='Nueva contraseña'
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <input
                                    className='border-2 border-contrast-secondary text-contrast-secondary rounded-full px-4 py-3 w-[45%] font-quicksand'
                                    placeholder='Confirmar contraseña'
                                    type="password"
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                    required
                                />
                                <button
                                    className='bg-contrast-secondary text-white rounded-full py-3 px-4 w-[30%] font-quicksand'
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Actualizando..." : "Actualizar contraseña"}
                                </button>
                                {error && <p className="text-red-500">{error}</p>}
                                {success && <p className="text-green-600">{success}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}