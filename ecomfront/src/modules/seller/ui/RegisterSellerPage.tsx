import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/context/AuthContext";
import useRegister from "../../auth/infrastructure/useRegister"; 
import NavBar from "../../../components/layout/NavBar";
import Footer from "../../../components/layout/Footer";
import logo from "../../../img/logoT.png";

export default function RegisterSellerPage() {
    const { register, loading: registering, error } = useRegister();
    const { login } = useAuth();
    const navigate = useNavigate();

    // Estados para los campos del form
    const [form, setForm] = useState({
        name: "",
        phone_number: "",
        email: "",
        password: "",
        password_confirmation: "",
        tipo_tienda: "", // OPCIONAL
    });
    const [registerError, setRegisterError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterError(null);
        try {
            await register({
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation,
                type: "vendor",
                name: form.name,
                phone_number: form.phone_number,
                // puedes agregar tipo_tienda si tu API lo espera
            } as any);

            // Loguea y redirige:
            const loginSuccess = await login(form.email, form.password);
            if (loginSuccess) {
                navigate("/sellerPage"); // Cambia tu ruta según tu flujo deseado
            }
        } catch (err: any) {
            setRegisterError(err.response?.data?.message || "Error al registrar usuario");
        }
    };

    return (
        <div>
            <NavBar />
            <section className='flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center bg-gradient-to-br from-contrast-main via-contrast-secondary to-main h-[90vh] w-[35%] gap-4'>
                    <p className="text-contrast-secondary bg-white font-semibold py-2 px-4 rounded-full transition">Registrar tienda</p>
                </div>
                <div className="flex flex-col items-center justify-center h-[90vh] w-[65%]">
                    {/* Logo y Marca */}
                    <img className='h-20' src={logo} alt="TucaShop" />
                    <p className='font-fugaz text-2xl'>TucaShop</p>
                    <div className='flex flex-col w-full items-center space-y-5 mt-10 px-30'>
                        <form className="flex flex-col items-center w-full space-y-5" onSubmit={handleSubmit}>
                            <div className='flex justify-center gap-5 w-full'>
                                <input
                                    name="name"
                                    className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand'
                                    placeholder='Nombre de la tienda'
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="phone_number"
                                    className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand'
                                    placeholder='Teléfono'
                                    type="text"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='flex justify-center items-center flex-col space-y-5 w-full'>
                                <input
                                    name="email"
                                    className='border-2 border-main text-main rounded-full px-4 py-3 w-[92%] font-quicksand'
                                    placeholder='Correo electrónico'
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="tipo_tienda"
                                    className='border-2 border-main text-main rounded-full px-4 py-3 w-[92%] font-quicksand'
                                    placeholder='Tipo de tienda'
                                    type="text"
                                    value={form.tipo_tienda}
                                    onChange={handleChange}
                                    disabled // deshabilitado si aún no tu backend lo usa
                                />
                            </div>
                            <div className='flex justify-center gap-5 w-full'>
                                <input
                                    name="password"
                                    className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand'
                                    placeholder='Contraseña'
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="password_confirmation"
                                    className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand'
                                    placeholder='Confirmar contraseña'
                                    type="password"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Error y Loading */}
                            {(registerError || error) && (
                                <div className="text-red-500 text-sm text-center">
                                    {registerError || error}
                                </div>
                            )}
                            <button
                                disabled={registering}
                                className={`bg-main text-white rounded-full py-3 px-4 w-[50%] font-quicksand ${registering ? "opacity-60" : ""}`}>
                                {registering ? "Creando cuenta..." : "Crear cuenta"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}