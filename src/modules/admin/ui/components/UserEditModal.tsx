import { useEffect, useState } from "react";
import { IconArrowLeft, IconCamera, IconTrash } from "@tabler/icons-react";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import { Switch } from "../../../../components/ui/switch";

interface UserEditModalProps {
    user: {
        id: number;
        username: string;
        email: string;
        password?: string;
        first_name?: string;
        last_name?: string;
        phone_number?: string;
        role: "ADMIN" | "SELLER" | "CUSTOMER";
        status: boolean;
        image?: string | null;
        last_connection?: string;
        total_spent?: number;
        total_items?: number;
    };
    onClose: () => void;
    onSave: (updatedUser: any) => Promise<void>;
}

export default function UserEditModal({ user, onClose, onSave }: UserEditModalProps) {
    const [formData, setFormData] = useState({
        ...user,
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue =
            type === "checkbox" && e.target instanceof HTMLInputElement
                ? e.target.checked
                : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("🟢 handleSubmit ejecutado, datos enviados:", formData);
        await onSave(formData);
        onClose();
    };


    // Si no hay imagen, generamos inicial
    const userInitial = formData.first_name?.charAt(0)?.toUpperCase() || formData.username?.charAt(0)?.toUpperCase() || "?";

    // Bloquea scroll del body
    useEffect(() => {
        // Guardar posición actual del scroll
        const scrollY = window.scrollY;

        // Fijar el body sin quitar el scroll
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.overflowY = "scroll"; // mantiene la barra visible

        return () => {
            // Restaurar posición y estilos al cerrar el modal
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.overflowY = "";

            // Volver al mismo punto del scroll
            window.scrollTo(0, scrollY);
        };
    }, []);


    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 animate-fadeIn font-quicksand"
            onClick={onClose}>
            <div className="bg-white w-[920px] max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-10 relative border border-main/10 animate-slideUp flex flex-col gap-8 scrollbar-thin scrollbar-thumb-main/40 scrollbar-track-transparent"
                onClick={(e) => e.stopPropagation()}>
                {/* 🔹 Header */}
                <div className="flex flex-col justify-between items-center border-b border-gray-200 pb-4">
                    <div className="flex w-full items-center pb-10">
                        <button
                            onClick={onClose}
                            className="flex justify-start items-center gap-1 text-gray-main hover:text-main transition-all"
                        >
                            <IconArrowLeft size={18} />
                            <span className="text-sm font-medium">Back</span>
                        </button>

                        <div className="flex justify-center w-full">
                            <h2 className="text-2xl font-semibold text-main">Modificar Usuario</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-10 text-sm text-gray-600 flex-wrap justify-center">
                        <div><strong>UUID:</strong> {user.id}</div>
                        <div><strong>Tipo:</strong>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="ml-2 border border-gray-300 rounded-lg px-2 py-1 outline-none focus:border-main focus:ring-1 focus:ring-main/20 transition"
                            >
                                <option value="CUSTOMER">Customer</option>
                                <option value="SELLER">Seller</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div><strong>Última conexión:</strong> {user.last_connection ?? "—"}</div>
                        <div className="flex items-center gap-2">
                            <strong>Status:</strong>
                            <Switch
                                checked={formData.status}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({ ...prev, status: checked }))
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* 🔹 Cuerpo principal */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 gap-8">
                        {/* Columna izquierda */}
                        <div className="bg-gradient-to-br from-main/10 to-contrast-secondary/10 rounded-2xl p-6 shadow-inner flex flex-col items-center">
                            {/* Imagen */}
                            <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-lg mb-3">
                                {formData.image ? (
                                    <img src={formData.image} alt="User" className="w-full h-full object-contain" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-main/20 text-main text-4xl font-semibold">
                                        {userInitial}
                                    </div>
                                )}
                            </div>

                            {/* Botones debajo de la imagen */}
                            <div className="flex gap-3 mb-6">
                                <label className="bg-main text-white rounded-full px-3 py-1 cursor-pointer shadow-md hover:bg-main/80 transition text-sm flex items-center gap-1">
                                    <IconCamera size={16} /> Subir
                                    <input type="file" className="hidden" />
                                </label>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white rounded-full px-3 py-1 shadow-md hover:bg-red-600 transition text-sm flex items-center gap-1"
                                >
                                    <IconTrash size={16} /> Eliminar
                                </button>
                            </div>

                            {/* Inputs */}
                            <div className="w-full space-y-3">
                                {/* Solo si no es seller */}
                                {formData.role !== "SELLER" && (
                                    <>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600">Nombre</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={formData.first_name || ""}
                                                onChange={handleChange}
                                                className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600">Apellido</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name || ""}
                                                onChange={handleChange}
                                                className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                            />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Usuario</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Correo</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Teléfono</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={formData.phone_number || ""}
                                        onChange={handleChange}
                                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                    />
                                </div>
                            </div>

                            {/* Botón Eliminar Cuenta */}
                            <div className="flex flex-col w-full mt-6">
                                <ButtonComponent
                                    text="Eliminar cuenta"
                                    style="bg-main text-white rounded-full py-2"
                                />
                            </div>
                        </div>
                        {/* Columna derecha */}
                        {user.role === "CUSTOMER" && (
                            <div className="bg-gray-50 rounded-2xl p-6 shadow-inner flex flex-col justify-between">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                        Actividad del usuario
                                    </h3>
                                    <p className="text-gray-700">
                                        <strong>Artículos comprados:</strong>{" "}
                                        {user.total_items ?? 0}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Total gastado:</strong>{" "}
                                        ₡{user.total_spent?.toLocaleString("es-CR") ?? "0"}
                                    </p>

                                    <ButtonComponent
                                        text="Ver historial de compras"
                                        style="bg-contrast-secondary text-white rounded-full px-6 py-2 mt-4"
                                    />
                                </div>
                            </div>
                        )
                        }
                        {user.role === "SELLER" && (
                            <div className="bg-gray-50 rounded-2xl p-6 shadow-inner flex flex-col gap-4">
                                <h2 className="text-center text-lg">Tienda de <span className="font-semibold">{user.username} </span></h2>
                                <ButtonComponent
                                    text="Ver tienda"
                                    style="bg-gradient-to-br from-main via-contrast-secondary to-contrast-main text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition"
                                />
                            </div>
                        )

                        }
                    </div>
                    <div className="flex flex-col justify-center items-center border-t border-gray-200 pt-4">
                        <p className="text-xs text-gray-500 mb-3">
                            Every change will be notified to the account owner.
                        </p>
                        <div className="flex gap-4">
                            <ButtonComponent
                                text="Cancel"
                                onClick={onClose}
                                style="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition"
                            />
                            <ButtonComponent
                                text="Save"
                                type="submit"
                                style="bg-gradient-to-br from-main via-contrast-secondary to-contrast-main text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition"
                            />

                        </div>
                    </div>
                </form>

                {/* Footer */}
            </div>
        </div>
    );
}
