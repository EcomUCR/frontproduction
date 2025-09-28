import { useState } from 'react';
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import LoginForm from "../../../components/forms/LoginForm";
import RegisterForm from "../../../components/forms/RegisterForm";

export default function LoginRegisterPage() {
    const [view, setView] = useState<'login' | 'register'>('login');

    return (
        <div>
            <NavBar />
            <section className='flex justify-center items-center font-quicksand mx-auto max-w-[80rem]'>
                <div className='flex pl-60 items-center bg-gradient-to-br from-contrast-main via-contrast-secondary to-main h-[90vh] w-[35%] gap-4 2xl:px-20'>
                    {/*Botón de inicio de sesión */}
                    <ul className='flex flex-col absolute top-70 ml-3 gap-20 2xl:px-40'>
                            <div className={`bg-white absolute 2xl:left-35 -left-5 z-0 h-30 w-55 rounded-l-full transform transition-all duration-300 ${view === 'login' ? ' -top-6' : ' translate-y-30'} `}>
                                <div className="-rotate-90 absolute w-10 h-10 -top-6 -right-3 bg-transparent flex items-center justify-center rounded-2xl">
                                    <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]"></div>
                                </div>
                                <div className="-rotate-180 absolute w-10 h-10 -bottom-6 -right-3 bg-transparent flex items-center justify-center rounded-2xl">
                                    <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]"></div>
                                </div>
                            </div>
                        
                        <li className='relative flex items-center'>
                            <button
                                className={`z-1 text-xl w-full font-semibold py-5 pl-5 rounded-full transition ${view === 'login' ? 'text-contrast-secondary' : ' text-white'}`}
                                onClick={() => setView('login')}>Iniciar sesión</button>
                            {/*Botón de registro */}
                        </li>
                        <li className='relative flex items-center'>
                            <button
                                className={`z-2 text-xl w-full font-semibold py-5 pl-5 rounded-full transition ${view === 'register' ? 'text-contrast-secondary' : ' text-white'}`}
                                onClick={() => setView('register')}
                            >Registrarse</button>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col items-center justify-center h-[90vh] w-[65%]'>
                    {/* Este div lo que hace es cargar el formulario de inicio de sesión o de registro */}
                    {view === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>
            </section>
            <Footer />
        </div>
    );
}
