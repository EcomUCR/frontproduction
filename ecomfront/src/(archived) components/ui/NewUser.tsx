import { useState } from "react";

export default function NewUser({ onCreated }: { onCreated?: () => void }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        type: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!form.firstName || !form.lastName || !form.email || !form.username || !form.type || !form.password || !form.confirmPassword) {
            setError("Todos los campos son obligatorios");
            console.log("Campos vacíos", form);
            return;
        }
        if (isNaN(Number(form.type))) {
            setError("El rol debe ser un número");
            console.log("Rol no es un número");
            return;
        }
        if (form.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            console.log("Contraseña muy corta");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Las contraseñas no coinciden");
            console.log("Contraseñas no coinciden");
            return;
        }
        setLoading(true);
        console.log("Enviando datos al backend", form);
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    username: form.username,
                    name: form.firstName,
                    last_name: form.lastName,
                    type: form.type,
                    status: 1
                })
            });
            console.log("Respuesta del backend", res);
            if (res.ok) {
                const data = await res.json();
                console.log("Usuario creado", data);
                setForm({ firstName: "", lastName: "", email: "", username: "", type: "", password: "", confirmPassword: "" });
                if (onCreated) onCreated();
            } else {
                let data = null;
                try {
                    data = await res.json();
                } catch (e) {
                    data = {};
                }
                setError(data.error || "Error al crear usuario");
                console.log("Error al crear usuario", data);
            }
        } catch (err) {
            setError("Error de conexión con el backend");
            console.log("Error de conexión", err);
        }
        setLoading(false);
    };
    return (
        <section className=" flex flex-col items-center justify-center ">
            <div className="border-2 p-5 rounded-xl my-20 ">
                <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <label className="block text-gray-600 mb-2" htmlFor="firstName">
                                Nombre
                            </label>
                            <input
                                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                                id="firstName"
                                type="text"
                                placeholder=" "
                                value={form.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2" htmlFor="lastName">
                                Apellido
                            </label>
                            <input
                                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                                id="lastName"
                                type="text"
                                placeholder=" "
                                value={form.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-600 mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                                id="email"
                                type="email"
                                placeholder=" "
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-600 mb-2" htmlFor="username">
                                Nombre de usuario
                            </label>
                            <input
                                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                                id="username"
                                type="text"
                                placeholder=" "
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-600 mb-2" htmlFor="type">
                                Rol
                            </label>
                            <input
                                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                                id="type"
                                type="text"
                                placeholder=" "
                                value={form.type}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                                id="password"
                                type="password"
                                placeholder=" "
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2" htmlFor="confirmPassword">
                                Confirmar contraseña
                            </label>
                            <input
                                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                                id="confirmPassword"
                                type="password"
                                placeholder=" "
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    <div className="flex items-center justify-center mt-12">
                        <button
                            className="w-full md:w-1/2 bg-[#5C2E92] text-white font-bold py-3 px-4 rounded-full shadow-md"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creando..." : "Crear usuario"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}