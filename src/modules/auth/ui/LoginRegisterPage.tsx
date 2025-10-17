import { useState } from 'react';
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function LoginRegisterPage() {
    const [view, setView] = useState<'login' | 'register'>('login');

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />

          
            <section className="flex flex-grow justify-center items-center font-quicksand">
                
                
                <div className="flex justify-end items-center bg-gradient-to-br from-contrast-main via-contrast-secondary to-main h-[90vh] w-[35%] relative">
                    
                    
                    <ul className="flex flex-col items-end pr-10 gap-20 relative">
                        
                        
                        <div className={`bg-white absolute right-0 z-0 h-30 w-55 rounded-l-full transform transition-all duration-300 ${view === 'login' ? '-top-6' : 'translate-y-30'}`}>
                            <div className="-rotate-90 absolute w-10 h-10 -top-6 -right-4 bg-transparent flex items-center justify-center rounded-2xl">
                                <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]"></div>
                            </div>
                            <div className="-rotate-180 absolute w-10 h-10 -bottom-6 -right-4 bg-transparent flex items-center justify-center rounded-2xl">
                                <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]"></div>
                            </div>
                        </div>
                       
                        <li className="relative flex items-center">
                            <button
                                className={`z-10 text-xl font-semibold py-5 rounded-full transition ${view === 'login' ? 'text-contrast-secondary' : 'text-white'}`}
                                onClick={() => setView('login')}
                            >
                                Iniciar sesión
                            </button>
                        </li>

                        <li className="relative flex items-center">
                            <button
                                className={`z-10 text-xl font-semibold py-5 rounded-full transition ${view === 'register' ? 'text-contrast-secondary' : 'text-white'}`}
                                onClick={() => setView('register')}
                            >
                                Registrarse
                            </button>
                        </li>
                    </ul>
                </div>

            
                <div className="flex flex-col items-center justify-center h-[90vh] w-[65%] px-40 bg-white">
                    {view === 'login' ? (
                        <LoginForm 
                    
                        />
                    ) : (
                        <RegisterForm 
                          onRegisterSuccess={() => setView('login')}
                          
                        />
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
