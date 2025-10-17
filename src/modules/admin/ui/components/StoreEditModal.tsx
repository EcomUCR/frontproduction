import { useEffect, useState } from "react";
import { IconArrowLeft, IconCamera, IconTrash } from "@tabler/icons-react";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import { Switch } from "../../../../components/ui/switch";

interface StoreEditModalProps {
    store: any;
    onClose: () => void;
    onSave: (updatedStore: any) => Promise<void>;
    onViewProducts: (storeId: number) => void;
}

export default function StoreEditModal({
    store,
    onClose,
    onSave,
    onViewProducts,
}: StoreEditModalProps) {
    const [formData, setFormData] = useState({ ...store });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: typeof formData) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData);
        onClose();
    };

    // Bloquear scroll del fondo
    useEffect(() => {
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.overflowY = "scroll";
        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.overflowY = "";
            window.scrollTo(0, scrollY);
        };
    }, []);

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 animate-fadeIn font-quicksand"
            onClick={onClose}
        >
            <div
                className="bg-white w-[1280px] max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-10 relative border border-main/10 animate-slideUp flex flex-col gap-8 scrollbar-thin scrollbar-thumb-main/40 scrollbar-track-transparent"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
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
                            <h2 className="text-2xl font-semibold text-main">Modificar Tienda</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-10 text-sm text-gray-600 flex-wrap justify-center">
                        <div><strong>ID:</strong> {store.id}</div>
                        <div><strong>Tienda:</strong> {store.user?.username ?? "—"}</div>
                        <div className="flex items-center gap-2">
                            <strong>Verificada:</strong>
                            <Switch
                                checked={formData.is_verified}
                                onCheckedChange={(checked) =>
                                    setFormData((p: typeof formData) => ({ ...p, is_verified: checked }))
                                }
                            />

                        </div>
                        <div className="flex items-center gap-2">
                            <strong>Status:</strong>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={(e) => setFormData((p: typeof formData) => ({ ...p, status: e.target.value }))}
                                className="border border-gray-300 rounded-lg px-2 py-1 text-sm outline-none focus:border-main focus:ring-1 focus:ring-main/20 transition"
                            >
                                <option value="ACTIVE">Activa</option>
                                <option value="SUSPENDED">Suspendida</option>
                                <option value="CLOSED">Cerrada</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Formulario principal */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 gap-8">
                        {/* Columna izquierda */}
                        <div className="bg-gradient-to-br from-main/10 to-contrast-secondary/10 rounded-2xl p-6 shadow-inner flex flex-col items-center">
                            {/* Imagen */}
                            <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-lg mb-3">
                                {formData.image ? (
                                    <img src={formData.image} alt="Store" className="w-full h-full object-contain" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-main/20 text-main text-4xl font-semibold">
                                        {formData.name?.charAt(0)?.toUpperCase() ?? "?"}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 mb-6">
                                <label className="bg-main text-white rounded-full px-3 py-1 cursor-pointer shadow-md hover:bg-main/80 transition text-sm flex items-center gap-1">
                                    <IconCamera size={16} /> Editar
                                    <input type="file" className="hidden" />
                                </label>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white rounded-full px-3 py-1 shadow-md hover:bg-red-600 transition text-sm flex items-center gap-1"
                                >
                                    <IconTrash size={16} /> 
                                </button>
                            </div>

                            {/* Banner */}
                            <div className="w-full h-24 rounded-xl overflow-hidden shadow-md mb-3">
                                {formData.banner ? (
                                    <img src={formData.banner} alt="Banner" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                                        No banner
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 mb-6">
                                <label className="bg-main text-white rounded-full px-3 py-1 cursor-pointer shadow-md hover:bg-main/80 transition text-sm flex items-center gap-1">
                                    <IconCamera size={16} /> Editar
                                    <input type="file" className="hidden" />
                                </label>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white rounded-full px-3 py-1 shadow-md hover:bg-red-600 transition text-sm flex items-center gap-1"
                                >
                                    <IconTrash size={16} /> 
                                </button>
                            </div>

                            <ButtonComponent
                                text="Ver productos de la tienda"
                                onClick={() => onViewProducts(formData.id)}
                                style="bg-contrast-secondary text-white rounded-full px-6 py-2 mt-2"
                            />
                        </div>

                        {/* Columna derecha */}
                        <div className="bg-gray-50 rounded-2xl p-6 shadow-inner space-y-3 overflow-y-auto">
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                    className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-600">Descripción</label>
                                <textarea
                                    name="description"
                                    value={formData.description || ""}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Nombre comercial</label>
                                    <input
                                        type="text"
                                        name="business_name"
                                        value={formData.business_name || ""}
                                        onChange={handleChange}
                                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Cédula</label>
                                    <input
                                        type="text"
                                        name="tax_id"
                                        value={formData.tax_id || ""}
                                        onChange={handleChange}
                                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Correo de soporte</label>
                                    <input
                                        type="email"
                                        name="support_email"
                                        value={formData.support_email || ""}
                                        onChange={handleChange}
                                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Teléfono de soporte</label>
                                    <input
                                        type="text"
                                        name="support_phone"
                                        value={formData.support_phone || ""}
                                        onChange={handleChange}
                                        className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-600">Dirección registrada</label>
                                <input
                                    type="text"
                                    name="registered_address"
                                    value={formData.registered_address || ""}
                                    onChange={handleChange}
                                    className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-600">Dirección física</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address || ""}
                                    onChange={handleChange}
                                    className="w-full mt-1 border border-gray-300 rounded-lg p-2 outline-none focus:border-main focus:ring-2 focus:ring-main/20 transition"
                                />
                            </div>
                        </div>

                    </div>
                    {/* Footer */}
                    <div className="flex flex-col justify-center items-center border-t border-gray-200 pt-4">
                        <p className="text-xs text-gray-500 mb-3">
                            Los cambios se aplicarán inmediatamente y serán notificados al vendedor.
                        </p>
                        <div className="flex gap-4">
                            <ButtonComponent
                                text="Cancelar"
                                onClick={onClose}
                                style="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition"
                            />
                            <ButtonComponent
                                text="Guardar"
                                type="submit"
                                style="bg-gradient-to-br from-main via-contrast-secondary to-contrast-main text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition"
                            />
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}
