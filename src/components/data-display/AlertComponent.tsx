import { motion, AnimatePresence } from "framer-motion";
import { IconAlertCircle, IconX } from "@tabler/icons-react";

interface AlertComponentProps {
    show: boolean; // si se muestra o no
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    type?: "info" | "success" | "warning" | "error";
}

export default function AlertComponent({
    show,
    title = "¿Estás seguro?",
    message = "Esta acción no se puede deshacer.",
    confirmText = "Aceptar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
    type = "info",
}: AlertComponentProps) {
    if (!show) return null;

    const colorMap = {
        info: "border-blue-400 bg-blue-50 text-blue-800",
        success: "border-green-400 bg-green-50 text-green-800",
        warning: "border-yellow-400 bg-yellow-50 text-yellow-800",
        error: "border-red-400 bg-red-50 text-red-800",
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={`w-[90%] max-w-md rounded-2xl border p-6 shadow-xl ${colorMap[type]} font-quicksand relative`}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Cerrar */}
                        <button
                            onClick={onCancel}
                            className="absolute top-3 right-3 text-inherit hover:text-opacity-70"
                        >
                            <IconX />
                        </button>

                        {/* Encabezado */}
                        <div className="flex items-center gap-3 mb-3">
                            <IconAlertCircle className="size-6 text-inherit" />
                            <h2 className="text-lg font-semibold">{title}</h2>
                        </div>

                        {/* Mensaje */}
                        <p className="text-sm mb-6">{message}</p>

                        {/* Botones */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`px-4 py-2 rounded-lg transition ${type === "error"
                                        ? "bg-red-600 text-white hover:bg-red-700"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
