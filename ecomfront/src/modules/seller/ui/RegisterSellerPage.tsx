import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/context/AuthContext";
import useRegister from "../../../hooks/useRegister"; // ajusta la ruta si es necesario

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
            // Llama a tu hook de registro, enviando los campos como espera tu backend
            await register({
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation,
                type: "vendor",
                name: form.name,
                phone_number: form.phone_number,
                // si quieres, agrega otros campos requeridos por tu API (ejemplo: address, etc).
            } as any);

            // Si todo bien, loguea al usuario como vendedor automáticamente
            // y redirige (ej: a home o dashboard seller)
            const loginSuccess = await login(form.email, form.password);
            if (loginSuccess) {
                navigate("/sellerPage"); // o "/" si prefieres homepage
            }
        } catch (err: any) {
            setRegisterError(err.response?.data?.message || "Error al registrar usuario");
        }
    };

    return (
        <div>
            {/* ...tu NavBar, etc... */}
            <form
                className="flex flex-col items-center w-full space-y-5"
                onSubmit={handleSubmit}
            >
                <div className="flex justify-center gap-5 w-full">
                    <input
                        name="name"
                        className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
                        placeholder="Nombre de la tienda"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <input
                        name="phone_number"
                        className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
                        placeholder="Teléfono"
                        type="text"
                        value={form.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-center items-center flex-col space-y-5 w-full">
                    <input
                        name="email"
                        className="border-2 border-main text-main rounded-full px-4 py-3 w-[92%] font-quicksand"
                        placeholder="Correo electrónico"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {/* Puedes agregar aquí un select para tipo de tienda si lo quisieras */}
                </div>
                <div className="flex justify-center gap-5 w-full">
                    <input
                        name="password"
                        className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
                        placeholder="Contraseña"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <input
                        name="password_confirmation"
                        className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
                        placeholder="Confirmar contraseña"
                        type="password"
                        value={form.password_confirmation}
                        onChange={handleChange}
                    />
                </div>
                {registering ? (
                    <button className='bg-gray-400 text-white rounded-full py-3 px-4 w-[50%] font-quicksand' disabled>
                        Creando cuenta...
                    </button>
                ) : (
                    <button className='bg-main text-white rounded-full py-3 px-4 w-[50%] font-quicksand'>
                        Crear cuenta
                    </button>
                )}
                {registerError && <div className="text-red-500 text-sm">{registerError}</div>}
            </form>
            {/* ...tu footer, etc... */}
        </div>
    );
}