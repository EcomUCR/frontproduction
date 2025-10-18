import { IconX } from "@tabler/icons-react";
import BannerComponent from "../../../../components/data-display/BannerComponent";
import ButtonComponent from "../../../../components/ui/ButtonComponent";

interface BannerModalProps {
    newBanner: any;
    setNewBanner: (value: any) => void;
    onClose: () => void;
    onSave: () => void;
    handleInputChange: (event: any) => void;
    handleCheckboxChange: (event: any) => void;
    handleFileChange: (event: any, field: "image" | "character") => void;
}

export default function BannerModal({
    newBanner,
    //setNewBanner,
    onClose,
    onSave,
    handleInputChange,
    handleCheckboxChange,
    handleFileChange,
}: BannerModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn font-quicksand"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl p-6 w-[80rem] shadow-xl relative animate-scaleIn max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-6 text-main-dark text-center">Nuevo Banner</h2>
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={onClose}
                >
                    <IconX size={24} />
                </button>

                <div className="grid grid-cols-2 gap-6">
                    {/* Columna izquierda: Formulario */}
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Título</label>
                            <input
                                type="text"
                                name="title"
                                value={newBanner.title ?? ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-main"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Subtítulo</label>
                            <input
                                type="text"
                                name="subtitle"
                                value={newBanner.subtitle ?? ""}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-main"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Imagen de fondo *</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "image")}
                                className="w-full border rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-main-dark file:text-white file:cursor-pointer hover:file:bg-main transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Imagen del personaje</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "character")}
                                className="w-full border rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-main-dark file:text-white file:cursor-pointer hover:file:bg-main transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Tipo</label>
                                <select
                                    name="type"
                                    value={newBanner.type}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-main"
                                >
                                    <option value="large">large</option>
                                    <option value="short">short</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">Orientación</label>
                                <select
                                    name="orientation"
                                    value={newBanner.orientation ?? "1"}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-main"
                                >
                                    <option value="1">Izquierda</option>
                                    <option value="2">Derecha</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Link</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={newBanner.link ?? ""}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-main"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Texto del botón</label>
                                <input
                                    type="text"
                                    name="btn_text"
                                    value={newBanner.btn_text ?? ""}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-main"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Color del botón</label>
                            <select
                                name="btn_color"
                                value={newBanner.btn_color}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-main"
                            >
                                <option value="MORADO">Morado</option>
                                <option value="AMARILLO">Amarillo</option>
                                <option value="NARANJA">Naranja</option>
                                <option value="GRADIENTE">Gradiente</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <input
                                id="is_active"
                                type="checkbox"
                                name="is_active"
                                checked={!!newBanner.is_active}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 accent-main"
                            />
                            <label htmlFor="is_active" className="text-sm">
                                Activo (visible en el sitio)
                            </label>
                        </div>
                    </form>

                    {/* Columna derecha: Preview */}
                    <div className="flex flex-col items-center justify-start pt-4">
                        <h3 className="font-semibold text-lg mb-3 text-main-dark">Previsualización</h3>

                        {newBanner.image ? (
                            <div className="scale-[0.9] border border-gray-300 p-3 rounded-2xl shadow-sm bg-gray-50">
                                <BannerComponent
                                    id={newBanner.id}
                                    type={newBanner.type}
                                    orientation={newBanner.orientation}
                                    title={newBanner.title}
                                    subtitle={newBanner.subtitle}
                                    image={newBanner.image}
                                    character={newBanner.character}
                                    btn_text={newBanner.btn_text}
                                    btn_color={newBanner.btn_color}
                                />
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm mt-4">
                                Sube una imagen para ver la previsualización
                            </p>
                        )}
                    </div>
                </div>

                {/* Botones */}
                <div className="mt-8 flex justify-end gap-3">
                    <ButtonComponent
                        text="Cancelar"
                        style="bg-gray-300 text-black rounded-full px-4 py-2 hover:bg-gray-400 transition-all duration-300"
                        onClick={onClose}
                    />
                    <ButtonComponent
                        text="Guardar"
                        style="bg-main-dark text-white rounded-full px-4 py-2 hover:bg-main transition-all duration-300"
                        onClick={onSave}
                    />
                </div>
            </div>
        </div>
    );
}
