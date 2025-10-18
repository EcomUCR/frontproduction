import { IconX, IconPackage } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import { useEffect } from "react";
import ProductOrderItem from "./ProductOrderItem";

interface OrderModalProps {
    order: {
        id: number;
        status: string;
        created_at?: string;
    } | null;
    onClose: () => void;
}

export default function OrderModal({ order, onClose }: OrderModalProps) {
    if (!order) return null;

    // 🧩 Bloquea scroll de fondo mientras el modal está abierto
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    // 🧪 Productos temporales (mock)
    const products = [
        {
            id: 1,
            name: "Camiseta Oversize Negra",
            image:
                "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80",
            price: 15000,
            quantity: 1,
        },
        {
            id: 1,
            name: "Camiseta Oversize Negra",
            image:
                "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80",
            price: 15000,
            quantity: 1,
        },
        {
            id: 2,
            name: "Gorra deportiva azul",
            image:
                "https://images.unsplash.com/photo-1621381070502-661b2d3c1a11?w=600&q=80",
            price: 9500,
            quantity: 2,
        },
    ];


    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-5 font-quicksand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-3xl shadow-xl w-full max-w-[45rem] max-h-[90vh] overflow-y-auto relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
                        <h2 className="text-lg font-bold text-main flex items-center gap-2">
                            <IconPackage className="text-main" />
                            Productos del pedido #{order.id}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all"
                        >
                            <IconX className="text-gray-600" />
                        </button>
                    </div>

                    {/* Lista de productos */}
                    <div className="p-6 space-y-4">
                        {products.map((item) => (
                            <ProductOrderItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-5 border-t border-gray-200 flex justify-end bg-white sticky bottom-0">
                        <ButtonComponent
                            text="Cerrar"
                            style="bg-main text-white rounded-full px-6 py-2 hover:bg-contrast-main transition-all"
                            onClick={onClose}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
