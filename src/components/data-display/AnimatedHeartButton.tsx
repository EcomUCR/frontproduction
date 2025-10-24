import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconHeart } from "@tabler/icons-react";

interface AnimatedHeartButtonProps {
    productId: number;
    label?: string; // texto opcional
    variant?: "filled" | "inline"; // tipo de botón
    onToggle?: (productId: number, liked: boolean) => void;
}

export default function AnimatedHeartButton({
    productId,
    label,
    variant = "filled",
    onToggle,
}: AnimatedHeartButtonProps) {
    const [liked, setLiked] = useState(false);

    const handleToggle = () => {
        const newState = !liked;
        setLiked(newState);
        onToggle?.(productId, newState);
    };

    const isInline = variant === "inline";

    return (
        <div
            onClick={handleToggle}
            className={`relative inline-flex items-center gap-2 cursor-pointer select-none ${isInline ? "" : "inline-block"
                }`}
        >
            {/* ❤️ Icono principal */}
            <motion.div
                whileTap={{ scale: 0.9 }}
                animate={liked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-center ${isInline
                        ? "text-contrast-secondary hover:text-main"
                        : `w-9 h-9 rounded-xl shadow-md transition-all duration-300 ${liked
                            ? "bg-gradient-to-br from-contrast-main to-contrast-secondary text-white"
                            : "bg-gradient-to-br from-contrast-secondary to-contrast-main text-white hover:scale-110"
                        }`
                    }`}
            >
                <IconHeart
                    size={isInline ? 24 : 20}
                    className={`transition-colors duration-300 ${liked
                            ? isInline
                                ? "fill-red-500 text-red-500"
                                : "fill-white"
                            : "fill-transparent"
                        }`}
                />
            </motion.div>

            {/* Texto (solo en modo inline) */}
            {isInline && label && (
                <span
                    className={`text-sm w-25 font-quicksand transition-colors duration-300 hover:font-semibold hover:text-main"
                        }`}
                >
                    {label}
                </span>
            )}

            {/* Partículas */}
            <AnimatePresence>
                {liked && (
                    <>
                        {[...Array(10)].map((_, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                                animate={{
                                    opacity: 0,
                                    scale: 1,
                                    x: (Math.random() - 0.5) * 40,
                                    y: (Math.random() - 1) * 40,
                                    rotate: Math.random() * 360,
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute top-1 left-1 text-red-400 pointer-events-none select-none"
                            >
                                <IconHeart size={8} />
                            </motion.span>
                        ))}
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
